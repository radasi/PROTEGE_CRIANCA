import { required } from 'vuelidate/lib/validators';
import moment from 'moment';
import cpfHelper from './cpfcnpj';
import cepHelper from './cep';
import telefoneHelper from './telefone';

export function createIfRule(predicate) {
	return(function(rule) {
		return (function(value) {
			return !predicate(this) || rule(value);
		});
	});
}

export * from 'vuelidate/lib/validators';

export let cpf = value =>
	!required(value) || cpfHelper.validate(value);

export let cep = value =>
	!required(value) || cepHelper.validate(value);

export let telefoneFixo = value =>
	!required(value) || telefoneHelper.validateFixo(value);

export let telefoneCelular = value =>
	!required(value) || telefoneHelper.validateCelular(value);

export let date = value =>
	!required(value) || moment(value, 'DD/MM/YYYY', true).isValid();

export let datetime = value =>
	!required(value) || moment(value, 'DD/MM/YYYY HH:mm', true).isValid();