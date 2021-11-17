module.exports = {
	devServer: {
		writeToDisk: (filePath) => {
			return !filePath.includes("hot-update");
		},
    open: false
	}
};
