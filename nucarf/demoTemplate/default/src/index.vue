<template>
    <div class="<%= humpName %>">

        <button
            class="cursor-pointer flex items-center py-2 rounded-lg px-6"
            :class="[<%= firstLowercaseName %>Type, <%= firstLowercaseName %>Loading]"
            @click.stop="handleClick($event)"
        >
            <div class="loading w-4 h-4 mr-4 border border-solid border-white" v-show="loading">loading</div>
            <slot />
        </button>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, watch } from 'vue';
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
