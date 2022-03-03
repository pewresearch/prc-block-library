/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';

registerBlockStyle('core/cover', [
    {
        name: 'snap-groups',
        label: 'Snap Groups',
    },
]);
