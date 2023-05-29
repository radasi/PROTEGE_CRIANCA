<template>
	<v-input-container v-bind="{ id, label, validator, customError }">
		<input
			class="form-control"
			type="password"
			v-bind="$props"
			@input="inputHandler"
		>
	</v-input-container>
</template>

<script>
	import Base from './base';
	import VInputContainer from '@/components/controls/inputContainer.vue';

	export default {
		components: { VInputContainer },
		extends: Base
	};
</script>