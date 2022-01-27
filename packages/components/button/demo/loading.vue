<template>
    <div class="tf-flex tf-flex-wrap">
        <nfeButton class="tf-mr-20 tf-mb-10" loading type="primary"
            >提交</nfeButton
        >
        <nfeButton class="tf-mr-20 tf-mb-10" loading>取消</nfeButton>
        <nfeButton class="tf-mr-20" loading type="success">确认</nfeButton>
    </div>
</template>

<script lang="ts" setup>
import { nfeButton } from 'nfeui';
</script>

<style scoped lang="scss">
@import '../../../style/tailwindcss.scss';
</style>
