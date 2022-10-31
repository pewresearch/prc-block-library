/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { share as shareIcon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
	title: __('DEPRECATeD: Social Link'),
	icon: shareIcon,
	description: __('DEPRECATED: Use core/social-links block instead.'),
	__experimentalLabel: ({ label }) => label,
	merge(leftAttributes, { label: rightLabel = '' }) {
		return {
			...leftAttributes,
			label: leftAttributes.label + rightLabel,
		};
	},
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
