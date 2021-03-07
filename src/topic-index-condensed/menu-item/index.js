/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
// import './style.scss';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Topic Index - Condensed Menu Item'),
    description: __(
        'A sub block of Menu block, a sub block of the Topic Index - Condensed View block.',
    ),
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
