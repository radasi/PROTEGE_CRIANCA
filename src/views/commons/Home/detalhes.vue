<template>
	<b-container fluid="sm">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-hover" style="border:2px #dadada ridge;font-size:16px">
					<thead ref="cabecalho">
						<tr>
							<th width="10px"><button class="btn btn-info pull-left" @click="recarregarTela">Voltar</button></th>
							<th width="250px" class="text-center"></th>
							<th>Detalhes da Ocorrência</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td>Ocorrência</td>
							<td class="text-center"><input ref="id" class="form-control" type="text" :value="id" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Situação</td>
							<td>
								<input ref="situacaoOcorrencia" class="form-control" type="text" :value="situacaoOcorrencia.descricao" disabled>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>Funcionário</td>
							<td class="text-center"><input ref="funcionario" class="form-control" type="text" :value="funcionario" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Escola</td>
							<td class="text-center"><input ref="escola" class="form-control" type="text" :value="escola" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Data Hora Acionamento</td>
							<td class="text-center"><input ref="dataHoraAcionamento" class="form-control" type="text" :value="dataHoraAcionamento" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Data Hora Sistema</td>
							<td class="text-center"><input ref="dataHoraSistemaJSON" class="form-control" type="text" :value="dataHoraSistemaJSON" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Atendente</td>
							<td class="text-center"><input ref="atendente" class="form-control" type="text" :value="atendente" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Data Hora Local Viatura</td>
							<td class="text-center"><input ref="dataHoraLocalViatura" class="form-control" type="datetime-local" :value="dataHoraLocalViatura"></td>
						</tr>
						<tr>
							<td></td>
							<td>Data Hora Encerramento</td>
							<td class="text-center"><input ref="dataHoraEncerramento" class="form-control" type="text" :value="dataHoraEncerramento" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Usuário de Encerramento</td>
							<td class="text-center"><input ref="usuarioEncerramento" class="form-control" type="text" :value="usuarioEncerramento" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td>Fatos</td>
							<td class="text-center"><textarea ref="fatos" rows="5" class="form-control" :value="fatos"></textarea></td>
						</tr>
						<tr>
							<td></td>
							<td>Providências</td>
							<td class="text-center"><textarea ref="providencias" rows="5" class="form-control" :value="providencias"></textarea></td>
						</tr>
						<tr>
							<td></td>
							<td>Equipe Acionada</td>
							<td class="text-center"><textarea ref="equipeAcionada" rows="5" class="form-control" :value="equipeAcionada"></textarea></td>
						</tr>
						<tr>
							<td></td>
							<td>Deslocamentos</td>
							<td class="text-center"><textarea ref="deslocamentos" rows="5" class="form-control" :value="deslocamentos"></textarea></td>
						</tr>
						<tr>
							<td></td>
							<td>Outros Dados</td>
							<td class="text-center"><textarea ref="outrosDados" rows="5" class="form-control" :value="outrosDados"></textarea></td>
						</tr>
						<tr>
							<td><button v-if="situacaoOcorrencia.id < 3" class="btn btn-danger" type="button" @click="cancelarOcorrencia">Cancelar</button></td>
							<td class="text-right">
								<button type="button" class="btn btn-info" @click="atualizarOcorrencia">
									<span ref="btnSalvar">Salvar</span> <BIconCheck ref="btnOk" style="display:none" />
								</button>
							</td>
							<td class="text-right"><button v-if="situacaoOcorrencia.id < 3" class="btn btn-success" type="button" @click="encerrarOcorrencia">Encerrar</button></td>
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
		props: ['idOcorrencia'],

		data: function() {
			return {
				id: 0,
				idFuncionario: 0,
				funcionario: '',
				fatos: '',
				escola: '',
				atendente: '',
				usuarioEncerramento: '',
				providencias: '',
				idSituacaoOcorrencia: 0,
				situacaoOcorrencia: { descricao: '' },
				idTipoOcorrencia: 0,
				tipoOcorrencia: { descricao: '' },
				equipeAcionada: '',
				deslocamentos: '',
				outrosDados: '',
				dataHoraAcionamento: '',
				dataHoraLocalViatura: '',
				dataHoraEncerramento: '',
				dataHoraSistemaJSON: '',
				idUsuarioAcompanhamento: 0,
				idUsuarioEncerramento: 0
			};
		},

		mounted: async function() {
			var dadosOcorrencia = (await Ocorrencia.acompanharOcorrencia(this.idOcorrencia)).data;
			this.id = dadosOcorrencia.id;
			this.idFuncionario = dadosOcorrencia.idFuncionario;
			this.funcionario = dadosOcorrencia.funcionario.nome;
			this.atendente = dadosOcorrencia.usuarioAtendente.nome;
			this.usuarioEncerramento = dadosOcorrencia.usuarioEncerramento.nome;
			this.fatos = dadosOcorrencia.fatos;
			this.providencias = dadosOcorrencia.providencias;
			this.idSituacaoOcorrencia = dadosOcorrencia.idSituacaoOcorrencia;
			this.situacaoOcorrencia = dadosOcorrencia.situacaoOcorrencia;
			this.idTipoOcorrencia = dadosOcorrencia.idTipoOcorrencia;
			this.tipoOcorrencia = dadosOcorrencia.tipoOcorrencia;
			this.equipeAcionada = dadosOcorrencia.equipeAcionada;
			this.deslocamentos = dadosOcorrencia.deslocamentos;
			this.outrosDados = dadosOcorrencia.outrosDados;
			this.dataHoraAcionamento = dadosOcorrencia.dataHoraSistemaJSON;
			this.dataHoraLocalViatura = dadosOcorrencia.dataHoraLocalViatura;
			this.dataHoraEncerramento = dadosOcorrencia.dataHoraEncerramento;
			this.dataHoraSistemaJSON = dadosOcorrencia.dataHoraSistemaJSON;
			this.idUsuarioAcompanhamento = dadosOcorrencia.idUsuarioAcompanhamento;
			this.idUsuarioEncerramento = dadosOcorrencia.idUsuarioEncerramento;
			this.escola = dadosOcorrencia.funcionario.escola[0].nome;
			for (var ix = 1; ix < dadosOcorrencia.funcionario.escola.length; ix++){
				this.escola = this.escola + ' / ' + dadosOcorrencia.funcionario.escola[ix].nome;
			}
		},

		methods: {
			atualizarOcorrencia: function(ev) {
				ev.preventDefault();
				var Vue = this;
				var dadosOcorrencia = {
					id: Vue.id,
					fatos: Vue.$refs.fatos.value,
					providencias: Vue.$refs.providencias.value,
					equipeAcionada: Vue.$refs.equipeAcionada.value,
					deslocamentos: Vue.$refs.deslocamentos.value,
					outrosDados: Vue.$refs.outrosDados.value,
					dataHoraLocalViatura: Vue.$refs.dataHoraLocalViatura.value
				};
				Ocorrencia.atualizarOcorrencia(Vue.id, dadosOcorrencia, function(ret, res) {
					if (res.status === 200 || res.status === 204) {
						Vue.$refs.btnOk.style.display = 'initial';
						setTimeout(function() {
							Vue.$refs.btnOk.style.display = 'none';
						}, 4000);
					} else {
						if (res.responseJSON.exceptionMessage) {
							Vue.$refs.btnSalvar.innerHTML = res.responseJSON.exceptionMessage;
						} else {
							Vue.$refs.btnSalvar.innerHTML = 'Erro ao atualizar dados da ocorrência';
						}
						setTimeout(function() {
							Vue.$refs.btnSalvar.innerHTML = 'Alterar';
						}, 4000);
					}
				});
			},

			cancelarOcorrencia: async function() {
				var status = (await Ocorrencia.cancelarOcorrencia(this.idOcorrencia)).status;
				if (status == 200){
					this.elevarTela();
					this.situacaoOcorrencia.descricao = 'Cancelada';
				}
			},

			elevarTela: async function() {
				$('html').animate({ scrollTop: 0 }, 'slow');
			},

			encerrarOcorrencia: async function() {
				var status = (await Ocorrencia.encerrarOcorrencia(this.idOcorrencia)).status;
				if (status == 200){
					this.elevarTela();
					this.situacaoOcorrencia.descricao = 'Concluída';
				}
			},

			recarregarTela: function() {
				window.open('#/', '_self');
			}
		}
	};

</script>