<template>
	<header class="navbar navbar-default">
		<div class="container">
			<a href="#/" class="navbar-brand">
				<img src="../../../assets/img/logo.png" class="pull-left" alt="logo">
				<span>Monitoramento Protege Criança</span>
				<span style="color: tomato;">{{ env }}</span>
			</a>
			<v-logged-user :usuario="usuario" class="pull-right" />
		</div>
	</header>
</template>

<script>
	import VLoggedUser from '@/views/permisys/logged-user';

	export default {
		components: { VLoggedUser },

		data() {
			return {
				env: window.Config.ENV
			};
		},

		computed: {
			usuario() {
				return this.$store.state.usuario;
			}
		}
	};
</script>

<style scoped>
	header {
		margin: 0;
		border: 0;
		border-bottom: solid 1px #e7e7e7;
		border-radius: 0;
	}
	header img {
		width: 40px;
		margin: -10px 5px 0 0;
	}
</style>