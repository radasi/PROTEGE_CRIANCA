<template>
	<textarea ref="editor"></textarea>
</template>

<script>
	import Simditor from 'simditor'; 
	import 'simditor/styles/simditor.css';
	import 'simditor-i18n';
	import $ from 'jquery';
	
	Simditor.locale = 'pt-BR';

	export default {
		props: {
			value: {
				default: ''
			},
			toolbar: {
				default() {
					return [
						'title',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'fontScale',
						'color',
						'ol',
						'ul',
						'blockquote',
						'table',
						'link',
						'hr',
						'indent',
						'outdent',
						'alignment'
					];
				}
			},
			placeholder: {
				default: ''
			}
		},

		data() {
			return {
				cachedValue: ''
			};
		},

		watch: {
			value() {
				if (this.cachedValue !== this.value) {
					this.simditor.setValue(this.value);
				}
			}
		},
		mounted() {
			this.setup();
		},
		beforeDestroy() {
			this.simditor.off('valuechanged', this.emitInput);
		},
		methods: {
			setup() {
				this.simditor = new Simditor({
					textarea: this.$refs.editor,
					toolbar: this.toolbar,
					placeholder: this.placeholder
				});
				this.simditor.setValue(this.value);
				this.simditor.on('valuechanged', this.emitInput);
			},
			emitInput() {
				let value =  this.simditor.getValue();
				let text = $(value).text().trim();
				
				if (text === '') {
					value = '';
				}
				
				this.cachedValue = value;
				this.$emit('input', value);
			}
		}
	};
</script>

<style>
	.simditor .simditor-body, .editor-style {
		font-family: inherit !important;
		font-size: inherit !important;
		min-height: 150px !important;
	}

</style>