/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { registerBlockStyle } from '@wordpress/blocks';

registerBlockStyle('core/paragraph', [
	{
		name: '',
		label: 'Default',
		isDefault: true,
	},
	{
		name: 'has-big-number',
		label: 'Has Big Number',
	},
]);

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
