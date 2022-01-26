<template>
    <div>
        <div class="flex space-x-10">
            <nfeButton loading type="primary">提交</nfeButton>
            <nfeButton loading>取消</nfeButton>
            <nfeButton loading type="success">确认</nfeButton>
        </div>
    </div>
</template>

<script lang="ts">
import { nfeButton } from 'nfeui';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        nfeButton
    }
});
</script>

<style scoped lang="scss">
@import '../../../style/tailwindcss.scss';
</style>
