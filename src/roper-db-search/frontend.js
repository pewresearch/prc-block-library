import domReady from '@wordpress/dom-ready';
import iFrameResize from 'iframe-resizer/js/iframeResizer';

import './style.scss';

domReady(() => {
	// eslint-disable-next-line no-undef
	console.log('frontend.js loaded');
	const roperIframe = document.querySelector('#frameSec');
	if (roperIframe) {
		// for some reason I'm needing to set the width after page load but before the resizer 🤷
		roperIframe.style.width = '100%';
		iFrameResize({ log: false }, '#frameSec');
	}
});
