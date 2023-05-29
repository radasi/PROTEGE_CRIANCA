<!-- <template>
	<v-input-container v-bind="{ id, label, validator, customError }">
		<textarea
			ref="input"
			class="form-control"
			v-bind="$props"
			@input="inputHandler"
		>
		</textarea>
	</v-input-container>
</template>

<script>
	import Base from './base';
	import autosize from 'autosize/dist/autosize';

	export default {
		extends: Base,
		
		watch: {
			value: function() {
				autosize.update(this.$refs.input);
			}
		},

		mounted: function() {
			autosize(this.$refs.input);
		},

		destroyed: function() {
			autosize.destroy(this.$refs.input);
		}
	};
</script> -->