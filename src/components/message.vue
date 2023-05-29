<template>
	<div v-if="message" :class="['alert', `alert-${tipo}`]" v-html="message"></div>
</template>

<script>
	export default {
		props: {
			'message': {
				default: ''
			},
			'tipo': {
				default: 'info'
			},
			'time': {
				default: 10000
			}
		},

		watch: {
			message() {
				if (this.message !== '') {
					setTimeout(() => { this.$emit('close'); }, this.time);
				}
			}
		}
	};
</script>