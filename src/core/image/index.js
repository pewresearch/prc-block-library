/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { select } from '@wordpress/data';
import { unregisterBlockStyle } from '@wordpress/blocks';

/**
 * Override core/image block styles.
 */
import './style.scss';

/**
 * Remove the "Rounded" style from the core/image block.
 */
domReady(() => {
	if (null === select('core/editor')) {
		return;
	}
	unregisterBlockStyle('core/image', ['rounded']);
});
