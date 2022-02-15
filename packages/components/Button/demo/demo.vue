<template>
	<div class="nt-flex nt-flex-wrap">
		<nfeButton class="nt-mr-20 nt-mb-10" type="primary">提交</nfeButton>
		<nfeButton class="nt-mr-20 nt-mb-10">取消</nfeButton>
		<nfeButton class="nt-mr-20" type="success">确认</nfeButton>
		<nfeButton class="nt-mr-20" type="info">取消</nfeButton>
	</div>
</template>

<script lang="ts" setup>
import { nfeButton } from "nfeui";
</script>

<style scoped lang="scss">
@import "../../../style/tailwindcss.scss";
</style>
