<template>
	<div v-if="!$store.state.usuario" id="menu" class="navbar navbar-default navbar-static-top container-fluid"></div>
	<div v-else id="menu" class="navbar navbar-default navbar-static-top container-fluid">
		<ul class="nav nav-justified">
			<li>
				<router-link to="/ocorrencias" style="margin:5px">
					<i class="bi bi-activity btn btn-primary">Ocorrências</i>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {

	};
</script>

<style scoped>
	#menu {
		min-height:30px;
		margin-bottom: 0px;
		z-index:0;
		background-color: white;
	}
	li > a {
		border-bottom: solid 3px transparent;
	}
	li > a.router-link-active, .linkCadastrar {
		color: #2f6696;
		border-bottom-color: #2f6696;
	}
</style>