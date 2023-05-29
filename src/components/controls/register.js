import Vue from 'vue';

export default function (prefix) {
	let context = require.context('./', true, /\.vue$/);
	let components = context.keys();

	components.forEach(c => {
		let name = c.replace('./', '').replace('.vue', '');

		if (name == 'base') {
			return;
		}

		name = `${prefix}${name[0].toUpperCase()}${name.substr(1)}`;
		Vue.component(name, context(c));
	});
}