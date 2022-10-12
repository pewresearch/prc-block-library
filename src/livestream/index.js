/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './styles.scss';

const { name } = metadata;

const settings = {
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
