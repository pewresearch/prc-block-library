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
const path = require('path');
const pkg = require('./package.json');

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
    files: [
        {
            name: 'a-z-taxonomy-list',
            entry: {
                main: './src/a-z-taxonomy-list/index.js',
            },
        },
        {
            name: 'button',
            entry: {
                main: './src/button/index.js',
            },
        },
        {
            name: 'callout',
            entry: {
                main: './src/callout/index.js',
            },
        },
        {
            name: 'card',
            entry: {
                main: './src/card/index.js',
            },
        },
        {
            name: 'chapter',
            entry: {
                main: './src/chapter/index.js',
            },
        },
        {
            name: 'collapsible',
            entry: {
                main: './src/collapsible/index.js',
                frontend: './src/collapsible/frontend.js',
            },
        },
        {
            name: 'collapsible-list',
            entry: {
                helper: './src/_shared/components/collapsible-list/frontend.js',
            },
        },
        {
            name: 'columns',
            entry: {
                main: './src/columns/index.js',
            },
        },
        {
            name: 'column',
            entry: {
                main: './src/column/index.js',
            },
        },
        {
            name: 'follow-us',
            entry: {
                main: './src/follow-us/index.js',
                frontend: './src/follow-us/frontend.js',
            },
        },
        {
            name: 'mailchimp-form',
            entry: {
                main: './src/mailchimp-form/index.js',
                frontend: './src/mailchimp-form/frontend.js',
            },
        },
        {
            name: 'mailchimp-opt-down',
            entry: {
                main: './src/mailchimp-opt-down/index.js',
                frontend: './src/mailchimp-opt-down/frontend.js',
            },
        },
        {
            name: 'posts',
            entry: {
                main: './src/posts/index.js',
                frontend: './src/posts/frontend.js',
            },
            webpackConfig: (config, merge, appDir, isDev) => {
                const customRules = {
                    module: {
                        rules: [
                            // Config for SVGR in javascript files
                            {
                                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                                issuer: issuerForJsTsFiles,
                                use: ['@svgr/webpack', 'url-loader'],
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
                                            true,
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
        {
            name: 'promo',
            entry: {
                main: './src/promo/index.js',
            },
            webpackConfig: (config, merge, appDir, isDev) => {
                const customRules = {
                    module: {
                        rules: [
                            // Config for SVGR in javascript files
                            {
                                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                                issuer: issuerForJsTsFiles,
                                use: ['@svgr/webpack', 'url-loader'],
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
                                            true,
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
        {
            name: 'pullquote',
            entry: {
                main: './src/pullquote/index.js',
            },
        },
        {
            name: 'story-item',
            entry: {
                main: './src/story-item/index.js',
                frontend: './src/_shared/components/story-item/frontend.js',
            },
        },
        {
            name: 'tabs',
            entry: {
                main: './src/tabs/index.js',
                frontend: './src/tabs/frontend.js',
            },
        },
        {
            name: 'taxonomy-tree',
            entry: {
                main: './src/taxonomy-tree/index.js',
            },
        },
        {
            name: 'taxonomy-tree-list',
            entry: {
                main: './src/taxonomy-tree-list/index.js',
                frontend: './src/taxonomy-tree-list/frontend.js',
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
        'react-dom': 'ReactDOM',
        'lodash-es': 'lodash',
        '@babel/runtime/regenerator': 'regeneratorRuntime',
        '@wordpress/blocks': 'wp.blocks',
        '@wordpress/element': 'wp.element',
        '@wordpress/block-editor': 'wp.blockEditor',
        '@wordpress/components': 'wp.components',
        '@wordpress/dom-ready': 'wp.domReady',
        '@wordpress/plugins': 'wp.plugins',
        '@wordpress/edit-post': 'wp.editPost',
        '@wordpress/data': 'wp.data',
        '@wordpress/i18n': 'wp.i18n',
        '@wordpress/api-fetch': 'wp.apiFetch',
        '@wordpress/url': 'wp.url',
        '@wordpress/html-entities': 'wp.htmlEntities',
    },
    // Webpack Aliases
    // <https://webpack.js.org/configuration/resolve/#resolve-alias>
    alias: {
        shared: path.resolve(__dirname, 'src/_shared'),
    },
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
