(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40df26d7"],{"80ac":function(t,a,e){"use strict";var r=e("bc3a"),o=e.n(r),s=e("1157"),i=e.n(s);const n=o.a.create({baseURL:window.Config.BASE_URL});a["a"]={acompanharOcorrencia:t=>n.get("ocorrencia/"+t,{headers:{Authorization:"BEARER "+sessionStorage.getItem("token")}}),atualizarOcorrencia(t,a,e){var r="BEARER "+sessionStorage.getItem("token");i.a.ajax({url:window.Config.BASE_URL+"/ocorrencia/"+t,method:"PUT",contentType:"application/json",data:JSON.stringify(a),headers:{authorization:r},global:!1,complete:function(t){e.call(this,!0,t)}})},cancelarOcorrencia:t=>n.post("ocorrencia/"+t+"/cancelar",null,{headers:{Authorization:"BEARER "+sessionStorage.getItem("token")}}),consultarQuantidadeOcorrenciasAbertas(){return n.get("ocorrencia/quantidadeOcorrenciaAberta",{headers:{Authorization:"BEARER "+sessionStorage.getItem("token")}})},encerrarOcorrencia:t=>n.post("ocorrencia/"+t+"/encerrar",null,{headers:{Authorization:"BEARER "+sessionStorage.getItem("token")}}),listarOcorrencias:t=>n.get("ocorrencia?"+t,{headers:{contentType:"application/json",Authorization:"BEARER "+sessionStorage.getItem("token")}})}},df06:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-container",{attrs:{fluid:"sm"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("table",{staticClass:"table table-hover",staticStyle:{border:"2px #dadada ridge","font-size":"16px"}},[e("thead",{ref:"cabecalho"},[e("tr",[e("th",{attrs:{width:"10px"}},[e("button",{staticClass:"btn btn-info pull-left",on:{click:t.recarregarTela}},[t._v("Voltar")])]),e("th",{staticClass:"text-center",attrs:{width:"250px"}}),e("th",[t._v("Detalhes da Ocorrência")])])]),e("tbody",[e("tr",[e("td"),e("td",[t._v("Ocorrência")]),e("td",{staticClass:"text-center"},[e("input",{ref:"id",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.id}})])]),e("tr",[e("td"),e("td",[t._v("Situação")]),e("td",[e("input",{ref:"situacaoOcorrencia",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.situacaoOcorrencia.descricao}})])]),e("tr",[e("td"),e("td",[t._v("Funcionário")]),e("td",{staticClass:"text-center"},[e("input",{ref:"funcionario",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.funcionario}})])]),e("tr",[e("td"),e("td",[t._v("Escola")]),e("td",{staticClass:"text-center"},[e("input",{ref:"escola",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.escola}})])]),e("tr",[e("td"),e("td",[t._v("Data Hora Acionamento")]),e("td",{staticClass:"text-center"},[e("input",{ref:"dataHoraAcionamento",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.dataHoraAcionamento}})])]),e("tr",[e("td"),e("td",[t._v("Data Hora Sistema")]),e("td",{staticClass:"text-center"},[e("input",{ref:"dataHoraSistemaJSON",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.dataHoraSistemaJSON}})])]),e("tr",[e("td"),e("td",[t._v("Atendente")]),e("td",{staticClass:"text-center"},[e("input",{ref:"atendente",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.atendente}})])]),e("tr",[e("td"),e("td",[t._v("Data Hora Local Viatura")]),e("td",{staticClass:"text-center"},[e("input",{ref:"dataHoraLocalViatura",staticClass:"form-control",attrs:{type:"datetime-local"},domProps:{value:t.dataHoraLocalViatura}})])]),e("tr",[e("td"),e("td",[t._v("Data Hora Encerramento")]),e("td",{staticClass:"text-center"},[e("input",{ref:"dataHoraEncerramento",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.dataHoraEncerramento}})])]),e("tr",[e("td"),e("td",[t._v("Usuário de Encerramento")]),e("td",{staticClass:"text-center"},[e("input",{ref:"usuarioEncerramento",staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.usuarioEncerramento}})])]),e("tr",[e("td"),e("td",[t._v("Fatos")]),e("td",{staticClass:"text-center"},[e("textarea",{ref:"fatos",staticClass:"form-control",attrs:{rows:"5"},domProps:{value:t.fatos}})])]),e("tr",[e("td"),e("td",[t._v("Providências")]),e("td",{staticClass:"text-center"},[e("textarea",{ref:"providencias",staticClass:"form-control",attrs:{rows:"5"},domProps:{value:t.providencias}})])]),e("tr",[e("td"),e("td",[t._v("Equipe Acionada")]),e("td",{staticClass:"text-center"},[e("textarea",{ref:"equipeAcionada",staticClass:"form-control",attrs:{rows:"5"},domProps:{value:t.equipeAcionada}})])]),e("tr",[e("td"),e("td",[t._v("Deslocamentos")]),e("td",{staticClass:"text-center"},[e("textarea",{ref:"deslocamentos",staticClass:"form-control",attrs:{rows:"5"},domProps:{value:t.deslocamentos}})])]),e("tr",[e("td"),e("td",[t._v("Outros Dados")]),e("td",{staticClass:"text-center"},[e("textarea",{ref:"outrosDados",staticClass:"form-control",attrs:{rows:"5"},domProps:{value:t.outrosDados}})])]),e("tr",[e("td",[t.situacaoOcorrencia.id<3?e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:t.cancelarOcorrencia}},[t._v("Cancelar")]):t._e()]),e("td",{staticClass:"text-right"},[e("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:t.atualizarOcorrencia}},[e("span",{ref:"btnSalvar"},[t._v("Salvar")]),e("BIconCheck",{ref:"btnOk",staticStyle:{display:"none"}})],1)]),e("td",{staticClass:"text-right"},[t.situacaoOcorrencia.id<3?e("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.encerrarOcorrencia}},[t._v("Encerrar")]):t._e()])])])])])])])},o=[],s=e("1157"),i=e.n(s),n=e("80ac"),c={props:["idOcorrencia"],data:function(){return{id:0,idFuncionario:0,funcionario:"",fatos:"",escola:"",atendente:"",usuarioEncerramento:"",providencias:"",idSituacaoOcorrencia:0,situacaoOcorrencia:{descricao:""},idTipoOcorrencia:0,tipoOcorrencia:{descricao:""},equipeAcionada:"",deslocamentos:"",outrosDados:"",dataHoraAcionamento:"",dataHoraLocalViatura:"",dataHoraEncerramento:"",dataHoraSistemaJSON:"",idUsuarioAcompanhamento:0,idUsuarioEncerramento:0}},mounted:async function(){var t=(await n["a"].acompanharOcorrencia(this.idOcorrencia)).data;this.id=t.id,this.idFuncionario=t.idFuncionario,this.funcionario=t.funcionario.nome,this.atendente=t.usuarioAtendente.nome,this.usuarioEncerramento=t.usuarioEncerramento.nome,this.fatos=t.fatos,this.providencias=t.providencias,this.idSituacaoOcorrencia=t.idSituacaoOcorrencia,this.situacaoOcorrencia=t.situacaoOcorrencia,this.idTipoOcorrencia=t.idTipoOcorrencia,this.tipoOcorrencia=t.tipoOcorrencia,this.equipeAcionada=t.equipeAcionada,this.deslocamentos=t.deslocamentos,this.outrosDados=t.outrosDados,this.dataHoraAcionamento=t.dataHoraSistemaJSON,this.dataHoraLocalViatura=t.dataHoraLocalViatura,this.dataHoraEncerramento=t.dataHoraEncerramento,this.dataHoraSistemaJSON=t.dataHoraSistemaJSON,this.idUsuarioAcompanhamento=t.idUsuarioAcompanhamento,this.idUsuarioEncerramento=t.idUsuarioEncerramento,this.escola=t.funcionario.escola[0].nome;for(var a=1;a<t.funcionario.escola.length;a++)this.escola=this.escola+" / "+t.funcionario.escola[a].nome},methods:{atualizarOcorrencia:function(t){t.preventDefault();var a=this,e={id:a.id,fatos:a.$refs.fatos.value,providencias:a.$refs.providencias.value,equipeAcionada:a.$refs.equipeAcionada.value,deslocamentos:a.$refs.deslocamentos.value,outrosDados:a.$refs.outrosDados.value,dataHoraLocalViatura:a.$refs.dataHoraLocalViatura.value};n["a"].atualizarOcorrencia(a.id,e,(function(t,e){200===e.status||204===e.status?(a.$refs.btnOk.style.display="initial",setTimeout((function(){a.$refs.btnOk.style.display="none"}),4e3)):(e.responseJSON.exceptionMessage?a.$refs.btnSalvar.innerHTML=e.responseJSON.exceptionMessage:a.$refs.btnSalvar.innerHTML="Erro ao atualizar dados da ocorrência",setTimeout((function(){a.$refs.btnSalvar.innerHTML="Alterar"}),4e3))}))},cancelarOcorrencia:async function(){var t=(await n["a"].cancelarOcorrencia(this.idOcorrencia)).status;200==t&&(this.elevarTela(),this.situacaoOcorrencia.descricao="Cancelada")},elevarTela:async function(){i()("html").animate({scrollTop:0},"slow")},encerrarOcorrencia:async function(){var t=(await n["a"].encerrarOcorrencia(this.idOcorrencia)).status;200==t&&(this.elevarTela(),this.situacaoOcorrencia.descricao="Concluída")},recarregarTela:function(){window.open("#/","_self")}}},d=c,l=e("0c7c"),u=Object(l["a"])(d,r,o,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-40df26d7.765a75f3.js.map