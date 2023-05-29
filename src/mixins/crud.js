import Vue from 'vue';
import Modal from '@/components/modal';

export default Vue.mixin({
	methods: {
		load: function(vm, modelClass, data, callback) {
			if (data) {
				callback.call(vm, true, modelClass.populate(data));
			} else if (vm.id) {
				modelClass.carregar(vm.id)
					.always((d, state) => {
						callback.call(vm, state === 'success', modelClass.populate(d));
					});
			} else {
				callback.call(vm, false, null);
			}
		},

		save: function(vm, modelClass, callback) {
			vm.$v.$touch();
			if (!vm.$v.$invalid) {
				Modal.confirm({
					body: 'Incluir Registro?',
					onClose(resposta) {
						if (resposta) {
							modelClass.incluir(vm.model).done(d => {
								Modal.prompt({
									body: '<div class="text-success">Registro Incluído.</div>',
									onClose() {
										callback.call(vm, d);
									}
								});
							});
						}
					}
				});
			}
		},

		update: function(vm, modelClass, callback) {
			//vm.$v.$touch();
			//if (!vm.$v.$invalid) {
			Modal.confirm({
				body: 'Alterar Registro?',
				onClose(resposta) {
					if (resposta) {
						modelClass.alterar(vm.id, vm.model).done(d => {
							Modal.prompt({
								body: '<div class="text-success">Registro Alterado.</div>',
								onClose() {
									callback.call(vm, d);
								}
							});
						});
					}
				}
			});
			//}
		},

		delete: function(vm, modelClass, callback) {
			Modal.confirm({
				body: 'Excluir Registro?',
				onClose(resposta) {
					if (resposta) {
						modelClass.excluir(vm.id)
							.done(d => {
								Modal.prompt({
									body: '<div class="text-success">Registro Excluído!</div>',
									onClose() {
										callback.call(vm, d);
									}
								});
							});
					}
				}
			});
		}
	}
});