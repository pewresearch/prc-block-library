/**
 * WordPress Dependencies
 */
 import { __ } from '@wordpress/i18n';
 import {
    registerBlockStyle,
    registerBlockVariation
} from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import './style.scss';

/**
 * Modify default settings on core/heading block. Change the default heading level to 4 and add isChapter attribute to replace prc-block/chapter at a later date.
 * 
 * @param {*} settings 
 * @param {*} name 
 * @returns 
 */
function modifyDefaultSettings( settings, name ) {
    if ( 'core/heading' !== name ) {
        return settings;    
    }
    settings.attributes.level.default = 4;
    settings.attributes.isChapter = {
        type: 'boolean',
        default: false,
    };
	return settings;
}

addFilter(
    'blocks.registerBlockType',
    'prc-block-library/heading',
    modifyDefaultSettings,
);

registerBlockStyle('core/heading', [
    {
        name: 'section-header',
        label: 'Section Header',
    },
    {
        name: 'sub-header',
        label: 'Sub Header',
    },
]);

registerBlockVariation('core/heading', {
    name: 'section-header',
    title: __('Section Header'),
    description: __('A heading styled for "section headings".'),
    attributes: {
        className: 'is-style-section-header',
        level: 3,
    },
});