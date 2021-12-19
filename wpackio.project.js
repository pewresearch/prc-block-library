const path = require('path');
const blocks = require('./blocks');
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
    files: blocks,
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
