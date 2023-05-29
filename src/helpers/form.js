import $ from 'jquery';

export default class Form {
	constructor(data) {
		this.originalData = data;

		for (let field in data) {
			this[field] = data[field];
		}
	}

	clear() {
		for (let field in this.originalData) {
			this[field] = this.originalData[field];
		}
	}

	data() {
		let data = {};

		for (let field in this.originalData) {
			data[field] = this[field];
		}

		return data;
	}

	save(url, options = {}) {
		options.data = JSON.stringify(this.data());
		options.url = url;
		options.method = 'POST';
		options.contentType = 'application/json';

		if (this.id) {
			return this.update(url, options);
		}

		return $.ajax(options);
	}

	update(url, options = {}) {
		options.data = JSON.stringify(this.data());
		options.url = url;
		options.method = 'PUT';
		options.contentType = 'application/json';

		return $.ajax(options);
	}
}