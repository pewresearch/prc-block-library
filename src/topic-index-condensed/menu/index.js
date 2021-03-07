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
    title: __('Topic Index - Condensed Menu'),
    description: __(
        'A sub block of Topic Index - Condensed View, this block controls the left sidebar menu.',
    ),
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
