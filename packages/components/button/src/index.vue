<template>
    <button
        class="nfe-button cursor-pointer flex items-center py-2 rounded-lg px-6"
        :class="[buttonType, buttonLoading]"
        @click.stop="handleClick($event)"
    >
        <div class="loading w-4 h-4 mr-4 border border-solid border-white" v-show="loading">loading</div>
        <slot />
    </button>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, watch } from 'vue';
import { buttonEmits, buttonProps } from '.';

export default defineComponent({
    name: 'nfeButton',
    props: buttonProps,
    emits: buttonEmits,
    setup(props, { emit }) {
        const buttonType = computed(() => {
            const typesClass = {
                primary: 'bg-blue-500 text-white hover:bg-blue-400',
                success: 'bg-green-500 text-white hover:bg-green-400',
                info: 'bg-white border border-solid border-gray-500 text-gray-700 hover:bg-blue-200 hover:text-blue-500 hover:border-blue-400',
                default: 'bg-gray-600 text-white hover:bg-gray-500 '
            };

            return typesClass[props.type];
        });

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
