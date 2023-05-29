<template>
	<b-container fluid="sm">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-hover" style="border:2px #dadada ridge;font-size:16px">
					<thead ref="cabecalho">
						<tr>
							<th width="180px">CPF</th>
							<th>NOME</th>
							<th width="150px">MATRÍCULA</th>
							<th width="150px">CELULAR</th>
							<th>ESCOLA</th>
							<th width="100px"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="f in funcionarios" :id="f.id" :key="f.id" class="cadastrados">
							<td>{{ f.cpf }}</td>
							<td>{{ f.nome }}</td>
							<td>{{ f.matricula }}</td>
							<td>{{ f.telefoneCelular }}</td>
							<td v-if="f.escola[0] && f.escola[0].nome" :id="f.escola[0].id">{{ f.escola[0].nome }}</td>
							<td v-else></td>
							<td>
								<button class="btn btn-xs btn-secondary" type="button" @click="editarFuncionario">Editar</button>
							</td>
						</tr>
						<tr>
							<td><input ref="novoCpf" class="texto form-control" placeholder="Novo CPF" type="number" maxLength="9"></td>
							<td><input ref="novoNome" class="texto form-control" placeholder="Nome"></td>
							<td><input ref="novaMatricula" class="texto form-control" placeholder="Matrícula" type="number"></td>
							<td><input ref="novoCelular" class="texto form-control" placeholder="Celular"></td>
							<td>
								<select id="escolaNova" ref="novaEscola" class="texto form-control" @click="listarEscolas">
									<option>Selecione Escola</option>
									<option v-for="e in escolas" :id="e.id" :key="e.id">{{ e.nome }}</option>
								</select>
							</td>
							<td v-if="idFuncionarioAlterado == 0"><button class="btn btn-primary" type="button" @click="incluirFuncionario">Incluir</button></td>
							<td v-else><button class="btn btn-primary" type="button" @click="alterarFuncionario">Alterar</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</b-container>
</template>

<script>
	import Funcionario from '../../../models/funcionario';
	import $ from 'jquery';

	export default {
		data: function() {
			return {
				escolas: [],
				funcionarios: [],
				id: 0,
				idFuncionarioAlterado: 0,
				ativo: true,
				descritivo: '',
				inicio: '',
				fim: '',
				opcoes: [],
				qtdOpcoesEleitor: 0,
				qtdEleitos: 0,
				qtdSuplentes: 0,
				interno: true,
				opcoesDisponiveis: [],
				qtdOpcoes: 0,
				confirmacaoPorEmail: true
			};
		},

		mounted: function() {
			this.listarFuncionarios();
		},

		methods: {
			alterarFuncionario: function() {
				var vue = this;
				var dadosFuncionario = {
					id: vue.idFuncionarioAlterado,
					cpf: this.$refs.novoCpf.value,
					nome: this.$refs.novoNome.value,
					matricula: this.$refs.novaMatricula.value,
					telefoneCelular: this.$refs.novoCelular.value,
					escola: [ { id: this.$refs.novaEscola.selectedOptions[0].id } ]
				};
				vue.funcionarios = [];
				Funcionario.atualizarDadosFuncionario(vue.idFuncionarioAlterado, dadosFuncionario, function(ret, res) {
					if (res.status == 200){
						vue.liberarDadosNovoFuncionario();
						vue.funcionarios = res.responseJSON;
						vue.idFuncionarioAlterado = 0;
					}
				});
			},

			editarFuncionario: function(ev) {
				var vue = this;
				vue.idFuncionarioAlterado = $(ev.currentTarget).parents('tr').attr('id');
				$('.cadastrados').remove();
				$(ev.currentTarget).parents('tr').find('td').map(function(ix, dados) {
					switch(ix){
					case 0:
						vue.$refs.novoCpf.value = $(dados).html();
						break;
					case 1:
						vue.$refs.novoNome.value = $(dados).html();
						break;
					case 2:
						vue.$refs.novaMatricula.value = $(dados).html();
						break;
					case 3:
						vue.$refs.novoCelular.value = $(dados).html();
						break;
					case 4:
						vue.$refs.novaEscola.value = $(dados).html();
						break;
					}
				});
			},

			incluirFuncionario: function() {
				var vue = this;
				var dadosFuncionario = {
					cpf: this.$refs.novoCpf.value,
					nome: this.$refs.novoNome.value,
					matricula: this.$refs.novaMatricula.value,
					telefoneCelular: this.$refs.novoCelular.value,
					escola: [ { id: this.$refs.novaEscola.selectedOptions[0].id } ]
				};
				vue.funcionarios = [];
				Funcionario.incluirFuncionario(dadosFuncionario, function(ret, res) {
					if (res.status == 200){
						vue.liberarDadosNovoFuncionario();
						vue.funcionarios = res.responseJSON;
					}
				});
			},

			liberarDadosNovoFuncionario: function() {
				this.$refs.novoCpf.value = '';
				this.$refs.novoNome.value = '';
				this.$refs.novaMatricula.value = '';
				this.$refs.novoCelular.value = '';
				this.$refs.novaEscola.value = '';
			},

			listarEscolas: async function() {
				this.escolas = (await Funcionario.listarEscolas()).data;
			},

			listarFuncionarios: async function() {
				this.funcionarios = (await Funcionario.listarFuncionarios()).data;
			}
		}
	};

</script>