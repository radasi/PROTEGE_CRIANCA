<template>
	<div>
		<slot></slot>
		<div class="page-title">{{ title }}</div>
		<div class="clearfix"></div>
	</div>
</template>

<script>
	export default {
		props: ['title']
	};
</script>

<style scoped>
	.page-title {
		color: tomato;
		text-shadow: 1px 1px 1px #555;
		font-size: 20px;
		word-break: break-all;
	}

	.clearfix {
		margin-bottom: 10px;
	}
</style>
