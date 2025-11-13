/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { media as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';
import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	edit,
};
registerBlockType(name, { ...metadata, ...settings });
