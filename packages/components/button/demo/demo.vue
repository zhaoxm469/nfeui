<template>
    <div class="flex space-x-10">
        <nfeButton type="primary">提交</nfeButton>
        <nfeButton>取消</nfeButton>
        <nfeButton type="success">确认</nfeButton>
        <nfeButton type="info">取消</nfeButton>
    </div>
</template>

<script lang="ts" setup>
import { nfeButton } from 'nfeui';
</script>

<style scoped lang="scss">
@import '../../../style/tailwindcss.scss';
</style>
