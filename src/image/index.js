/**
 * WordPress Dependencies:
 */
 import domReady from '@wordpress/dom-ready';
 import { select, subscribe, dispatch } from '@wordpress/data';
 import {
	unregisterBlockStyle,
	registerBlockStyle,
 } from '@wordpress/blocks';

// Override core image block styles.
import './style.scss';



domReady(() => {
    if (null === select('core/editor')) {
        return;
    }
	unregisterBlockStyle('core/image', ['rounded']);
});
