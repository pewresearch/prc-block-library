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
    title: __('Pane'),
    description: __('A tab pane, contains tab content.'),
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
