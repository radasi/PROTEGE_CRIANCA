<template>
	<b-container fluid="sm">
		<div class="row">
			<div v-if="qtdOcorrenciasAbertas > 1" class="col-md-12 text-center" style="color:white;background-color:red;font-size:30px;">{{ qtdOcorrenciasAbertas }} Ocorrências Abertas</div>
			<div v-else-if="qtdOcorrenciasAbertas == 1" class="col-md-12 text-center" style="color:white;background-color:red;font-size:30px;">{{ qtdOcorrenciasAbertas }} Ocorrência Aberta</div>
		</div>
		<div class="row">
			<div class="col-md-2">
				<a target="_self" href="#/funcionarios">Funcionários</a>
			</div>
			<div class="col-md-3"><input type="checkbox" checked disabled> Ocorrências Abertas</div>
			<div class="col-md-3">
				<label>
					<input ref="filtroAcompanhamento" class="filtro" type="checkbox" @click="consultarOcorrencias"> Em Acompanhamento
				</label>
			</div>
			<div class="col-md-2">
				<label>
					<input ref="filtroConcluidas" class="filtro" type="checkbox" @click="consultarOcorrencias"> Concluídas
				</label>
			</div>
			<div class="col-md-2">
				<label>
					<input ref="filtroCanceladas" class="filtro" type="checkbox" @click="consultarOcorrencias"> Canceladas
				</label>
			</div>
		</div>
		<div ref="rowOcorrencias" class="row row-ocorrencias">
			<div class="col-md-12">
				<table class="table table-hover" style="border:2px #dadada ridge;font-size:16px">
					<thead>
						<th>Ocorrência</th>
						<th>Local Cadastrado</th>
						<th>Situação</th>
						<th>Atendente</th>
						<th>Última Atualização</th>
						<th>Ação</th>
					</thead>
					<tbody>
						<tr v-for="v in ocorrencias" :id="v.id" :key="v.id">
							<td width="150px">
								<a href="" @click="acompanharOcorrencia(v.id, $event)">{{ v.id }}</a>
							</td>
							<td v-if="v.funcionario.escola[0] && v.funcionario.escola[0].nome">{{ v.funcionario.escola[0].nome }}</td>
							<td v-else></td>
							<td width="250px">
								<a href="" @click="acompanharOcorrencia(v.id, $event)">{{ v.situacaoOcorrencia.descricao }}</a>
							</td>
							<td v-if="v.usuarioAtendente && v.usuarioAtendente.nome"> {{ v.usuarioAtendente.nome }} </td>
							<td v-else></td>
							<td>{{ v.dataHoraSistemaJSON }}</td>
							<td width="100px">
								<button v-if="v.situacaoOcorrencia.id==1" class="btn btn-primary" @click="acompanharOcorrencia(v.id, $event)">Acompanhar</button>
								<button v-else-if="v.situacaoOcorrencia.id==2" class="btn btn-info" @click="acompanharOcorrencia(v.id, $event)">Atualizar</button>
								<button v-else class="btn btn-secondary" @click="acompanharOcorrencia(v.id, $event)">Consultar</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</b-container>
</template>

<script>
	import $ from 'jquery';
	import Ocorrencia from '../../../models/ocorrencia';

	export default {
		data() {
			return {
				telaDetalhe: false,
				ocorrencias: [],
				qtdOcorrenciasAbertas: 0
			};
		},

		created: async function() {
			this.consultarQuantidade();
			this.atualizarQuantidade();
			this.consultarOcorrencias();
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
					$('html').animate({ scrollTop: 0 }, 'fast');
					this.consultarOcorrencias();
				}
			}
		}
	};
</script>

<style></style>