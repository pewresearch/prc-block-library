/**
 * External Dependencies
 */
import hljs from 'highlight.js';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { CopyText } from './copy';

domReady(() => {
	const codeBlocks = document.querySelectorAll(
		'.wp-block-prc-block-code-syntax'
	);
	codeBlocks.forEach((codeBlock) => {
		const code = codeBlock.querySelector('code');
		const { language } = codeBlock.dataset;

		if (language && language.length > 0) {
			code.classList.add(`language-${language}`);
		}

		hljs.highlightElement(code);

		const ui = codeBlock.querySelector(
			'.wp-block-prc-block-code-syntax__ui'
		);
		if (ui) {
			createRoot(ui).render(<CopyText value={code.textContent} />);
		}
	});
});
