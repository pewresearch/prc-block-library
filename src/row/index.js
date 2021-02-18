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
    title: __('PRC Row'),
    description: __(
        'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.',
    ),
    icon: (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z" />
        </svg>
    ),
    variations,
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
