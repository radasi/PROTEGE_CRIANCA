<template>
	<div>
		<div class="loader-modal-background"></div>
		<div class="loader-modal-container">
			<div v-if="longRequest" class="alert alert-warning text-center loader-modal-content">
				<div><i class="fa fa-refresh fa-spin fa-2x"></i></div>
				<div>
					Processando requisição.
					<template v-if="pendingCount">{{ pendingCount }} restante(s).</template>
				</div>
				<p><i>Aguarde.</i></p>
			</div>
			<div v-if="errors.length>0" class="alert alert-danger text-center loader-modal-content">
				<div><i class="fa fa-exclamation-triangle fa-2x"></i></div>
				<div>Ocorreram erros no procesamento da requisição:</div>
				<hr>
				<div v-for="error in errors" :key="error.status" class="loader-modal-error">
					<template v-if="error.responseJSON && error.responseJSON.message">
						{{ error.responseJSON.message }}<br>
						<template v-if="error.responseJSON.errorMessage != error.responseJSON.message">
							{{ error.responseJSON.errorMessage }}
						</template>
					</template>
					<template v-else-if="error.status!=0">
						{{ error.status }} - {{ error.statusText }}<br>
					</template>
					<template v-else>
						Erro desconhecido.
					</template>
					<hr>
				</div>
				<button type="button" class="btn btn-danger btn-sm" @click="errorsViewed">OK</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			pendingCount: function() {
				return this.$store.state.ajax.pendingCount;
			},
			longRequest: function() {
				return this.$store.state.ajax.longRequest;
			},
			errors: function() {
				return this.$store.state.ajax.errors;
			}
		},
		methods: {
			errorsViewed: function() {
				this.$store.commit('errorsViewed');
			}
		}
	};
</script>

<style scoped>
	.loader-modal-background {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #000000;
		opacity: 0.5;
		z-index: 2000;
	}

	.loader-modal-container {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2000;
		overflow: auto;
	}

	.loader-modal-content {
		margin: 10px;
		padding: 5px;
	}

	.loader-modal-error {
		word-break: break-all;
	}

	hr {
		margin: 5px;
	}

	.btn {
		margin-top: 10px;
	}
</style>