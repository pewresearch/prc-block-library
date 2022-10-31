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
import variations from './variations';

const { name } = metadata;

// @TODO change this to `prc-block/ui-link`

const settings = {
	title: __('DEPRECATED: Link'),
	icon: linkIcon,
	description: __(
		'DEPRECATED: Use core/navigation or core/butons block instead.',
	),
	variations,
	__experimentalLabel: ({ label }) => label,
	edit,
	save,
};
registerBlockType(name, { ...metadata, ...settings });
