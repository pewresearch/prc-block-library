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
    title: __('Topic Index - Condensed Page'),
    description: __(
        'A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu.',
    ),
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
