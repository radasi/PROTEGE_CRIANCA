import { required } from 'vuelidate/lib/validators';
import withParams from 'vuelidate/lib/withParams';

import cpfHelper from './cpf';
import cepHelper from './cep';
import telefoneHelper from './telefone';
import moment from 'moment';

export function createIfRule(predicate) {
	return(function(rule) {
		return (function(value) {
			return !predicate(this) || rule(value);
		});
	});
}

export function customMessageRule(type, message, rule) {
	return withParams( { type: type, customMessage: message }, rule	);
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
export let dateTime = value =>
	!required(value) || moment(value, 'DD/MM/YYYY HH:mm:ss', true).isValid();
export let shortDateTime = value =>
	!required(value) || moment(value, 'DD/MM/YYYY HH:mm', true).isValid();
export let date = value =>
	!required(value) || moment(value, 'DD/MM/YYYY', true).isValid();
export let time = value =>
	!required(value) || moment(value, 'HH:mm:ss', true).isValid();
export let shortTime = value =>
	!required(value) || moment(value, 'HH:mm', true).isValid();
export let lessThan = max =>
	withParams( { type: 'lessThan', max }, value => !required(value) || value < max	);
export let greaterThan = min =>	withParams(	{ type: 'greaterThan', min }, value => !required(value) || value > min	);