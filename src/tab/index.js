/**
 * WordPress dependencies
 */
import {
	registerBlockType,
	registerBlockBindingsSource,
} from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';
import registerTabLabelBinding from './tab-label-binding';
import './style.scss';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });

registerTabLabelBinding();
