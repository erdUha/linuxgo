const path = require("path");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true
});
module.exports = {
	outputDir: path.resolve("backend/dist"),
	devServer: {
		port: 3000,
		allowedHosts: "all",
	},
};
