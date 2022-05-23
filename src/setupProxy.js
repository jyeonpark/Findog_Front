const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    ["/users", "/comments", "/animals", "/mypage", "/boards"],
    createProxyMiddleware({
      target: "http://3.39.156.161:8080",
      changeOrigin: true,
    })
  );
};
