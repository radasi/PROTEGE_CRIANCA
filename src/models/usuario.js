import axios from 'axios';
import $ from 'jquery';

const api = axios.create({ baseURL: window.Config.BASE_URL });

export { api };

export default {

	carregar: function() {
		return api.get(window.Config.USUARIO_AUTENTICADO);
	},

	login(dados) {
		return new Promise((avancar, anular) => {
			$.ajax({
				url: window.Config.BASE_URL + '/permisys',
				async: true,
				crossDomain: false,
				method: 'POST',
				global: false,
				contentType: 'application/x-www-form-urlencoded',
				cacheControl: 'no-cache',
				data: {
					'grant_type': 'password',
					'username': dados.login,
					'password': dados.senha
				},
				success: function(dados) {
					sessionStorage.setItem('token', dados[window.Config.TOKEN_FIELD]);
					avancar(dados);
				},
				error: function(erro) {
					anular(erro);
				}
			});
		});
	},

	logout: () => api.delete('/permisys')
};