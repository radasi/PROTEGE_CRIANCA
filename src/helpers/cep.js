export default {
	mask: function(value) {
		if (value) {
			value = value.toString().replace(/[^\d]/g, '');
			if (value) {
				var cep = '$$$$$-$$$';
				('0000000' + value)
					.slice(-8)
					.split('')
					.forEach(c => cep = cep.replace('$', c));
				return cep;
			}
		}
		return null;
	},

	unmask: function (value) {
		if (value) {
			value = value.toString().replace(/[^\d]/g, '');
			if (value) {
				return parseInt(value, 10);
			}
		}
		return null;
	},

	validate: function(value) {
		return /^\d{5}-\d{3}$/.test(value);
	}
};