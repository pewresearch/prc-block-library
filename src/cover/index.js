/**
 * WordPress Dependencies
 */
import { registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';

registerBlockStyle('core/cover', [
	{
		name: 'disable-mobile-collapse',
		label: 'Disable Mobile Collapse',
	},
]);
