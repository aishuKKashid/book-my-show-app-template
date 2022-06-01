const webpack = require('webpack');

const { configure } = require('@medly/webpack-config');


module.exports = configure({
	devServer: {
		port: 8090,
		proxy: {
  "/api/satellite": {
    "target": "https://api-gw.dev-medly.io",
    "changeOrigin": true
  },
  "/api": {
    "target": "http://localhost:9000",
    "secure": false
  }
}
	},



})
