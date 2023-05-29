<template>
	<div>
		<div v-if="hasError" class="alert alert-danger">
			Ocorreu um erro durante a consulta aos dados.
			<button type="button" class="btn btn-danger btn-xs pull-right" @click="fetchData">
				<i class="fa fa-exclamation-triangle"></i> Tentar Novamente
			</button>
		</div>

		<template v-if="fullSearchFieldsAvailable">
			<div class="checkbox">
				Selecione os campos para pesquisa:
				<label v-for="fsf in fullSearchFields" class="checkbox-inline">
					<input type="checkbox" :value="fsf.id" v-model="userFullSearchFields"> {{ fsf.name }}
				</label>
			</div>
			<div class="form-group">
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						placeholder="Pesquisa..."
						maxlength="100"
						v-model="userFullSearchValue"
						@keyup.enter="applyFullSearch"
					>
					<span class="input-group-btn">
						<button type="button" class="btn btn-default" @click="applyFullSearch">
							<i class="fa fa-search"></i>
						</button>
					</span>
				</div>
				<div v-if="currentFullSearch" class="help-block">
					Pesquisando por <i><u>{{ currentFullSearch.value }}</u></i> no(s) campo(s) <i><u>{{ currentFullSearch.fields }}</u></i>.
				</div>
				<div v-else class="help-block">Nenhuma pesquisa aplicada.</div>
			</div>
		</template>

		<table v-show="!isEmpty" class="table table-bordered table-condensed table-hover">
			<thead class="v-paginator-head">
				<tr>
					<th v-for="field in fields" @click="applySort(field.id, $event)" class="text-center">
						{{ field.name }}
						<span class="pull-right">
							<i v-show="field.sortOrder=='asc'" class="fa fa-sort-alpha-asc"></i>
							<i v-show="field.sortOrder=='desc'" class="fa fa-sort-alpha-desc"></i>
							<sup class="fa">{{ field.sortIndex }}</sup>
						</span>
					</th>
					<slot name="extraHeaders"></slot>
				</tr>
			</thead>
			<tbody class="v-paginator-body">
				<template v-for="item in itemList">
					<slot name="fields" :item="item">
						<tr>
							<td v-for="field in fields" class="text-center">{{ item[field.id] }}</td>
						</tr>
					</slot>
				</template>
			</tbody>
			<tfoot class="v-paginator-foot">
				<tr>
					<td :colspan="cols">
						<div class="row">
							<div class="col-sm-12 col-md-3"  style="margin-bottom: 5px;">
								<select class="form-control input-sm" v-model.number="userItemsPerPage" :disabled="isEmpty">
									<option value="10">10 por página</option>
									<option value="20">20 por página</option>
									<option value="25">25 por página</option>
									<option value="50">50 por página</option>
									<option value="100">100 por página</option>
									<option value="-1">Exibir todos</option>
								</select>
							</div>
							<div class="col-xs-6 col-sm-8 col-md-6">
								<p class="form-control-static text-center text-muted">
									<span class="hidden-xs">
										Página {{ currentPage }} de {{ pageCount }}
										/ Registro {{ itemOffset }} à {{ finalItemOffset }} de {{ itemCount }}
									</span>
									<span class="visible-xs-inline">
										Pg. {{ currentPage }} de {{ pageCount }}
										({{ itemOffset }}-{{ finalItemOffset }}/{{ itemCount }})
									</span>
								</p>
							</div>
							<div class="col-xs-6 col-sm-4 col-md-3">
								<div class="pull-right">
									<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToPreviousPage" @click="goToFirstPage">
										<span class="hidden-xs">Primeira</span>
										<span class="visible-xs-inline"><i class="fa fa-fast-backward"></i></span>
									</button>
									<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToPreviousPage" @click="goToPreviousPage">
										<i class="fa fa-chevron-left"></i>
									</button>
									<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToNextPage" @click="goToNextPage">
										<i class="fa fa-chevron-right"></i>
									</button>
									<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToNextPage" @click="goToLastPage">
										<span class="hidden-xs">Última</span>
										<span class="visible-xs-inline"><i class="fa fa-fast-forward"></i></span>
									</button>
								</div>
							</div>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>

		<div v-show="isEmpty" class="alert alert-warning">
			Nenhum registro para exibição.
			<button v-show="!hasError" type="button" class="btn btn-warning btn-xs pull-right" @click="fetchData">
				<i class="fa fa-refresh"></i> Atualizar
			</button>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		props: {
			config: { default: undefined },
			fields: { default: () => [] },
			url: { default: undefined },
			cols: { default: undefined },
			writeToUrl: { default: true }
		},

		data: function() {
			return {
				/* Campos Internos */
				fieldsMap: null,
				hasError: false,
				loadingConfig: false,
				userSortFields: new Map(),
				userFullSearchFields: [],
				userFullSearchValue: '',

				/* Recebidos do Back-end */
				pageCount: 0,
				currentPage: 0,
				itemCount: 0,
				itemOffset: 0,
				itemList: [],

				/* Enviados ao Back-end */
				page: 1,
				items_per_page: 25,
				show_all_items: false,
				sort_fields: '',
				filter_fields: '',
				fullsearch_fields: '',
				fullsearch_value: ''
			};
		},

		computed: {
			isEmpty: function () {
				return this.itemCount == 0;
			},

			canGoToPreviousPage: function() {
				return this.currentPage > 1;
			},

			canGoToNextPage: function() {
				return this.currentPage < this.pageCount;
			},

			finalItemOffset: function() {
				if (this.show_all_items) {
					return this.itemCount;
				} else {
					var finalOffset = this.itemOffset + this.items_per_page - 1;
					return (finalOffset < this.itemCount) ? finalOffset : this.itemCount;
				}
			},

			userItemsPerPage: {
				get: function() {
					return (this.show_all_items) ? -1 : this.items_per_page;
				},
				set: function(newValue) {
					if (newValue == -1) {
						this.show_all_items = true;
					} else {
						this.show_all_items = false;
						this.items_per_page = newValue;
					}
				}
			},

			sortFields: function() {
				return this.fields.filter(f => f.sort == true);
			},

			fullSearchFields: function() {
				return this.fields.filter(f => f.fullSearch == true);
			},

			fullSearchFieldsAvailable: function() {
				return this.fullSearchFields.length > 0;
			},

			currentFullSearch: function() {
				if (this.fullsearch_fields && this.fullsearch_value) {
					return {
						fields: this.fullsearch_fields.split(',').map(f => this.fieldsMap.get(f).name).join(', '),
						value: this.fullsearch_value
					};
				} else {
					return null;
				}
			}
		},

		methods: {
			fetchData : function() {

				if (this.loadingConfig) {
					return;
				}

				var data = {
					page: this.page,
					items_per_page: this.items_per_page,
					show_all_items: this.show_all_items
				};

				if (this.sort_fields) {
					data.sort_fields = this.sort_fields;
				}

				if (this.filter_fields) {
					data.filter_fields = this.filter_fields;
				}

				if (this.fullsearch_value) {
					data.fullsearch_fields = this.fullsearch_fields;
					data.fullsearch_value = this.fullsearch_value;
				}

				this.saveConfig();

				$.get(this.url, data)
					.done(data => {
						if (data.itemCount > 0) {
							this.pageCount = data.pageCount;
							this.currentPage = data.currentPage;
							this.itemCount = data.itemCount;
							this.itemOffset = data.itemOffset;
							this.itemList = data.itemList;
							// Em algumas situações o back-end retorna o "itemOffset" com valor "0".
							if (this.itemOffset == 0) {
								this.itemOffset = 1;
							}
						}
						// Ajusta os valores do back-end quando não há resultados.
						else {
							this.pageCount = 0;
							this.currentPage = 0;
							this.itemCount = 0;
							this.itemOffset = 0;
							this.itemList = [];
						}
						this.hasError = false;
					})
					.fail(() => {
						this.hasError = true;
					})
					.always(() => {
						// Ajusta a página atual solicitada, caso o número total de páginas tenha sido alterado.
						if (this.page > this.pageCount) {
							this.page = (this.pageCount > 0) ? this.pageCount : 1;
						}
					});
			},

			goToFirstPage: function() {
				this.page = 1;
			},

			goToPreviousPage: function() {
				if (this.page > 1) {
					this.page--;
				}
			},

			goToNextPage: function() {
				if (this.page < this.pageCount) {
					this.page++;
				}
			},

			goToLastPage: function() {
				this.page = (this.pageCount > 0) ? this.pageCount : 1;
			},

			applySort: function(field, event) {
				// Verifica se o campo é ordenável.
				if (!this.fieldsMap.get(field).sort) {
					return;
				}

				/* Inverte a ordem do campo se ele já estiver na ordenação ou usa a ordem padrão. */
				var order = this.userSortFields.get(field); 
				if (order) {
					order = (order == 'asc') ? 'desc': 'asc';
				} else {
					order = 'asc';
				}

				// Remove o campo da ordenação.
				if (!event || event.ctrlKey) {
					this.userSortFields.delete(field);
				}
				// Limpa todos os campos da ordenação.
				else {
					this.userSortFields.clear();
					this.fields.forEach(s =>s.sortOrder = null);
				}

				/* Adiciona o campo na ordenção. */
				this.userSortFields.set(field, order);
				this.fieldsMap.get(field).sortOrder = order;

				/* Recalcula o índice de todos os campos da ordenação. */
				var keys = [...this.userSortFields.keys()];
				this.fields.forEach(f => {
					var index = keys.indexOf(f.id);
					f.sortIndex = (index == -1) ? null : index+1;
				});

				/* Atribuí o filtro de ordenação do back-end. */
				this.sort_fields = [...this.userSortFields]
					.map(s => s[0] + ':' + s[1])
					.join(',');

				this.fetchData();
			},

			applyFullSearch: function() {
				if (this.userFullSearchFields.length > 0 && this.userFullSearchValue) {
					this.fullsearch_fields = this.userFullSearchFields.join(',');
					this.fullsearch_value = this.userFullSearchValue;
				} else {
					this.fullsearch_fields = '';
					this.fullsearch_value = '';
				}

				this.fetchData();
			},

			loadConfig: function() {
				if (!this.config) {
					return;
				}

				this.loadingConfig = true;

				if (this.config.p && /^\d+$/.test(this.config.p)) {
					this.page = parseInt(this.config.p, 10);
				}

				if (this.config.ipp && ['10', '20', '25', '50', '100'].indexOf(this.config.ipp) >= 0) {
					this.items_per_page = parseInt(this.config.ipp, 10);
				}

				if (this.config.sai && (this.config.sai == 'true' || this.config.sai == 'false')) {
					this.show_all_items = (this.config.sai == 'true');
				}

				if (this.config.sf && /^\w+:(asc|desc)(,\w+:(asc|desc))*$/.test(this.config.sf )) {
					this.config.sf.split(',').forEach(s => {
						var sParts = s.split(':');
						var field = sParts[0];
						var order = sParts[1];
						if (this.fieldsMap.has(field)) {
							this.applySort(field);
							if (order == 'desc') {
								this.applySort(field);
							}
							
						}
					});
				}

				if (this.config.ff) {
					this.config.filter_fields = this.config.ff;
				}

				if (this.config.fsf && /^\w+(,\w+)*$/.test(this.config.fsf)) {
					this.userFullSearchFields = [];
					this.config.fsf.split(',').forEach(f => {
						if (this.fieldsMap.has(f)) {
							this.userFullSearchFields.push(f);
						}
					});
				}

				if (this.config.fsv) {
					this.userFullSearchValue = this.config.fsv.slice(0, 100);
				}

				this.applyFullSearch();

				this.loadingConfig = false;
			},

			saveConfig: function() {
				var config = {
					p: this.page,
					ipp: this.items_per_page,
					sai: this.show_all_items,
					sf: this.sort_fields,
					ff: this.filter_fields,
					fsf: this.fullsearch_fields,
					fsv: this.fullsearch_value
				};

				this.$emit('configChanged', config);

				if (this.writeToUrl) {
					this.$router.replace({ query: config });
				}
			}
		},

		watch: {
			page: function() {
				this.fetchData();
			},

			userItemsPerPage: function() {
				this.fetchData();
			}
		},

		created: function (){
			this.fieldsMap = new Map(this.fields.map(s => [s.id, s]));
			this.userFullSearchFields = this.fullSearchFields.map(s => s.id);

			this.loadConfig();
			this.fetchData();
		}
	};
</script>

<style scoped>
	.fa {
		margin-top: 3px;
	}

	sup.fa {
		font-size: 10px;
	}

	th {
		user-select: none;
		cursor: pointer;
	}
</style>