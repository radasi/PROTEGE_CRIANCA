<template>
	<div style="display:flex;justify-content:space-between;">
		<template v-if="confirming">
			<span style="align-self:center;">{{ message }}</span>
			<div class="text-right">
				<button type="button" class="btn btn-default" @click="confirming = false">Não</button>
				<button type="button" class="btn btn-success" autofocus @click="confirm">Sim</button>
			</div>
		</template>

		<template v-else>
			<button
				type="submit"
				class="btn pull-right"
				:class="`btn-${type}`"
				style="margin-left:auto;"
				v-bind="$props"
				@click.prevent="confirming = true"
				>
				<slot>Confirmar</slot>
			</button>
			<div class="clearfix"></div>
		</template>
	</div>
</template>

<script>
	export default {
		props: {
			message: {
				default: 'Confirma?'
			},

			type: {
				default: 'success'
			},

			disabled: {
				default: undefined
			}
		},

		data() {
			return {
				confirming: false
			};
		},

		methods: {
			confirm() {
				this.$emit('confirm');
				this.confirming = false;
			}
		}
	};
</script>