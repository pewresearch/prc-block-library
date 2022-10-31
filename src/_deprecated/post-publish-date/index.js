/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
	title: __('DEPRECATED: PRC Post Publish Date'),
	description: __(`DEPRECATED: Use core/date block instead.`),
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
