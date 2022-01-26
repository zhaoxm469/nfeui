<template>
    <div>
        <p>
            <span style="padding: 0 16px 0 4px; font-size: 14px; color: #777"
                >按钮点击次数:</span
            >
            <span>{{ count }}</span>
        </p>
        <div class="flex mt-10">
            <nfeButton
                :loading="isLoading"
                @loading-change="onLoadingChange"
                type="primary"
                @click="onClick"
                >点我增加次数！</nfeButton
            >
        </div>
    </div>
</template>

<script lang="ts">
import { nfeButton } from 'nfeui';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    components: {
        nfeButton
    },
    setup() {
        const state = reactive({
            count: 0,
            isLoading: false
        });

        const methods = {
            onClick() {
                state.isLoading = true;
                setTimeout(() => {
                    state.count++;
                    state.isLoading = false;
                }, 1000);
            },
            onLoadingChange(loading: boolean) {
                console.log(`loading 状态发生变化：${loading}`);
            }
        };

        return {
            ...toRefs(state),
            ...methods
        };
    }
});
</script>

<style scoped lang="scss">
@import '../../../style/tailwindcss.scss';
</style>
