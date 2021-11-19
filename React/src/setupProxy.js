const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(
		createProxyMiddleware("/websocket", {
			target: "ws://localhost:3838",
		})
	);
	app.use(
		createProxyMiddleware("/autoreload", {
			target: "ws://localhost:3838",
		})
	);
};
