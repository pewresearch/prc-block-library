/**
 * External Dependencies
 */
import { addFilter } from '@wordpress/hooks';

import './style.scss';

// Support for Nick Diego's "Block Visibility" plugin.
// This adds a class to the block if it is set to be hidden on a specific screen size,
// we add the screen size to the class name.
addFilter(
	'blockVisibility.contextualIndicatorClasses',
	'prc-platform/block-visibility',
	(classes, activeControls, controls, enabledControls, variables) => {
		// Check if classes string contains "block-visibility__has-screen-size"
		if (!classes.includes('block-visibility__has-screen-size')) {
			return classes;
		}
		// Get the screen size from the controls
		const screenSizes = controls?.screenSize?.hideOnScreenSize;
		// If the block is set to be hidden on a specific screen size,
		// we add the screen size to the class name.
		if (screenSizes?.large === true) {
			classes += ' prc-block-visibility-large';
		}
		if (screenSizes?.medium === true) {
			classes += ' prc-block-visibility-medium';
		}
		if (screenSizes?.small === true) {
			classes += ' prc-block-visibility-small';
		}
		return classes;
	},
	10
);
