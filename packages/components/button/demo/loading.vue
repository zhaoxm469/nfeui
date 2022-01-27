<template>
    <div class="flex space-x-10">
        <nfeButton loading type="primary">提交</nfeButton>
        <nfeButton loading>取消</nfeButton>
        <nfeButton loading type="success">确认</nfeButton>
    </div>
</template>

<script lang="ts" setup>
import { nfeButton } from 'nfeui';
</script>

<style scoped lang="scss">
@import '../../../style/tailwindcss.scss';
</style>
