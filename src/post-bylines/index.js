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
    title: __('PRC Post Bylines'),
    description: __('Displays the post bylines.'),
    edit,
    save,
};

registerBlockType(name, { ...settings, ...metadata });
