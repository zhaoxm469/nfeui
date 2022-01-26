<template>
    <div>
        <p>
            <span style="padding: 0 16px 0 4px; font-size: 14px; color: #777"
                >点击次数:</span
            >
            <span>{{ count }}</span>
        </p>
        <<%= exportCmtName %>
            :loading="isLoading"
            @loading-change="onLoadingChange"
            type="primary"
            @click="onClick"
            >按钮</<%= exportCmtName %>
        >
    </div>
</template>

<script lang="ts">
import { <%= exportCmtName %> } from 'nfeui';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    components: {
        <%= exportCmtName %>
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
@import "../../../style/tailwindcss.scss";
</style>