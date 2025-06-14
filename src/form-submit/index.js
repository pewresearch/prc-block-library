/**
 * WordPress Dependencies
 */
import { button as icon } from '@wordpress/icons';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import './style.scss';
import './editor.scss';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });
