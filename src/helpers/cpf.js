function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
	mask: function(value) {
		if (value) {
			value = value.toString().replace(/[^\d]/g, '');
			if (value) {
				var cpf = '$$$.$$$.$$$-$$';
				('0000000000' + value)
					.slice(-11)
					.split('')
					.forEach(c => cpf = cpf.replace('$', c));
				return cpf;
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
		var pCpfCnpj = value + '',
			chCpfCnpj = '',
			numCpfCnpj = '',
			valid = true;

		for(var cpfcnpjCounter = 0; cpfcnpjCounter <= pCpfCnpj.length; cpfcnpjCounter++) {
			chCpfCnpj = pCpfCnpj.substr(pCpfCnpj.length - cpfcnpjCounter, 1);

			if(isNumeric(chCpfCnpj)) {
				numCpfCnpj = chCpfCnpj + numCpfCnpj;
			}
		}

		if(numCpfCnpj.length > 14) {
			valid = false;
		} else {
			if(numCpfCnpj.length > 11) {
				// CNPJ
				numCpfCnpj = Array(15).join('0') + numCpfCnpj;
				numCpfCnpj = numCpfCnpj.substring(numCpfCnpj.length, numCpfCnpj.length - 14);

				if(!numCpfCnpj.match(/^[0-9]{14}$/) || numCpfCnpj.match(/^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/)) {
					valid = false;
				} else {
					var cnpjW_A = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
						cnpjW_B = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
						cnpjSum,
						cnpjCounter,
						cnpjMod,
						cnpjDV1 = 0,
						cnpjDV2 = 0;

					cnpjSum = 0;
					for(cnpjCounter = 0; cnpjCounter < 12; cnpjCounter++) {
						cnpjSum = cnpjSum + (numCpfCnpj[cnpjCounter] * cnpjW_A[cnpjCounter]);
					}

					// calcula digito 1
					cnpjMod = cnpjSum % 11;
					if(cnpjMod >= 2) {
						cnpjDV1 = 11 - cnpjMod;
					}

					// calcula digito 2
					cnpjSum = 0;
					for(cnpjCounter = 0; cnpjCounter < 13; cnpjCounter++) {
						cnpjSum = cnpjSum + (numCpfCnpj[cnpjCounter] * cnpjW_B[cnpjCounter]);
					}

					cnpjMod = cnpjSum % 11;
					if(cnpjMod >= 2) {
						cnpjDV2 = 11 - cnpjMod;
					}

					if(cnpjDV1 !== parseInt(numCpfCnpj[12], 10) || cnpjDV2 !== parseInt(numCpfCnpj[13], 10)) {
						valid = false;
					}
				}
			} else {
				// CPF
				numCpfCnpj = Array(12).join('0') + numCpfCnpj;
				numCpfCnpj = numCpfCnpj.substring(numCpfCnpj.length, numCpfCnpj.length - 11);

				if(!numCpfCnpj.match(/^[0-9]{11}$/) || numCpfCnpj.match(/^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/)) {
					valid = false;
				} else {
					var cpfW_A = [10, 9, 8, 7, 6, 5, 4, 3, 2],
						cpfW_B = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
						cpfSum,
						cpfCounter,
						cpfMod,
						cpfDV1 = 0,
						cpfDV2 = 0;

					cpfSum = 0;
					for(cpfCounter = 0; cpfCounter < 9; cpfCounter++) {
						cpfSum = cpfSum + (numCpfCnpj[cpfCounter] * cpfW_A[cpfCounter]);
					}

					// calcula digito 1
					cpfMod = cpfSum % 11;
					if(cpfMod >= 2) {
						cpfDV1 = 11 - cpfMod;
					}

					// calcula digito 2
					cpfSum = 0;
					for(cpfCounter = 0; cpfCounter < 10; cpfCounter++) {
						cpfSum = cpfSum + (numCpfCnpj[cpfCounter] * cpfW_B[cpfCounter]);
					}

					cpfMod = cpfSum % 11;
					if(cpfMod >= 2) {
						cpfDV2 = 11 - cpfMod;
					}

					if(cpfDV1 !== parseInt(numCpfCnpj[9], 10) || cpfDV2 !== parseInt(numCpfCnpj[10], 10)) {
						valid = false;
					}
				}
			}
		}

		return valid;
	}
};