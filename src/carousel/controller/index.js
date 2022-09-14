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
import variations from './variations';
import './style.scss';
import { HorizontalIcon } from '../icons';

const { name } = metadata;

const settings = {
	icon: HorizontalIcon(),
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
