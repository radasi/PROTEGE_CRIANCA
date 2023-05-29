import $ from 'jquery';
// import Modal from '@/components/modal';
import '@/mixins/crud';
import '@/mixins/showModal';
import registerControls from '@/components/controls/register';
import Usuario from '@/models/usuario';

export default function(router, store) {

	registerControls('v');

	// Modal.setDefaults({
	// 	prompt: {
	// 		header: 'Aviso',
	// 		btnLabel: 'OK'
	// 	},
	// 	confirm: {
	// 		header: 'Confirmação',
	// 		btnLabels: ['Não', 'Sim']
	// 	}
	// });

	let timer;

	$(document).ajaxStart(() => {
		timer = setTimeout(() => {
			store.commit('longRequestStarted');
		}, 2000);
	});

	$(document).ajaxStop(() => {
		clearTimeout(timer);
		store.commit('longRequestFinished');
	});

	$(document).ajaxSend(() => {
		store.commit('requestStarted');
	});

	$(document).ajaxComplete(() => {
		store.commit('requestFinished');
	});

	$(document).ajaxError((event, request, settings) => {
		if (!settings.doNotHandle) {
			var error = {
				status: request.status,
				statusText: request.statusText,
				responseJSON: request.responseJSON,
				responseText: request.responseText
			};
			store.commit('requestError', error);
		}
	});

	router.beforeEach((to, from, next) => {
		if (store.state.usuario) {
			if (to.path === '/login') {
				next(false);
			} else {
				next();
			}
		} else {
			if (to.path === '/login') {
				next();
			} else {
				Usuario.carregar()
					.then(response => {
						if (response.data) {
							store.commit('setUsuario', response);
							next();
						} else {
							next({
								path: '/login',
								query: {
									redirect: to.fullPath
								}
							});
						}
					})
					.catch(() => {
						store.commit('setUsuario', null);
						if (to.meta.anonymous) {
							next();
						} else {
							next({
								path: '/login',
								query: {
									redirect: to.fullPath
								}
							});
						}
					});
			}
		}
	});
}