const files = [
    {
        name: 'blocks',
        entry: {
			buttons: './src/buttons/index.js',
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
			image: './src/image/index.js',
            livestream: './src/livestream/index.js',
            'mailchimp-form': './src/mailchimp-form/index.js',
			'mailchimp-opt-down': './src/mailchimp-opt-down/index.js',
            'mailchimp-select': './src/mailchimp-select/index.js',
            menu: './src/menu/index.js',
            'menu-link': './src/menu-link/index.js',
            page: './src/page/index.js',
			paragraph: './src/paragraph/index.js',
            'popular-listing': './src/popular-listing/index.js',
			'popup-controller': './src/popup/controller/index.js',
			'popup-content': './src/popup/content/index.js',
			'popup-modal': './src/popup/modal/index.js',
            'post-bylines': './src/post-bylines/index.js',
			'post-date': './src/post-date/index.js',
			'post-sub-title': './src/post-sub-title/index.js',
            promo: './src/promo/index.js',
            'promo-rotator': './src/promo-rotator/index.js',
			pullquote: './src/pullquote/index.js',
			query: './src/query/index.js',
            'responsive-container-controller':
                './src/responsive-container/controller/index.js',
            'responsive-container-view':
                './src/responsive-container/view/index.js',
            row: './src/row/index.js',
            'social-link': './src/social-link/index.js',
            staff: './src/staff/index.js',
			'staff-listing': './src/staff-listing/index.js',
            'story-item': './src/story-item/index.js',
            table: './src/table/index.js',
			'table-of-contents': './src/table-of-contents/index.js',
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
            'topic-index-categorized': './src/topic-index-categorized/index.js',
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
            'chart-builder-wrapper':
                './src/chart-builder-data-wrapper/frontend.js',
            cover: './src/cover/frontend.js',
            'flip-card-controller': './src/flip-card/controller/frontend.js',
			'group': './src/group/frontend.js',
            livestream: './src/livestream/frontend.js',
            'mailchimp-form': './src/mailchimp-form/frontend.js',
			'mailchimp-opt-down': './src/mailchimp-opt-down/frontend.js',
            'mailchimp-select': './src/mailchimp-select/frontend.js',
            'menu-link': './src/menu-link/frontend.js',
			'popup-controller': './src/popup/controller/frontend.js',
            'social-link': './src/social-link/frontend.js',
            'story-item': './src/story-item/frontend.js',
            'tabs-controller': './src/tabs/controller/frontend.js',
			'table-of-contents': './src/table-of-contents/frontend.js',
            'taxonomy-tree-more': './src/taxonomy-tree-more/frontend.js',
            'topic-index-az-mobile':
                './src/topic-index-az-controller/frontend-mobile.js',
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
        name: 'deprecated',
        entry: {
            chapter: './src/_deprecated/chapter/index.js',
			'post-publish-date': './src/_deprecated/post-publish-date/index.js',
			'post-title': './src/_deprecated/post-title/index.js',
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
];

module.exports = files;
