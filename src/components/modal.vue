<template>
	<div v-if="isOpen" class="panel-details-wrapper">
		<div class="panel-details">
			<button class="close" @click="close">&times;</button>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isOpen: true
			};
		},

		mounted() {
			document.body.style.overflowY = 'hidden';
			document.body.style.paddingRight = '17px';
		},

		destroyed() {
			document.body.style.overflowY = '';
			document.body.style.paddingRight = '';
		},

		methods: {
			close() {
				this.isOpen = false;
				this.$emit('close');
			}
		}
	};
</script>

<style scoped>
	.panel-details-wrapper {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .4);
		z-index: 88888;
		overflow-y: auto;
		padding: 10px;
	}

	.panel-details {
		background: #ffffff;
		padding: 15px;
		box-shadow: 0 0 2px 1px #666;
	}

	.panel-details .close {
		font-size: 28px;
		margin-top: -5px;
	}
</style>