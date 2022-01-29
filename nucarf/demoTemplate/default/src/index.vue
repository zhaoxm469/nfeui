<template>
    <div class="<%= humpName %>">

        <button
            :class="[<%= firstLowercaseName %>Type, <%= firstLowercaseName %>Loading]"
            @click.stop="handleClick($event)"
        >
            <div class="<%= humpName %>-loading" v-show="loading">loading</div>
            <slot />
        </button>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, watch } from 'vue-demi';
import { <%= firstLowercaseName %>Emits, <%= firstLowercaseName %>Props } from '.';

export default defineComponent({
    name: '<%= exportCmtName %>',
    props: <%= firstLowercaseName %>Props,
    emits: <%= firstLowercaseName %>Emits,
    setup(props, { emit }) {
        const <%= firstLowercaseName %>Type = computed(() => `<%= humpName %>-${props.type}`);

        const handleClick = (evt: MouseEvent) => {
            if (!props.loading) emit('click', evt);
        };

        const <%= firstLowercaseName %>Loading = computed(() => {
            if (props.loading) {
                return `cursor-not-allowed`;
            }
        });

        watch(
            () => props.loading,
            () => {
                emit('loadingChange', props.loading);
            }
        );

       return {
            <%= firstLowercaseName %>Loading,
            handleClick,
            ...toRefs(props),
            <%= firstLowercaseName %>Type
        };
    }
});
</script>

<style lang="scss" scoped>
@import "../../../style/tailwindcss.scss";
@import "./index.scss";
</style>
