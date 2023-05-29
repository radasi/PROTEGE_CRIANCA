<template>
	<div class="row">
		<div class="col-sm-6 col-sm-offset-3">
			<div class="panel panel-primary center-block">
				<form @submit.prevent="login">
					<div class="panel-body">
						<p class="text-center">
							Autenticação
						</p>
						<v-message :message="message.text" :tipo="message.tipo" @close="message = {}" />
						<v-text-input
							v-model="model.login"
							label="Usuário"
							:validator="$v.model.login"
						/>
						<v-password-input
							v-model="model.senha"
							label="Senha"
							:validator="$v.model.senha"
						/>
					</div>
					<div class="panel-footer">
						<div class="row">
							<div class="col-sm-12 text-center">
								<button class="btn btn-success btn-block" @click="login">Entrar</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { required } from '@/helpers/validation';
	import Usuario from '@/models/usuario';
	import VMessage from '@/components/message';
	import VTextInput from '@/components/controls/textInput.vue';
	import VPasswordInput from '@/components/controls/passwordInput';

	export default {
		components: { VMessage, VTextInput, VPasswordInput },

		data() {
			return {
				message: {
					text: '',
					tipo: ''
				},
				model: {
					login: '',
					senha: ''
				}
			};
		},

		validations: {
			model: {
				login: { required },
				senha: { required }
			}
		},

		methods: {
			login: function() {
				this.$v.$touch();
				// if (!this.$v.$invalid) {
				var vm = this;
				Usuario.login(this.model)
					.then(() => {
						vm.$router.push(vm.$route.query.redirect || '/');
					})
					.catch(function(responseJSON) {
						vm.message = {
							text: responseJSON && responseJSON.message || 'Erro durante a autenticação.',
							tipo: 'danger'
						};
					});
				// .catch(responseJSON) => {
				// 	vm.message = {
				// 	text: responseJSON && responseJSON.message || 'Erro durante a autenticação.',
				// 	tipo: 'danger'
				// };
				// });
			// }
			}
		}
	};
</script>

<style scoped>
	.fa {
		font-size: 20px;
	}

	.panel {
		max-width: 400px;
		margin-top: 50px;
	}

	p {
		font-size: 30px;
		font-weight: bold;
		color: salmon;
	}
</style>