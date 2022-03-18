/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import './style.scss';

addFilter('blocks.registerBlockType', 'prc-block/media-text', settings => {
    if ('core/media-text' !== settings.name) {
        return settings;
    }

    if ('undefined' !== typeof settings.supports.align) {
        settings.supports.align = ['left', 'right', 'wide', 'full'];
    }

    return settings;
});
