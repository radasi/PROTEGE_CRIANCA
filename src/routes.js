export default [
	{
		path: '/',
		redirect: '/ocorrencias'
	},
	{
		path: '/ocorrencias',
		component: () => import('./views/commons/Home/ocorrencias')
	},
	{
		path: '/funcionarios',
		component: () => import('./views/commons/Home/funcionarios.vue')
	},
	{
		path: '/ocorrencia/:idOcorrencia',
		component: () => import('./views/commons/Home/detalhes.vue'),
		props: route => ({ idOcorrencia: route.params.idOcorrencia })
	},
	{
		path: '/login',
		component: () => import('./views/permisys/login')
	}
];