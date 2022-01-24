<template>
    <div>
        <p>
            <span style="padding: 0 16px 0 4px; font-size: 14px; color: #777"
                >点击次数:</span
            >
            <span>{{ count }}</span>
        </p>
        <nfButton @click="onClick">按钮</nfButton>
    </div>
</template>

<script lang="ts">
import { nfButton } from 'nfeui';
import { ref, defineComponent } from 'vue';

export default defineComponent({
    components: {
        nfButton
    },
    setup() {
        const count = ref(0);
        function onClick() {
            count.value++;
        }

        return {
            count,
            onClick
        };
    }
});
</script>
