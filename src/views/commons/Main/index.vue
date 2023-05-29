<template>
	<div id="application-container">
		<v-loader v-if="showLoader" />
		<v-header />
		<main class="container-fluid">
			<router-view />
		</main>
		<v-footer />
	</div>
</template>

<script>
	import VLoader from '@/views/commons/loader.vue';
	import VHeader from '@/views/commons/header.vue';
	import VMenu from '@/views/commons/menu.vue';
	import VFooter from '@/views/commons/footer.vue';

	export default {
		components: { VLoader, VHeader, VMenu, VFooter },
		computed: {
			showLoader: function() {
				var ajax = this.$store.state.ajax;
				return ajax.longRequest || ajax.errors.length > 0;
			}
		}
	};
</script>

<style></style>