<template>
	<div class="nt-flex nt-flex-wrap">
		<nfeButton class="nt-mr-20 nt-mb-10" loading type="primary">提交</nfeButton>
		<nfeButton class="nt-mr-20 nt-mb-10" loading>取消</nfeButton>
		<nfeButton class="nt-mr-20" loading type="success">确认</nfeButton>
	</div>
</template>

<script lang="ts" setup>
import { nfeButton } from "nfeui";
</script>

<style scoped lang="scss">
@import "../../../style/tailwindcss.scss";
</style>
