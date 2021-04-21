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

registerBlockStyle('core/heading', [
    {
        name: 'sub-header',
        label: 'Sub Header',
    },
    {
        name: 'section-header',
        label: 'Section Header',
    }
]);

registerBlockVariation('core/heading', {
    name: 'section-header',
    title: __('Section Header'),
    description: __('A heading styled for section headings'),
    attributes: {
        className: 'is-style-section-header',
        level: 3,
    },
});

// @TODO: Add support for a new attribute, isChapter and add support for a php class implementation of the new Gutenberg Table of Contents functionality. We can replace our custom table of contents functionality which would be great.