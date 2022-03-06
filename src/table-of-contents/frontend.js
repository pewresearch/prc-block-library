/**
 * External Dependencies
 */
import enquire from 'enquire.js';
import 'waypoints/lib/noframework.waypoints';
import 'waypoints/lib/shortcuts/inview';

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
	chapters: [],
};

const watchChapters = (tocBlock) => {
	// We will need to watch the post content for changes. and create intersection observers for each chapter block.
	// When we hit the chapter we should get the id and mark it as active...
	const chapters = document.querySelectorAll('[data-is-chapter]');
	if (chapters.length) {
		chapters.forEach(chapter => {
			const id = chapter.getAttribute('id');
			window.prcBlocks.tableOfContents.chapters.push(id);
			// Add a div at the start of the next chapter that marks the end of this chapter...
			new Waypoint.Inview({
				element: chapter,
				enter: function(direction) {
					const currentlyActive = tocBlock.querySelector(`a.item.active`);
					if (currentlyActive) {
						currentlyActive.classList.remove('active');
					}
				},
				entered: function(direction) {
				  const target = tocBlock.querySelector(`a.item[href="#${id}"]`);
				  if (target) {
					target.classList.add('active');
				  }
				}
			});
		});
	}
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
}

const onMatch = (elm) => {
	setTimeout(()=>{
		const groupElm = elm.parentElement;
		toggleGroupBlock(groupElm, true);
		toggleTitle(groupElm, true);
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
	const groupElm = elm.parentElement;
	const titleElm = groupElm.querySelector('h3');
	titleElm.addEventListener('click', () => {
		console.log("clickHandler", groupElm);
		if (groupElm.classList.contains('mobile-toc')) {
			groupElm.classList.toggle('is-open');
		}
	});
}

domReady(() => {
	const tableOfContents = document.querySelectorAll('.wp-block-prc-block-table-of-contents');
	// If there are any TOC blocks init them. (There should only be one, per page, but we'll loop anyway.)
	if (tableOfContents.length) {
		tableOfContents.forEach(block => {
			if ( block.getAttribute('data-show-current-chapter') ) {
				watchChapters(block);
			}
			clickHandler(block);
			const threshold = block.getAttribute('data-mobile-threshold');
			if ( threshold ) {
				enquire.register(`screen and (max-width: ${threshold}px)`, {
					match : () => {
						onMatch(block);
					},
					unmatch : () => {
						onReturn(block);
					}
				});
			}
		});
	}
});
