module.exports = {
	publicPath: '',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:8079/protege_crianca/api',
				changeOrigin: true,
				pathRewrite: { '^/api': '' },
				logLevel: 'error'
			}
		}
	}
};