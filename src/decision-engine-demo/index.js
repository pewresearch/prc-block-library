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
import metadata from './block.json';

const { name } = metadata;

registerBlockType(name, {
	...metadata,
	icon: 'yes-alt',
	edit,
	save,
});
