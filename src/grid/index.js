/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
// import './style.scss';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('PRC Grid'),
    description: __(
        'Add a block that displays content in rows divided by multiple columns.',
    ),
    icon: (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false" size="24"><path d="M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11.5H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h5.5v10zm4 0H13v-10h2.5v10zm4-.5c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z"></path></svg>
    ),
    keywords: [__('Columns'), __('Column'), __('Grid')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
