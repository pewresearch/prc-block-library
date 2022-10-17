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
import { HorizontalIcon } from '../icons';
import './style.scss';

const { name } = metadata;

const settings = {
	icon: HorizontalIcon(),
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
