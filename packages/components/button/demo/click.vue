<template>
    <div>
        <p>
            按钮点击次数:
            <span>{{ count }}</span>
        </p>
        <div class="tf-flex tf-mt-10">
            <nfeButton
                :loading="isLoading"
                @loading-change="onLoadingChange"
                type="primary"
                @click="handleBtnClick"
                >点我增加次数！</nfeButton
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nfeButton } from 'nfeui';
import { reactive, toRefs } from 'vue';

const useClick = () => {
    const state = reactive({
        count: 0,
        isLoading: false
    });

    const methods = {
        handleBtnClick() {
            state.isLoading = true;
            setTimeout(() => {
                state.count++;
                state.isLoading = false;
            }, 1000);
        }
    };

    return {
        ...toRefs(state),
        ...methods
    };
};

const onLoadingChange = (loading: boolean) =>
    console.log(`loading 状态发生变化：${loading}`);

const { count, isLoading, handleBtnClick } = useClick();
</script>

<style scoped lang="scss">
@import '../../../style/tailwindcss.scss';
</style>
