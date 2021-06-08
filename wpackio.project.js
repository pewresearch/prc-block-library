const {
    getFileLoaderOptions,
    issuerForJsTsFiles,
    issuerForNonJsTsFiles,
    fileLoader,
    // eslint-disable-next-line import/no-extraneous-dependencies
} = require('@wpackio/scripts');
const path = require('path');
const pkg = require('./package.json');

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
            entry: {
                collapsible: './src/collapsible/index.js',
                column: './src/column/index.js',
                'chart-builder': './src/chart-builder/index.js',
                'chart-builder-wrapper':
                    './src/chart-builder-data-wrapper/index.js',
                cover: './src/cover/index.js',
                grid: './src/grid/index.js',
                group: './src/group/index.js',
                heading: './src/heading/index.js',
                'mailchimp-form': './src/mailchimp-form/index.js',
                'mailchimp-select': './src/mailchimp-select/index.js',
                menu: './src/menu/index.js',
                'menu-link': './src/menu-link/index.js',
                page: './src/page/index.js',
                'post-bylines': './src/post-bylines/index.js',
                'post-title': './src/post-title/index.js',
                promo: './src/promo/index.js',
                'promo-rotator': './src/promo-rotator/index.js',
                row: './src/row/index.js',
                'social-link': './src/social-link/index.js',
                staff: './src/staff/index.js',
                'sub-title': './src/sub-title/index.js',
                table: './src/table/index.js',
                'tabs-controller': './src/tabs/controller/index.js',
                'tabs-menu': './src/tabs/menu/index.js',
                'tabs-menu-item': './src/tabs/menu-item/index.js',
                'tabs-pane': './src/tabs/pane/index.js',
                'tabs-panes': './src/tabs/panes/index.js',
                'taxonomy-tree': './src/taxonomy-tree/index.js',
                'taxonomy-tree-more': './src/taxonomy-tree-more/index.js',
                'topic-index-az': './src/topic-index-az/index.js',
                'topic-index-az-controller':
                    './src/topic-index-az-controller/index.js',
                'topic-index-categorized':
                    './src/topic-index-categorized/index.js',
                'topic-index-condensed-controller':
                    './src/topic-index-condensed/controller/index.js',
                'topic-index-condensed-menu':
                    './src/topic-index-condensed/menu/index.js',
                'topic-index-condensed-menu-item':
                    './src/topic-index-condensed/menu-item/index.js',
                'topic-index-condensed-page':
                    './src/topic-index-condensed/page/index.js',
                'topic-index-condensed-pages':
                    './src/topic-index-condensed/pages/index.js',
                'topic-index-search-field':
                    './src/topic-index-search-field/index.js',
                'wp-query': './src/wp-query/index.js',
                // 'wp-object': './src/wp-object/index.js',
            },
            webpackConfig: (config, merge, appDir, isDev) => {
                // create a new module.rules for svg-inline-loader
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
            entry: {
                collapsible: './src/collapsible/frontend.js',
                'chart-builder': './src/chart-builder/frontend.js',
                cover: './src/cover/frontend.js',
                'mailchimp-form': './src/mailchimp-form/frontend.js',
                'mailchimp-select': './src/mailchimp-select/frontend.js',
                'menu-link': './src/menu-link/frontend.js',
                'social-link': './src/social-link/frontend.js',
                'tabs-controller': './src/tabs/controller/frontend.js',
                'taxonomy-tree-more': './src/taxonomy-tree-more/frontend.js',
                'topic-index-categorized':
                    './src/topic-index-categorized/frontend.js',
                'topic-index-condensed':
                    './src/topic-index-condensed/controller/frontend.js',
                'topic-index-search-field':
                    './src/topic-index-search-field/frontend.js',
            },
        },
        {
            name: 'chapter',
            entry: {
                main: './src/chapter/index.js',
            },
        },
        {
            name: 'fact-sheet-collection',
            entry: {
                main: './src/fact-sheet-collection/index.js',
                frontend: './src/fact-sheet-collection/frontend.js',
            },
        },
        {
            name: 'flip-card',
            entry: {
                main: './src/flip-card/index.js',
                frontend: './src/flip-card/frontend.js',
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
            name: 'post-publish-date',
            entry: {
                main: './src/post-publish-date/index.js',
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
                frontend: './src/story-item/frontend.js',
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
        '@wordpress/compose': 'wp.compose',
        '@wordpress/dom-ready': 'wp.domReady',
        '@wordpress/hooks': 'wp.hooks',
        '@wordpress/plugins': 'wp.plugins',
        '@wordpress/edit-post': 'wp.editPost',
        '@wordpress/data': 'wp.data',
        '@wordpress/i18n': 'wp.i18n',
        '@wordpress/api-fetch': 'wp.apiFetch',
        '@wordpress/url': 'wp.url',
        '@wordpress/html-entities': 'wp.htmlEntities',
        '@wordpress/server-side-render': 'wp.serverSideRender',
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
