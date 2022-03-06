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
window.prcBlocks.groupBlocks = {
	breakpoints: [],
	elms: {},
};

const initStickyBlocks = () => {
	const stickyBlocks = document.querySelectorAll('.prc-group-block--sticky');
	// If there are any sticky blocks init them.
	if (stickyBlocks.length) {
		stickyBlocks.forEach(block => {
			block.classList.add('sticky');
		});
	}
}

const initResponsiveGroupBlocks = () => {
	// Helper Functions:
	const addResponsiveBlock = (block, attachBlock, threshold) => {
		console.log(window.prcBlocks.groupBlocks.breakpoints, threshold);
		if(!window.prcBlocks.groupBlocks.breakpoints.includes(threshold)) {
			window.prcBlocks.groupBlocks.breakpoints.push(threshold);
		}
		console.log(window.prcBlocks.groupBlocks.elms, threshold);
		if(!window.prcBlocks.groupBlocks.elms.hasOwnProperty(threshold)) {
			window.prcBlocks.groupBlocks.elms[threshold] = [];
		}
		window.prcBlocks.groupBlocks.elms[threshold].push(block);

		// Create return point.
		const returnPoint = document.createElement('div');
		const returnId = block.getAttribute('data-return-id');
		returnPoint.setAttribute('id', returnId);
		console.log('addResponsiveBlock', block, returnPoint);
		block.parentNode.insertBefore(returnPoint, block.nextSibling)
	}

	const matchResponsiveBlock = (viewportWidth) => {
		window.prcBlocks.groupBlocks.elms[viewportWidth].forEach(block => {
			// We should remove the sticky class if it exists.
			const attachId = block.getAttribute('data-attach-id');
			const attachBlock = document.getElementById(attachId);
			if ( attachBlock ){
				attachBlock.append(block);
			}
		});
	}

	const unmatchResponsiveBlock = (viewportWidth) => {
		window.prcBlocks.groupBlocks.elms[viewportWidth].forEach(block => {
			const returnId = block.getAttribute('data-return-id');
			const returnPoint = document.getElementById(returnId);
			// If the sticky class should be here re-add it.
			if ( returnPoint ){
				returnPoint.parentNode.insertBefore(block, returnPoint.nextSibling)
			}
		});
	}

	const watchResponsiveBlocks = () => {
		console.log('watchResponsiveBlocks', window.prcBlocks.groupBlocks);

		window.prcBlocks.groupBlocks.breakpoints.forEach(threshold => {
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
			const threshold = block.getAttribute('data-responsive-threshold');

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
	initResponsiveGroupBlocks();
	initStickyBlocks();
});
