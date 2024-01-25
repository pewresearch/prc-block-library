const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

module.exports = {
	...defaultConfig,
	devtool: 'source-map',
	plugins: [
		...defaultConfig.plugins.filter(
			( plugin ) =>
				'DependencyExtractionWebpackPlugin' !== plugin.constructor.name
		),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: true,
			// eslint-disable-next-line consistent-return
			requestToExternal( request ) {
				if(request.includes('@prc/block-utils')) {
					return 'prcBlockUtils';
				}
				if (request.includes('@prc/hooks')) {
					return 'prcHooks';
				}
				if (request.includes('@prc/functions')) {
					return 'prcFunctions';
				}
				if (request.includes('@prc/components')) {
					return 'prcComponents';
				}
				if(request.includes('@prc/icons')) {
					return 'prcIcons';
				}
				if (request.includes('enquire.js')) {
					return 'enquire';
				}
				if (request.includes('classnames')) {
					return 'classnames';
				}
			},
			// eslint-disable-next-line consistent-return
			requestToHandle( request ) {
				if ( '@prc/block-utils' === request ) {
					return 'prc-block-utils';
				}
				if ('@prc/hooks' === request) {
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
				if ('enquire.js' === request) {
					return 'enquire.js';
				}
				if (request.includes('classnames')) {
					return 'classnames';
				}
			},
		} ),
	],
};
