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
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

import './style.scss';
import edit from './edit';
import save from './save';
import icon from './icon';
import registerForms from './register-forms';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
};

registerForms();

registerBlockType(name, { ...metadata, ...settings });
