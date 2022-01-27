<template>
    <div class="flex flex-wrap">
        <nfeButton class="mr-4 mb-4" type="primary">提交</nfeButton>
        <nfeButton class="mr-4 mb-4">取消</nfeButton>
        <nfeButton class="mr-4 mb-4" type="success">确认</nfeButton>
        <nfeButton class="mr-4 mb-4" type="info">取消</nfeButton>
    </div>
</template>

<script lang="ts" setup>
import { nfeButton } from 'nfeui';
</script>

<style scoped lang="scss">
@import '../../../style/tailwindcss.scss';
</style>
