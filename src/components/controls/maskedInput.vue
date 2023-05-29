<template>
	<v-input-container v-bind="{ id, label, validator, customError }">
		<v-text-mask
			class="form-control"
			type="text"
			:mask="maskValue"
			:guide="true"
			placeholderChar="_"
			v-bind="$props"
			@input="inputHandler"
		>
		</v-text-mask>
	</v-input-container>
</template>

<script>
	import Base from './base';
	import VTextMask from 'vue-the-mask';

	const defaultMasks = {
		cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
		cep: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
		telefone: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
		celular: ['(', /\d/, /\d/, ')', ' ', /[\d ]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
		dataHora: [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-2]/, /\d/, ':', /[0-5]/, /\d/, ':', /\d/, /\d/],
		hora: [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]
	};

	export default {
		extends: Base,

		props: ['mask'],

		components: { VTextMask },

		computed: {
			maskValue: function() {
				if (typeof this.mask === 'string' && defaultMasks[this.mask]) {
					return defaultMasks[this.mask];
				} else {
					return this.mask;
				}
			}
		},

		methods: {
			inputHandler: function(value) {
				this.$emit('input', value);
			}
		}
	};
</script>