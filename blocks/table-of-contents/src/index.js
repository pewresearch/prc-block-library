/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	registerBlockType,
	registerBlockVariation,
	unregisterBlockType,
} from '@wordpress/blocks';
import domReady	from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';
import Edit from './Edit';
import Icon from './Icon';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	/**
	 * @see ./Icon.jsx
	 */
	icon: Icon,
	/**
	 * @see ./Edit.jsx
	 */
	edit: Edit,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });

const groupVariationsExample = {
	attributes: {
		className: 'is-style-card-alt',
	},
	innerBlocks: [
		{
			name: "core/heading",
			attributes: {
				className: "is-style-sub-header toc-title",
				level: 3,
				fontSize: "small-label",
				content: "Table of Contents",
				backgroundColor: "text-color",
				textColor: "white"
			}
		},
		{
			name: "prc-block/table-of-contents",
			attributes: {}
		}
	],
	viewportWidth: 320
}

/**
 * Register `core/group` block variations that include a fully stylized and realized Table of Contents template block.
 */
registerBlockVariation('core/group', {
	name: 'toc',
	title: __('Table of Contents Widget'),
	description: __(
		'A Group block in the "alt-card" format with a table of contents list set to show the current chapter.',
	),
	category: 'widgets',
	icon: Icon,
	attributes: {
		className: 'is-style-card-alt',
		responsiveThreshold: 640,
	},
	innerBlocks: [
		[
			'core/heading',
			{
				className: 'is-style-sub-header toc-title',
				level: 3,
				fontSize: 'small-label',
				content: 'Table of Contents',
				backgroundColor: 'text-color',
				textColor: 'white',
			},
		],
		[
			'prc-block/table-of-contents',
			{
				showCurrentChapter: true,
			},
		],
	],
	example: groupVariationsExample,
});

groupVariationsExample.attributes.align = 'left';
registerBlockVariation('core/group', {
	name: 'toc-sticky',
	title: __('Table of Contents Sticky Sidebar'),
	description: __(
		'A Group block in the "alt-card" format with a table of contents list that is sticky, watches for the current chapter, and collapses at 480px.',
	),
	category: 'widgets',
	icon: Icon,
	attributes: {
		className: 'is-style-card-alt',
		isSticky: true,
		responsiveThreshold: 480,
		align: 'left',
	},
	innerBlocks: [
		[
			'core/heading',
			{
				className: 'is-style-sub-header toc-title',
				level: 3,
				content: 'Table of Contents',
				fontSize: 'small-label',
				backgroundColor: 'text-color',
				textColor: 'white',
			},
		],
		[
			'prc-block/table-of-contents',
			{
				showCurrentChapter: true,
			},
		],
	],
	example: groupVariationsExample,
});

/**
 * Unregister the core/table-of-contents block, since we are replacing it with our own.
 */
domReady(()=>{
	unregisterBlockType('core/table-of-contents');
	unregisterBlockType('yoast-seo/table-of-contents');
});
