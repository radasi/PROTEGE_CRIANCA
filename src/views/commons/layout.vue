<template>
	<div id="application-container">
		<v-loader v-if="showLoader" />
		<v-header />
		<!--v-menu></v-menu-->
		<main class="container-fluid" :class="{'anonymous': !usuario}">
			<router-view />
		</main>
		<v-footer />
	</div>
</template>

<script>
	import VLoader from '@/views/commons/loader.vue';
	import VHeader from '@/views/commons/header.vue';
	//import VMenu from '@/views/commons/menu.vue';
	import VFooter from '@/views/commons/footer.vue';

	export default {
		components: { VLoader, VHeader, VFooter },
		computed: {
			showLoader: function() {
				var ajax = this.$store.state.ajax;
				return ajax.longRequest || ajax.errors.length > 0;
			},
			usuario: function() {
				return this.$store.state.usuario;
			}
		}
	};
</script>

<style src="@/assets/styles/main.css"></style>