/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('Topic Index A-Z'),
    description:
        'A taxonomy list sorted alphabeticaly. Select terms you want to exclude.',
    category: 'layout',
    icon: 'networking',
    keywords: [__('Topic Index'), __('Taxonomies'), __('A-Z'), __('AZ')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
