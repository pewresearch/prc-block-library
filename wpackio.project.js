const pkg = require('./package.json');
const {
	getFileLoaderOptions,
	getBabelPresets,
	getDefaultBabelPresetOptions,
	issuerForJsTsFiles,
	issuerForNonJsTsFiles,
	babelLoader,
	fileLoader,
	// eslint-disable-next-line import/no-extraneous-dependencies
} = require('@wpackio/scripts');

module.exports = {
	// Project Identity
	appName: 'prcBlocksLibrary', // Unique name of your project
	type: 'plugin', // Plugin or theme
	slug: 'prc-block-library', // Plugin or Theme slug, basically the directory name under `wp-content/<themes|plugins>`
	// Used to generate banners on top of compiled stuff
	bannerConfig: {
		name: 'prcBlocksLibrary',
		author: 'Seth Rubenstein',
		license: 'UNLICENSED',
		link: 'UNLICENSED',
		version: pkg.version,
		copyrightText:
			'This software is released under the UNLICENSED License\nhttps://opensource.org/licenses/UNLICENSED',
		credit: true,
	},
	// Files we need to compile, and where to put
	files: [
		// If this has length === 1, then single compiler
		{
			name: 'story-item',
			entry: {
				// mention each non-interdependent files as entry points
		     // The keys of the object will be used to generate filenames
		     // The values can be string or Array of strings (string|string[])
		     // But unlike webpack itself, it can not be anything else
		     // <https://webpack.js.org/concepts/#entry>
		     // You do not need to worry about file-size, because we would do
		     // code splitting automatically. When using ES6 modules, forget
		     // global namespace pollutions 😉
				main: './src/story-item/index.js', // Could be a string
			},
		},
		{
			name: 'card',
			entry: {
				// mention each non-interdependent files as entry points
		     // The keys of the object will be used to generate filenames
		     // The values can be string or Array of strings (string|string[])
		     // But unlike webpack itself, it can not be anything else
		     // <https://webpack.js.org/concepts/#entry>
		     // You do not need to worry about file-size, because we would do
		     // code splitting automatically. When using ES6 modules, forget
		     // global namespace pollutions 😉
				main: './src/card/index.js', // Could be a string
			},
		},
		{
			name: 'pancake-promo',
			entry: {
				// mention each non-interdependent files as entry points
		     // The keys of the object will be used to generate filenames
		     // The values can be string or Array of strings (string|string[])
		     // But unlike webpack itself, it can not be anything else
		     // <https://webpack.js.org/concepts/#entry>
		     // You do not need to worry about file-size, because we would do
		     // code splitting automatically. When using ES6 modules, forget
		     // global namespace pollutions 😉
				main: './src/pancake-promo/index.js', // Could be a string
			},
			// Extra webpack config to be dynamically created
			webpackConfig: (config, merge, appDir, isDev) => {
				const customRules = {
					module: {
						rules: [
							// Config for SVGR in javascript files
							{
								test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
								issuer: issuerForJsTsFiles,
								use: ["@svgr/webpack", "url-loader"],
							},
							// For everything else, we use file-loader only
							{
								test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
								issuer: issuerForNonJsTsFiles,
								use: [
									{
										loader: fileLoader,
										options: getFileLoaderOptions(
											appDir,
											isDev,
											true
										),
									},
								],
							},
						],
					},
				};

				// merge and return
				return merge(config, customRules);
			},
		},
		// If has more length, then multi-compiler
	],
	// Output path relative to the context directory
	// We need relative path here, else, we can not map to publicPath
	outputPath: 'dist',
	// Project specific config
	// Needs react(jsx)?
	hasReact: true,
	// Needs sass?
	hasSass: true,
	// Needs less?
	hasLess: false,
	// Needs flowtype?
	hasFlow: false,
	// Externals
	// <https://webpack.js.org/configuration/externals/>
	// Everything in externals should correspon to somehting accessible via window.xxxx from WordPress core
	externals: {
		jquery: 'jQuery',
		lodash: 'lodash',
		moment: 'moment',
		react: 'React',
		'react-dom': "ReactDOM",
		'lodash-es': "lodash",
		'@babel/runtime/regenerator': "regeneratorRuntime",
		'@wordpress/blocks': "wp.blocks",
		'@wordpress/element': "wp.element",
		'@wordpress/block-editor': "wp.blockEditor",
		'@wordpress/components': "wp.components",
	},
	// Webpack Aliases
	// <https://webpack.js.org/configuration/resolve/#resolve-alias>
	alias: undefined,
	// Show overlay on development
	errorOverlay: true,
	// Auto optimization by webpack
	// Split all common chunks with default config
	// <https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks>
	// Won't hurt because we use PHP to automate loading
	optimizeSplitChunks: true,
	// Usually PHP and other files to watch and reload when changed
	watch: './inc|includes/**/*.php',
	// Files that you want to copy to your ultimate theme/plugin package
	// Supports glob matching from minimatch
	// @link <https://github.com/isaacs/minimatch#usage>
	packageFiles: [
		'inc/**',
		'vendor/**',
		'dist/**',
		'*.php',
		'*.md',
		'readme.txt',
		'languages/**',
		'layouts/**',
		'LICENSE',
		'*.css',
	],
	// Path to package directory, relative to the root
	packageDirPath: 'package',
};
