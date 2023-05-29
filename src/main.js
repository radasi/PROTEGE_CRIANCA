//import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import VueMask from 'v-mask';

import routes from '@/routes';
import storeConfig from '@/store';
//import $ from 'jquery';
import initializer from '@/initializer';
import '@/assets/styles/main.css';
//import Layout from '@/views/commons/Main/index.vue';
import Layout from '@/views/commons/layout.vue';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.use(VueMask);

let router = new VueRouter({ routes });
let store = new Vuex.Store(storeConfig);

initializer(router, store);

new Vue({
	router,
	store,
	render: h => h(Layout)
}).$mount('#app');