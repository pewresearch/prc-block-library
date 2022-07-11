/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { mapMarker as linkIcon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
	title: __('Social Share Link'),
	icon: linkIcon,
	description: __('Add a text link to a social share group.'),
	__experimentalLabel: ({ label }) => label,
	edit,
	save,
};
registerBlockType(name, { ...metadata, ...settings });
