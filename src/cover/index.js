/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    registerBlockStyle,
    registerBlockVariation
} from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';

registerBlockStyle('core/cover', [
    {
        "name": "essay",
        "label": "Essay Header",
    },
]);

registerBlockVariation('core/cover', {
    name: 'essay-header',
    title: __('Essay Header'),
    description: __('A standard essay style header.'),
    attributes: {
        className: 'is-style-essay',
    },
    innerBlocks: [
        ['core/heading'],
    ],
});
