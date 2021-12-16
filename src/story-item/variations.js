/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'story-item-default',
        isDefault: true,
        title: __('Story Item'),
        description: __('Default story item layout: top aligned A1 image.'),
        attributes: {
            imageSlot: 'top',
            imageSize: 'A1',
        },
    },
    {
        name: 'story-item-pub-listing',
        title: __('Pub Listing Story Item'),
        description: __('Left algined A3 image (right aligned A3 on mobile).'),
        attributes: {
            imageSlot: 'left',
            imageSize: 'A3',
        },
    },
    {
        name: 'story-item-slim',
        title: __('Story Item Slim'),
        description: __('No description, no image.'),
        attributes: {
            imageSlot: 'disabled',
            enableDescription: false,
        },
    },
];

export default variations;