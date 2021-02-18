/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { column as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('PRC Column'),
    description: __('A single column within a row.'),
    icon,
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
