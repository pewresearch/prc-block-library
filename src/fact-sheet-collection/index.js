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

const { name } = metadata;

const settings = {
    title: __('Fact Sheet Collection'),
    icon: 'format-aside',
    description: __(
        "Set and display a collection of Fact Sheet's. Set a report PDF or alternate language post.",
    ),
    keywords: [__('prc'), __('factsheet'), __('fact sheet'), __('collection')],
    example: {
        attributes: {
            altLangPostId: 61623,
            collectionId: 12812,
            reportPdfUrl: '',
        },
    },
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
