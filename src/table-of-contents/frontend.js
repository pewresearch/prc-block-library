/**
 * External Dependencies
 */
import enquire from 'enquire.js';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

import './style.scss';

if ( !window.hasOwnProperty('prcBlocks') ) {
	window.prcBlocks = {};
}
window.prcBlocks.tableOfContents = {
	breakpoints: [],
	elms: {},
};

const watchPostContentForChange = () => {
	// We will need to watch the post content for changes. and create intersection observers for each chapter block.
	// When we hit the chapter we should get the id and mark it as active...
}

const initMobileIconTOC = () => {

}

const toggleTitle = (groupElm, matched = false) => {
	if ( ! groupElm ) {
		return;
	}
	const titleElm = groupElm.querySelector('h3');
	if ( ! titleElm ) {
		return;
	}
	titleElm.classList.toggle('has-white-color');
	titleElm.classList.toggle('has-text-color');
	titleElm.classList.toggle('has-slate-background-color');
	titleElm.classList.toggle('has-background');
}

const toggleGroupBlock = (groupElm, matched = false) => {
	if ( ! groupElm ) {
		return;
	}
	groupElm.classList.toggle('is-style-card-alt');
	groupElm.classList.toggle('mobile-toc');
	groupElm.classList.toggle('ui');
	groupElm.classList.toggle('sticky');
}

const onMatch = (elm) => {
	setTimeout(()=>{
		const groupElm = elm.parentElement;
		toggleGroupBlock(groupElm, true);
		toggleTitle(groupElm, true);
		jQuery(groupElm).sticky();
	}, 100);
}

const onReturn = (elm) => {
	setTimeout(()=>{
		const groupElm = elm.parentElement;
		toggleGroupBlock(groupElm, false);
		toggleTitle(groupElm, false);
	}, 100);
}

const clickHandler = elm => {
	console.log("clickHandler", elm);
	const groupElm = elm.parentElement;
	const titleElm = groupElm.querySelector('h3');
	titleElm.addEventListener('click', () => {
		if (groupElm.classList.contains('mobile-toc')) {
			groupElm.classList.toggle('is-open');
			jQuery(groupElm).sticky('refresh');
		}
	});
}

domReady(() => {
	const tableOfContents = document.querySelectorAll('.wp-block-prc-block-table-of-contents');
	// If there are any TOC blocks init them. (There should only be one, per page)
	if (tableOfContents.length) {
		tableOfContents.forEach(block => {
			clickHandler(block);
			const threshold = block.getAttribute('data-mobile-threshold');
			enquire.register(`screen and (max-width: ${threshold}px)`, {
				match : () => {
					onMatch(block);
				},
				unmatch : () => {
					onReturn(block);
				}
			});
		});
	}
});
