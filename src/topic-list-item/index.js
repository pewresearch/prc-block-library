/**
 * WordPress dependencies
 */
import * as moment from 'moment';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Topic List Item'),
    description: __(
        'A list item that links to a Topic term',
    ),
    keywords: [__('topic')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
