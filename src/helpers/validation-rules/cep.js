export default {
	validate: function(value) {
		return /^\d{5}-\d{3}$/.test(value);
	}
};