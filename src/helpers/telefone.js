export default {
	validateFixo: function(value) {
		return /^\(\d{2}\) \d{4}-\d{4}$/.test(value);
	},

	validateCelular: function(value) {
		return /^\(\d{2}\) \d{5}-\d{4}$/.test(value);
	}
};