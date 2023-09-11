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
// import deprecated from './deprecated';

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
	// deprecated,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });

/**
 * Unregister the core/table-of-contents block, since we are replacing it with our own.
 */
domReady(()=>{
	unregisterBlockType('core/table-of-contents');
	unregisterBlockType('yoast-seo/table-of-contents');
});
