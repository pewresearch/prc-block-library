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
import variations from './variations';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Row'),
    description: __(
        'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.',
    ),
    icon: (
        <svg width="24" height="24" fill="none" view-box="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path d="m3.75 18v-12c0-.69036.55964-1.25 1.25-1.25h14c.6904 0 1.25.55964 1.25 1.25v12c0 .6904-.5596 1.25-1.25 1.25h-14c-.69036 0-1.25-.5596-1.25-1.25z" stroke="currentColor" stroke-width="1.5" fill="none"></path><path d="m3 15h6v18h-6z" fill="currentColor" transform="matrix(0 -1 1 0 -12 18)"></path></svg>
    ),
    variations,
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
