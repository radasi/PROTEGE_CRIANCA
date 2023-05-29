import axios from 'axios';
import $ from 'jquery';

const api = axios.create({ baseURL: window.Config.BASE_URL });

export { api };

export default {
	acompanharOcorrencia: idOcorrencia => api.get('ocorrencia/' + idOcorrencia, { headers: { 'Authorization': 'BEARER ' + sessionStorage.getItem('token') } }),

	atualizarOcorrencia(idOcorrencia, dadosOcorrencia, callback) {
		var token = 'BEARER ' + sessionStorage.getItem('token');
		$.ajax({
			url: window.Config.BASE_URL + '/ocorrencia/' + idOcorrencia,
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(dadosOcorrencia),
			headers: {
				authorization: token
			},
			global: false,
			complete: function(res) {
				callback.call(this, true, res);
			}
		});
	},

	cancelarOcorrencia: idOcorrencia => api.post('ocorrencia/' + idOcorrencia + '/cancelar', null, { headers: { 'Authorization': 'BEARER ' + sessionStorage.getItem('token') } }),

	consultarQuantidadeOcorrenciasAbertas() {
		return api.get('ocorrencia/quantidadeOcorrenciaAberta', { headers: { 'Authorization': 'BEARER ' + sessionStorage.getItem('token') } });
	},

	encerrarOcorrencia: idOcorrencia => api.post('ocorrencia/' + idOcorrencia + '/encerrar', null, { headers: { 'Authorization': 'BEARER ' + sessionStorage.getItem('token') } }),

	listarOcorrencias: filtro => api.get('ocorrencia?' + filtro, { headers: { 'contentType': 'application/json', 'Authorization': 'BEARER ' + sessionStorage.getItem('token') } })
};