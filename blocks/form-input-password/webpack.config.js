/**
 * Drop this webpack.config.js file into your projects package.json directory when using @wordpress/scripts to handle dependency extraction.
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
	...defaultConfig,
	devtool: 'source-map',
	plugins: [
		...defaultConfig.plugins.filter(
			(plugin) =>
				'DependencyExtractionWebpackPlugin' !== plugin.constructor.name
		),
		new DependencyExtractionWebpackPlugin({
			injectPolyfill: true,
			// eslint-disable-next-line consistent-return
			requestToExternal(request) {
				if (request.includes('@prc/block-utils')) {
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
				if (request.includes('@prc/controls')) {
					return 'prcControls';
				}
				if (request.includes('@prc/icons')) {
					return 'prcIcons';
				}

				if (request.includes('enquire.js')) {
					return 'enquire';
				}
				if (request.includes('classnames')) {
					return 'classnames';
				}
				if (request.includes('classNames')) {
					return 'classnames';
				}
				if (request.includes('jabber')) {
					return 'jabber';
				}
				if (request.includes('firebase/app')) {
					return 'firebase';
				}

				if (request.includes('firebase/auth')) {
					return 'firebaseAuth';
				}
				if (request.includes('firebase/database')) {
					return 'firebaseDatabase';
				}
				if (request.includes('firebase/firestore')) {
					return 'firebaseFirestore';
				}
				if (
					request.includes('d3') &&
					!request.includes('d3-geo-projection')
				) {
					return 'd3';
				}
				if (request.includes('d3-geo-projection')) {
					return 'd3GeoProjection';
				}
				if (request.includes('sqids')) {
					return 'sqids';
				}
			},
			// eslint-disable-next-line consistent-return
			requestToHandle(request) {
				if ('@prc/block-utils' === request) {
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
				if ('@prc/controls' === request) {
					return 'prc-controls';
				}
				if ('@prc/icons' === request) {
					return 'prc-icons';
				}
				if ('enquire.js' === request) {
					return 'enquire.js';
				}
				if ('classnames' === request) {
					return 'classnames';
				}
				if ('jabber' === request) {
					return 'jabber';
				}
				if ('firebase/app' === request) {
					return 'firebase';
				}
				if ('firebase/auth' === request) {
					return 'firebase';
				}
				if ('firebase/database' === request) {
					return 'firebase';
				}
				if ('firebase/firestore' === request) {
					return 'firebase';
				}
				if ('d3' === request) {
					return 'd3';
				}
				if ('d3-geo-projection' === request) {
					return 'd3-geo-projection';
				}
				if ('sqids' === request) {
					return 'sqids';
				}
			},
		}),
	],
};
