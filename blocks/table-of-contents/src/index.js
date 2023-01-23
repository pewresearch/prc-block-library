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

/**
 * Register `core/group` block variations that include a fully stylized and realized Table of Contents template block.
 */
registerBlockVariation('core/group', {
	name: 'toc',
	title: __('Table of Contents Widget'),
	description: __(
		'A Group block in the "alt-card" format with a table of contents list set to show the current chapter.',
	),
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
				content: 'Table of Contents',
				backgroundColor: 'slate',
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
});

registerBlockVariation('core/group', {
	name: 'toc-sticky',
	title: __('Table of Contents Sticky Sidebar'),
	description: __(
		'A Group block in the "alt-card" format with a table of contents list that is sticky, watches for the current chapter, and collapses at 480px.',
	),
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
				backgroundColor: 'slate',
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
});

/**
 * Unregister the core/table-of-contents block, since we are replacing it with our own.
 */
unregisterBlockType('core/table-of-contents');
