import domReady from '@wordpress/dom-ready';

domReady(() => {
	const blocks = document.querySelectorAll('.prc-group-block--sticky');
	// If there are any sticky blocks init them.
	if (blocks.length) {
		jQuery('.prc-group-block--sticky.ui.sticky').sticky();
	}
});
