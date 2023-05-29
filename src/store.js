export default {
	state: {
		ajax: {
			pendingCount: 0,
			longRequest: false,
			errors: []
		},
		usuario: null
	},
	mutations: {
		requestStarted(state) {
			state.ajax.pendingCount++;
		},

		requestFinished(state) {
			state.ajax.pendingCount--;
		},

		longRequestStarted(state) {
			state.ajax.longRequest = true;
		},

		longRequestFinished(state) {
			state.ajax.longRequest = false;
		},

		requestError(state, data) {
			var errors = state.ajax.errors;
			errors.push(data);
			if (errors.length > 10) {
				errors.shift();
			}
		},

		errorsViewed(state) {
			var errors = state.ajax.errors;
			errors.splice(0, errors.length);
		},

		setUsuario(state, data) {
			state.usuario = data.data;
		}
	}
};