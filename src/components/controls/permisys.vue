<script>
	import VPermisysBlock from './permisysBlock';

	export default {
		render: function (h) {
			if (this.autorizado) {
				return h(this.tag, this.$slots.default);
			} else if(!this.hide) {
				if (this.$slots.blocked) {
					return h(this.tag, this.$slots.blocked);	
				} else {
					return h(VPermisysBlock);	
				}
			} else {
				return h();
			}
		},

		props: {
			tag: { default: 'div' },
			funcao: { default: undefined },
			funcoes: { default: undefined },
			hide: { default: true }
		},

		computed: {
			usuario() {
				return this.$store.state.usuario;
			},

			funcoesUsuario() {
				return (this.usuario && this.usuario.funcoes) || [];
			},

			autorizado() {
				return (!this.funcao || this.funcoesUsuario.indexOf(this.funcao) !== -1)
					&& (!this.funcoes || this.funcoes.every(f => this.funcoesUsuario.indexOf(f) !== -1));
			}
		}
	};
</script>