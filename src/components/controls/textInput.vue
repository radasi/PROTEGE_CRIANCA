<template>
	<v-input-container v-bind="{ id, label, validator, customError }">
		<input
			class="form-control"
			type="text"
			v-bind="$props"
			@input="inputHandler"
		>
	</v-input-container>
</template>

<script>
	import Base from '@/components/controls/base';
	import VInputContainer from '@/components/controls/inputContainer.vue';

	export default {
		components: { VInputContainer },
		extends: Base
	};
</script>