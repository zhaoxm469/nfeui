<template>
    <button
        class="nfe-button"
        :class="[buttonType, buttonLoading]"
        @click.stop="handleClick($event)"
    >
        <div class="nfe-button-loading" v-show="loading">loading</div>
        <slot />
    </button>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, watch } from 'vue-demi'
import { buttonEmits, buttonProps } from '.';

export default defineComponent({
    name: 'nfeButton',
    props: buttonProps,
    emits: buttonEmits,
    setup(props, { emit }) {
        const buttonType = computed(() => `nfe-button-${props.type}`);

        const handleClick = (evt: MouseEvent) => {
            if (!props.loading) emit('click', evt);
        };

        const buttonLoading = computed(() => {
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
            buttonLoading,
            handleClick,
            ...toRefs(props),
            buttonType
        };
    }
});
</script>

<style lang="scss" scoped>
@import "../../../style/tailwindcss.scss";
@import "./index.scss";
</style>
