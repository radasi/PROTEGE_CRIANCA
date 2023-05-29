import Vue from 'vue';
import Modal from '@/components/modal';

export default Vue.mixin({
	methods: {
		showModal(view, params = {}) {
			let modal = new Modal();
			view = new (Vue.extend(view))(params);
			modal.element.html(view.$mount().$el);
			view.$on('hook:destroyed', modal.close);
			return view;
		}
	}
});