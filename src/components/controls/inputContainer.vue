<template>
	<div class="form-group" :class="{ 'has-error': invalid }">
		<label v-if="label" :for="id" class="control-label">
			{{label}}
			<span v-show="invalid" class="glyphicon glyphicon-info-sign"></span>
		</label>
		<div @input="inputHandler">
			<slot></slot>
		</div>
		<span class="help-block">
			<template v-if="invalid">{{errorMessage}}</template>
		</span>
	</div>
</template>

<script>
	const defaultErrorMessage = 'Erro no campo.';
	const errorMessages = [
		['required', 'Campo obrigatório.'],
		['numeric', 'Somente números.'],

		['cpf', 'CPF inválido.'],
		['cep', 'CEP inválido.'],
		['telefoneFixo', 'Telefone fixo inválido.'],
		['telefoneCelular', 'Telefone celular inválido.'],
		['dateTime', 'Data inválida.'],
		['shortDateTime', 'Data inválida.'],
		['date', 'Data inválida.'],
		['time', 'Horário inválido.'],
		['shortTime', 'Horário inválido.'],
		
		['lessThan', (params) => `O valor deve ser menor que "${params.max}".`],
		['greaterThan', (params) => `O valor deve ser maior que "${params.min}".`],
		['between', (params) => `O valor deve estar entre "${params.min}" e "${params.max}".`]
	];

	export default {
		props: ['id', 'label', 'validator', 'customError'],

		computed: {
			invalid: function() {
				return this.validator && this.validator.$error || this.customError;
			},

			errorMessage: function() {
				if (this.customError) {
					return this.customError;
				}
				if (this.validator) {
					for (let e of errorMessages) {
						if (this.validator[e[0]] == false) {
							if (typeof e[1] === 'string') {
								return e[1];
							} else {
								return e[1](this.validator.$params[e[0]]);
							}
						}
					}
					if (this.invalid) {
						var vm = this;
						var customMessage = null;
						Object.keys(this.validator.$params).forEach(function(key) {
							if (customMessage) {
								return;
							}
							if (vm.validator[key] == false && vm.validator.$params[key].customMessage) {
								customMessage = vm.validator.$params[key].customMessage;
							}
						});
						return customMessage || defaultErrorMessage;
					}
				}
				return null;
			}
		},

		methods: {
			inputHandler: function() {
				if (this.validator) {
					this.validator.$touch();
				}
			}
		},

		mounted: function() {
			if (this.validator) {
				this.validator.$reset();
			}
		}
	};
</script>

<style scoped>
	.glyphicon {
		font-size: 12px;
	}

	.help-block {
		font-size: 12px;
		margin-top: 5px;
		margin-bottom: -15px;
		height: 20px;
	}
</style>