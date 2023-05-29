<template>
	<ul v-if="usuario" class="nav navbar-nav nav-logged-user">
		<li class="dropdown">
			<a id="actions-menu" href="#" class="dropdown-toggle" data-toggle="dropdown">
				{{ usuario.nome }}
				&nbsp;
				<i class="fa fa-caret-down"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-right" style="min-width:100%;">
				<li>
					<span class="text text-info" style="margin-left:12px;font-size:12px;font-weight:bold;">Perfil Associado:</span>
				</li>
				<li v-for="perfil in usuario.perfis" :key="perfil.id">
					<span class="text text-primary" style="margin-left:12px;font-size:12px;">{{ perfil }}</span>
				</li>
				<li>
					<a href="#" style="padding: 6px 12px; color: tomato;" @click.prevent="logout">
						<i class="fa fa-sign-out"></i> Sair
					</a>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
	import Usuario from '@/models/usuario';

	export default {
		props: ['usuario'],

		methods: {
			logout() {
				Usuario.logout().then(() => {
					this.$router.push('/');
					location.reload();
				});
			}
		}
	};
</script>

<style>
	.nav-logged-user .dropdown-toggle {
		color: #666;
	}

	.nav-logged-user .dropdown-toggle,
	.nav-logged-user .dropdown-toggle:active,
	.nav-logged-user .dropdown-toggle:focus,
	.nav-logged-user .dropdown-toggle:hover,
	.nav-logged-user .open .dropdown {
		font-size: 16px !important;
		background: transparent !important;
		color: #2f6696 !important;
	}
</style>