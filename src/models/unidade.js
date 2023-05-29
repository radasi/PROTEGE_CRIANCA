import axios from 'axios';

const api = axios.create({ baseURL: window.Config.BASE_URL });

export { api };

export default {
	incluirUnidade: dados => api.post('unidade', dados),

	listarUnidades: () => api.get('unidade')
};