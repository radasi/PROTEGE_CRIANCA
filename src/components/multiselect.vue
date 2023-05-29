<template>
	<div class="wrapper">
		<input type="text" class="form-control" :value="selectedCount" @click="open = !open" readonly>
		<span class="caret" @click="open = !open"></span>
		<ul class="list-group content" v-show="open">
			<li class="list-group-item" v-for="o in options">
				<label>
					<input type="checkbox" v-model="selected" :value="o.value" v-if="multiple">
					<input type="radio" v-model="selected" :value="o.value" v-else>
					{{ o.text }}
					<span :class="checkClass"></span>
				</label>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			value: { required: true },
			options: { required: true, default: () => [] },
			multiple: { default: false },
			emptyMessage: { default: 'select' },
			singularMessage: { default: '$count selected' },
			pluralMessage: { default: '$count selected' },
			checkClass: { default: 'glyphicon glyphicon-ok' }
		},

		data() {
			let selected = this.value;

			return {
				open: false,
				selected
			};
		},

		computed: {
			selectedCount() {
				let count = this.multiple ? this.selected.length : 1;
				let value = this.multiple ? this.selected.join(', ') : this.selected;
				let message = this.emptyMessage;

				if (count === 1) {
					message = this.singularMessage;
				} else if (count > 1) {
					message = this.pluralMessage;
				}

				return message.replace(/\$count/gi, count).replace(/\$value/gi, value);
			}
		},

		watch: {
			selected() {
				this.$emit('input', this.selected);
			}
		},

		created() {
			if (this.multiple && !Array.isArray(this.value)) {
				throw new Error('When using multiple=true, v-model must be an array.');
			}

			if (!this.multiple && Array.isArray(this.value)) {
				throw new Error('When using multiple=false, v-model can\'t be an array.');
			}
		},

		mounted() {
			document.addEventListener('mouseup', this.handleMouseUp);
			document.addEventListener('touchstart', this.handleMouseUp);
		},

		beforeDestroy() {
			document.removeEventListener('mouseup', this.handleMouseUp);
			document.removeEventListener('touchstart', this.handleMouseUp);
		},

		methods: {
			handleMouseUp(e) {
				let container = this.$el;

				if (!container.contains(e.target)) {
					this.open = false;
				}
			}
		}
	};
</script>

<style scoped>
	.wrapper {
		position: relative;
	}

	.wrapper .caret {
		position: absolute;
		/*top: 17px;*/
		top: 50%;
		right: 10px;
		z-index: 999999;
	}

	.wrapper input[type="text"] {
		padding-right: 25px;
		background: #ffffff;
		user-select: none;
	}

	.content {
		position: absolute;
		/*top: 34px;*/
		left: 0;
		right: 0;
		overflow-y: auto;
		max-height: calc(100vh - 140px);
		margin-bottom: 0;
	}

	.content .list-group-item {
		padding: 0;
	}

	.content label {
		display: block;
		padding: 10px;
		margin-bottom: 0;
		font-weight: normal;
	}

	.content label:hover {
		background: #fcfae0;
	}

	.content input[type="radio"],
	.content input[type="checkbox"] {
		display: none;
	}

	.content input[type="radio"] + span.glyphicon,
	.content input[type="checkbox"] + span.glyphicon {
		display: none;
		float: right;
		color: lightseagreen;
	}

	.content input[type="radio"]:checked + span.glyphicon,
	.content input[type="checkbox"]:checked + span.glyphicon {
		display: inline-block;
	}
</style>