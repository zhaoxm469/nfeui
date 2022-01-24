<template>
    <div class="nf-button">
        <button class="button">
            {{ msg }}
            <slot></slot>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ButtonProps } from '.';

export default defineComponent({
    props: ButtonProps,
    setup() {
        return {
            msg: '张三'
        };
    }
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
