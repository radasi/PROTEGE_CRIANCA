<script>
	import VInputContainer from './inputContainer';

	export default {
		components: { VInputContainer },

		props: {
			'label': { default: undefined },
			'validator': { default: undefined },
			'customError': { default: undefined },
			'id': { default: function() { return `field_${this._uid}`; } },
			'disabled': { default: undefined },
			'maxlength': { default: undefined },
			'placeholder': { default: '-' },
			'readonly': { default: undefined },
			'rows': { default: undefined },
			'value': { default: undefined }
		},

		methods: {
			inputHandler(e) {
				this.$emit('input', e.target.value);
			}
		}
	};
</script>