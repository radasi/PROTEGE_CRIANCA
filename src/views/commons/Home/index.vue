<template>
	<b-container fluid="sm">
		<div class="row">
			<div class="col-md-12 text-center" style="color:white;background-color:red;font-size:30px;">Página Inicial</div>
		</div>
		<v-login v-if="!$store.state.usuario"></v-login>
		<div class="row" v-else>
			<div class="col-md-12">
				<br>
				<a class="btn btn-primary" type="button" href="#/ocorrencias" target="_self">Listar Ocorrências</a>
				<br>
			</div>
		</div>
	</b-container>
</template>

<script>
	import $ from 'jquery';
	import Ocorrencia from '../../../models/ocorrencia';
	import Detalhes from '@/views/commons/Home/detalhes.vue';
	import Vue from 'vue';
	import VLogin from '@/views/permisys/login.vue';

	export default {
		components: { VLogin },
		data() {
			return {
				telaDetalhe: false,
				ocorrencias: [],
				qtdOcorrenciasAbertas: 0
			};
		},

		created: async function() {
		},

		methods: {
			acompanharOcorrencia: function(id, ev) {
				ev.preventDefault();
				this.telaDetalhe = true;
				window.open('#/ocorrencia/' + id, '_blank');
			},

			atualizarQuantidade: function() {
				var vue = this;
				setTimeout(function() {
					vue.consultarQuantidade();
					vue.atualizarQuantidade();
				}, 30000);
			},

			consultarOcorrencias: async function() {
				var filtro = '';
				if (this.$refs.filtroAcompanhamento && this.$refs.filtroAcompanhamento.checked) {
					filtro = filtro + 'acompanhamento=true';
				}
				if (this.$refs.filtroConcluidas && this.$refs.filtroConcluidas.checked) {
					if (filtro != '') {
						filtro = filtro + '&';
					}
					filtro = filtro + 'concluida=true';
				}
				if (this.$refs.filtroCanceladas && this.$refs.filtroCanceladas.checked) {
					if (filtro != '') {
						filtro = filtro + '&';
					}
					filtro = filtro + 'cancelada=true';
				}
				this.ocorrencias = (await Ocorrencia.listarOcorrencias(filtro)).data;
			},

			consultarQuantidade: async function() {
				var ocorrenciasAbertas = (await Ocorrencia.consultarQuantidadeOcorrenciasAbertas()).data;
				if (ocorrenciasAbertas !== this.qtdOcorrenciasAbertas) {
					this.qtdOcorrenciasAbertas = ocorrenciasAbertas;
					if (ocorrenciasAbertas > 0) {
						this.$refs.rowOcorrencias.style.borderColor = 'red';
					} else {
						this.$refs.rowOcorrencias.style.borderColor = 'black';
					}
					$('html').animate({ scrollTop: 0}, 'fast');
					this.consultarOcorrencias();
				}
			}
		}
	};
</script>

<style></style>