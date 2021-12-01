/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'story-item-default',
        isDefault: true,
        title: __('Story Item'),
        description: __('The default story item'),
        attributes: {
            imageSlot: 'default',
            imageSize: 'A1',
        },
    },
    {
        name: 'story-item-pub-listing',
        title: __('Pub Listing Story Item'),
        attributes: {
            className: 'is-style-left',
            imageSlot: 'left',
            imageSize: 'A3',
        },
    },
];

export default variations;