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
				/* My externals */
				if (request.includes('@prc/hooks')) {
					return 'prcHooks';
				}
				if (request.includes('@prc/functions')) {
					return 'prcFunctions';
				}
				if (request.includes('@prc/components')) {
					return 'prcComponents';
				}
				if (request.includes('@prc/icons')) {
					return 'prcIcons';
				}
			},
			// eslint-disable-next-line consistent-return
			requestToHandle(request) {
				// Handle imports like `import myModule from 'my-module'`
				if ('@prc/hooks' === request) {
					// `my-module` depends on the script with the 'my-module-script-handle' handle.
					return 'prc-hooks';
				}
				if ('@prc/functions' === request) {
					return 'prc-functions';
				}
				if ('@prc/components' === request) {
					return 'prc-components';
				}
				if ('@prc/icons' === request) {
					return 'prc-icons';
				}
			},
		}),
	],
};
