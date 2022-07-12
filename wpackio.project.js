const path = require('path');
const pkg = require('./package.json');
const files = require('./blocks.json');

const blockEntries = {};
const frontendEntries = {};
const { blocks } = files;

blocks.forEach((block) => {
	const { name, main, frontend } = block;
	if (undefined !== main) {
		blockEntries[name] = main;
	}
	if (frontend) {
		frontendEntries[name] = frontend;
	}
});

module.exports = {
	appName: 'prcBlocksLibrary',
	type: 'plugin',
	slug: 'prc-block-library',
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
	files: [
		{
			name: 'blocks',
			entry: blockEntries,
			optimizeForGutenberg: true,
			webpackConfig: (config, merge, appDir, isDev) => {
				// Add custom rule and merge with existing config to allow for inline svg loading.
				const customRules = {
					module: {
						rules: [
							// Inline svg loader
							// https://webpack.js.org/loaders/svg-inline-loader/#configuration
							{
								test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
								use: ['svg-inline-loader'],
							},
						],
					},
				};
				// merge and return
				return merge(config, customRules);
			},
		},
		{
			name: 'frontend',
			entry: frontendEntries,
			optimizeForGutenberg: true,
		},
		{
			name: 'deprecated',
			entry: {
				chapter: './src/_deprecated/chapter/index.js',
				'post-publish-date': './src/_deprecated/post-publish-date/index.js',
				'post-title': './src/_deprecated/post-title/index.js',
				'social-link': './src/_deprecated/social-link/index.js',
				'social-link-frontend': './src/_deprecated/social-link/frontend.js',
			},
			optimizeForGutenberg: true,
		},
		{
			name: 'fact-sheet-collection',
			entry: {
				main: './src/fact-sheet-collection/index.js',
				frontend: './src/fact-sheet-collection/frontend.js',
			},
		},
	],
	outputPath: 'dist',
	hasReact: true,
	hasSass: true,
	hasLess: false,
	hasFlow: false,
	externals: {
		moment: 'moment',
		'@babel/runtime/regenerator': 'regeneratorRuntime',
	},
	alias: {
		shared: path.resolve(__dirname, 'src/_shared'),
	},
	errorOverlay: true,
	optimizeSplitChunks: true,
	watch: './inc|includes/**/*.php',
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
	packageDirPath: 'package',
};
