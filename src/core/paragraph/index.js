/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './style.scss';

/**
 * Supports "Big Number" style
 */
const addCounterResetToBody = () => {
	const blockEditorRoot = document.querySelector(
		'.block-editor-block-list__layout.is-root-container',
	);
	if (blockEditorRoot) {
		blockEditorRoot.style.counterReset = 'section';
	}
};

domReady(() => {
	addCounterResetToBody();
});
