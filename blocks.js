const files = [
    {
        name: 'blocks',
        entry: {
            collapsible: './src/collapsible/index.js',
            column: './src/column/index.js',
            'chart-builder': './src/chart-builder/index.js',
            'chart-builder-wrapper':
                './src/chart-builder-data-wrapper/index.js',
            cover: './src/cover/index.js',
            'daily-briefing-signup': './src/daily-briefing-signup/index.js',
            'github-gist': './src/github-gist/index.js',
            'flip-card-controller': './src/flip-card/controller/index.js',
            'flip-card-back': './src/flip-card/back/index.js',
            'flip-card-front': './src/flip-card/front/index.js',
            grid: './src/grid/index.js',
            group: './src/group/index.js',
            heading: './src/heading/index.js',
            'mailchimp-form': './src/mailchimp-form/index.js',
            'mailchimp-select': './src/mailchimp-select/index.js',
            menu: './src/menu/index.js',
            'menu-link': './src/menu-link/index.js',
            page: './src/page/index.js',
            'post-bylines': './src/post-bylines/index.js',
            'post-publish-date': './src/post-publish-date/index.js',
            'post-title': './src/post-title/index.js',
            promo: './src/promo/index.js',
            'promo-rotator': './src/promo-rotator/index.js',
            'responsive-container-controller': './src/responsive-container/controller/index.js',
            'responsive-container-view': './src/responsive-container/view/index.js',
            row: './src/row/index.js',
            'social-link': './src/social-link/index.js',
            staff: './src/staff/index.js',
            'story-item': './src/story-item/index.js',
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
        },
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
        entry: {
            collapsible: './src/collapsible/frontend.js',
            'chart-builder': './src/chart-builder/frontend.js',
            cover: './src/cover/frontend.js',
            'mailchimp-form': './src/mailchimp-form/frontend.js',
            'mailchimp-select': './src/mailchimp-select/frontend.js',
            'menu-link': './src/menu-link/frontend.js',
            'social-link': './src/social-link/frontend.js',
            'story-item': './src/story-item/frontend.js',
            'tabs-controller': './src/tabs/controller/frontend.js',
            'taxonomy-tree-more': './src/taxonomy-tree-more/frontend.js',
            'topic-index-az-mobile': './src/topic-index-az-controller/frontend-mobile.js',
            'topic-index-categorized':
                './src/topic-index-categorized/frontend.js',
            'topic-index-condensed':
                './src/topic-index-condensed/controller/frontend.js',
            'topic-index-search-field':
                './src/topic-index-search-field/frontend.js',
        },
        optimizeForGutenberg: true,
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
        name: 'mailchimp-opt-down',
        entry: {
            main: './src/mailchimp-opt-down/index.js',
            frontend: './src/mailchimp-opt-down/frontend.js',
        },
    },
    {
        name: 'pullquote',
        entry: {
            main: './src/pullquote/index.js',
        },
    },
];

module.exports = files;