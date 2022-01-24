
    
<template>
    <div class="nf-button">
        <button class="button">
            {{ msg }}
            <slot></slot>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ButtonProps } from '.';

export default defineComponent({
    name: 'nfButton',
    props: ButtonProps,
    setup() {
        return {
            msg: '彩虹按钮'
        };
    }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

    
    