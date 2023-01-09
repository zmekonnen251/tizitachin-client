const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
	target: 'https://tizitachin-api.onrender.com',
	changeOrigin: true,
};
module.exports = function (app) {
	app.use('/api', createProxyMiddleware(proxy));
};
