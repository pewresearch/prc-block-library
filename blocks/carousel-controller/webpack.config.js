const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
	...defaultConfig,
	devtool: 'source-map',
	plugins: [
		...defaultConfig.plugins.filter(
			(plugin) =>
				'DependencyExtractionWebpackPlugin' !== plugin.constructor.name,
		),
		new DependencyExtractionWebpackPlugin({
			injectPolyfill: true,
			// eslint-disable-next-line consistent-return
			requestToExternal(request) {
				if (request.includes('@prc/functions')) {
					return 'prcFunctions';
				}
			},
			// eslint-disable-next-line consistent-return
			requestToHandle(request) {
				if (request.includes('@prc/functions')) {
					return 'prc-functions';
				}
			},
		}),
	],
};
