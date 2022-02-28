/**
 * External Dependencies
 */
import enquire from 'enquire.js';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

if ( !window.hasOwnProperty('prcBlocks') ) {
	window.prcBlocks = {};
}
window.prcBlocks.responsiveBlocks = {
	breakpoints: [],
	elms: {},
};

const initStickyBlocks = () => {
	const stickyBlocks = document.querySelectorAll('.prc-group-block--sticky');
	// If there are any sticky blocks init them.
	if (stickyBlocks.length) {
		stickyBlocks.forEach(block => {
			block.classList.add('ui sticky');
		});
		jQuery('.prc-group-block--sticky.ui.sticky').sticky();
	}
}

const initResponsiveBlocks = () => {
	// Helper Functions:
	const addResponsiveBlock = (block, attachBlock, threshold) => {
		console.log(window.prcBlocks.responsiveBlocks.breakpoints, threshold);
		if(!window.prcBlocks.responsiveBlocks.breakpoints.includes(threshold)) {
			window.prcBlocks.responsiveBlocks.breakpoints.push(threshold);
		}
		console.log(window.prcBlocks.responsiveBlocks.elms, threshold);
		if(!window.prcBlocks.responsiveBlocks.elms.hasOwnProperty(threshold)) {
			window.prcBlocks.responsiveBlocks.elms[threshold] = [];
		}
		window.prcBlocks.responsiveBlocks.elms[threshold].push(block);

		// Create return point.
		const returnPoint = document.createElement('div');
		const returnId = block.getAttribute('data-return-id');
		returnPoint.setAttribute('id', returnId);
		console.log('addResponsiveBlock', block, returnPoint);
		block.parentNode.insertBefore(returnPoint, block.nextSibling)
	}

	const matchResponsiveBlock = (viewportWidth) => {
		window.prcBlocks.responsiveBlocks.elms[viewportWidth].forEach(block => {
			const attachId = block.getAttribute('data-attach-id');
			const attachBlock = document.getElementById(attachId);
			if ( attachBlock ){
				attachBlock.append(block);
			}
		});
	}

	const unmatchResponsiveBlock = (viewportWidth) => {
		window.prcBlocks.responsiveBlocks.elms[viewportWidth].forEach(block => {
			const returnId = block.getAttribute('data-return-id');
			const returnPoint = document.getElementById(returnId);
			if ( returnPoint ){
				returnPoint.parentNode.insertBefore(block, returnPoint.nextSibling)
				// returnPoint.append(block);
			}
		});
	}

	const watchResponsiveBlocks = () => {
		console.log('watchResponsiveBlocks', window.prcBlocks.responsiveBlocks);

		window.prcBlocks.responsiveBlocks.breakpoints.forEach(threshold => {
			// Register the enquire listener.
			enquire.register(`screen and (max-width: ${threshold}px)`, {
				match : () => {
					console.log('match', threshold);
					matchResponsiveBlock(threshold);
				},
				unmatch : () => {
					unmatchResponsiveBlock(threshold);
				},
			});
		});
	}
	// If there are any resposnive blocks init them.
	const responsiveBlocks = document.querySelectorAll('.prc-group-block--responsive');
	if (responsiveBlocks.length) {
		responsiveBlocks.forEach(block => {
			const attachId = block.getAttribute('data-attach-id');
			const threshold = block.getAttribute('data-attach-threshold');

			const attachBlock = document.getElementById(attachId);
			// If we have an attach point then init the responsive block.
			if (attachBlock) {
				addResponsiveBlock(block, attachBlock, threshold);
			}
		});
		// Watch for changes in the viewport.
		watchResponsiveBlocks();
	}
}

domReady(() => {
	initStickyBlocks();
	initResponsiveBlocks();
});
