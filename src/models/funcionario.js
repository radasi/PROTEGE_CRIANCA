import axios from 'axios';
import $ from 'jquery';

const api = axios.create({ baseURL: window.Config.BASE_URL });

export { api };

export default {
	atualizarDadosFuncionario(idFuncionario, dadosFuncionario, callback) {
		$.ajax({
			headers: {
				authorization: 'BEARER ' + sessionStorage.getItem('token')
			},
			url: window.Config.BASE_URL + '/funcionario/' + idFuncionario,
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(dadosFuncionario),
			complete: function(res) {
				callback.call(this, true, res);
			}
		});
	},

	incluirFuncionario(dadosFuncionario, callback) {
		$.ajax({
			headers: {
				authorization: 'BEARER ' + sessionStorage.getItem('token')
			},
			url: window.Config.BASE_URL + '/funcionario',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(dadosFuncionario),
			complete: function(res) {
				callback.call(this, true, res);
			}
		});
	},

	listarFuncionarios: () => api.get('funcionario', { headers: { 'Authorization': 'BEARER ' + sessionStorage.getItem('token') } }),

	listarEscolas: () => api.get('escola', { headers: { 'Authorization': 'BEARER ' + sessionStorage.getItem('token') } })
};