/**
 * External Dependencies
 */
import hljs from 'highlight.js';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { CopyText } from './Copy';

domReady(() => {
	const codeBlocks = document.querySelectorAll(
		'.wp-block-prc-block-code-syntax'
	);
	codeBlocks.forEach( ( codeBlock ) => {
        const code = codeBlock.querySelector( 'code' );
        const language = codeBlock.dataset.language;
        
        if ( language  && language.length > 0 ) {
            code.classList.add( `language-${language}` );
        }

        hljs.highlightElement( code );

        render( <CopyText value={code.textContent} />, codeBlock.querySelector( '.wp-block-prc-block-code-syntax__ui' ) );		
	});
});
