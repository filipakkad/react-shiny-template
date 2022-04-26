const path = require("path");
module.exports = {
	devServer: {
		devMiddleware: {
			writeToDisk: (filePath) => {
				return !filePath.includes("hot-update");
			},
		},
	},
};
