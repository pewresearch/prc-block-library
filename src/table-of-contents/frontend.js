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

if (!window.hasOwnProperty('prcBlocks')) {
	window.prcBlocks = {};
}
window.prcBlocks.tableOfContents = {
	breakpoints: [],
	elms: {},
	useIcons: false,
	chapters: [],
};

const watchChapters = (block) => {
	// We will need to watch the post content for changes. and create intersection observers for each chapter block.
	// When we hit the chapter we should get the id and mark it as active...
	const chapters = document.querySelectorAll('[data-is-chapter]');
	if (chapters.length) {
		chapters.forEach((chapter) => {
			const id = chapter.getAttribute('id');
			window.prcBlocks.tableOfContents.chapters.push(id);
			// Add a div at the start of the next chapter that marks the end of this chapter...
			// eslint-disable-next-line no-new
			new Waypoint.Inview({
				element: chapter,
				enter(direction) {
					const currentlyActive = block.querySelector(`a.item.active`);
					if (currentlyActive) {
						currentlyActive.classList.remove('active');
					}
				},
				entered(direction) {
					const target = block.querySelector(`a.item[href="#${id}"]`);
					if (target) {
						target.classList.add('active');
					}
				},
			});
		});
	}
};

const initSmoothScrollClickHandler = (elm) => {
	const groupElm = elm.parentElement;
	const links = elm.querySelectorAll('a.item');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			// If the link is a hash link, we need to smooth scroll to the hash.
			if (0 === href.indexOf('#')) {
				e.preventDefault();
				const target = document.getElementById(href.replace('#', ''));
				if (target) {
					target.scrollIntoView({ behavior: 'smooth' }, true);
					if (
						groupElm.classList.contains('mobile-toc') &&
						groupElm.classList.contains('is-open')
					) {
						groupElm.classList.remove('is-open');
					}
				}
			}
		});
	});
};

const initMobileClickHandler = (elm) => {
	const groupElm = elm.parentElement;
	const titleElm = groupElm.querySelector('h3');
	titleElm.addEventListener('click', () => {
		if (groupElm.classList.contains('mobile-toc')) {
			groupElm.classList.toggle('is-open');
		}
	});
};

const initThresholdWatcher = (block) => {
	/**
	 * Handles toggling styles off and on for the title.
	 * @param {*} groupElm
	 * @param {*} matched
	 * @returns
	 */
	const toggleTitle = (groupElm, matched = false) => {
		if (!groupElm) {
			return;
		}
		const titleElm = groupElm.querySelector('h3');
		if (!titleElm) {
			return;
		}
		// Store the original classes for titleElm.
		if (!titleElm.getAttribute('original-classes')) {
			// Get only the classes that begin with has- and store them in an array
			const classes = Array.from(titleElm.classList).filter((c) =>
				// eslint-disable-next-line prettier/prettier
				c.startsWith('has-'));
			// Store the classes in the titleElm original-classes attribute.
			titleElm.setAttribute('original-classes', classes.join(' '));
		}
		if (matched) {
			const classesToRemove = titleElm.getAttribute('original-classes');
			// Remove the has- classes from title.
			titleElm.classList.remove(...classesToRemove.split(' '));
		} else {
			const classesToAdd = titleElm.getAttribute('original-classes');
			// Add the original has- classes back to titleElm.
			titleElm.classList.add(...classesToAdd.split(' '));
		}
	};

	const handleIconConversion = (groupElm) => {
		const isMobileToc = groupElm.classList.toggle('mobile-toc-icons');
		if (isMobileToc) {
			const items = groupElm.querySelectorAll('a.item[data-icon-src]');
			items.forEach((item) => {
				const icon = item.getAttribute('data-icon-src');
				// Add the icon to the item
				item.innerHTML = `<span class="hidden-text">${item.innerHTML}</span><span class="icon"><img src="${icon}"/></span>`;
			});
		} else {
			const items = groupElm.querySelectorAll('a.item[data-icon-src]');
			items.forEach((item) => {
				const icon = item.querySelector('span.icon');
				const hiddenText = item.querySelector('span.hidden-text');
				// Remove the icon
				if (icon) {
					item.removeChild(icon);
				}
				item.innerHTML = hiddenText.innerHTML;
			});
		}
	};

	const toggleGroupBlock = (groupElm, matched = false) => {
		if (!groupElm) {
			return;
		}
		groupElm.classList.toggle('is-style-card-alt');
		if (window.prcBlocks.tableOfContents.useIcons) {
			handleIconConversion(groupElm);
		} else {
			groupElm.classList.toggle('mobile-toc');
		}
	};

	const onMatch = (elm) => {
		setTimeout(() => {
			const groupElm = elm.parentElement;
			toggleGroupBlock(groupElm, true);
			toggleTitle(groupElm, true);
		}, 100);
	};

	const onReturn = (elm) => {
		setTimeout(() => {
			const groupElm = elm.parentElement;
			toggleGroupBlock(groupElm, false);
			toggleTitle(groupElm, false);
		}, 100);
	};

	const threshold = block.getAttribute('data-mobile-threshold');
	if (threshold) {
		enquire.register(`screen and (max-width: ${threshold}px)`, {
			match: () => {
				onMatch(block);
			},
			unmatch: () => {
				onReturn(block);
			},
		});
	}
};

domReady(() => {
	const tableOfContents = document.querySelectorAll(
		'.wp-block-prc-block-table-of-contents',
	);
	// If there are any TOC blocks init them. (There should only be one, per page, but we'll loop anyway.)
	if (tableOfContents.length) {
		tableOfContents.forEach((block) => {
			if (block.querySelector('a.item[data-icon-src]')) {
				window.prcBlocks.tableOfContents.useIcons = true;
			}

			if (block.getAttribute('data-show-current-chapter')) {
				watchChapters(block);
			}

			initSmoothScrollClickHandler(block);

			initMobileClickHandler(block);

			initThresholdWatcher(block);
		});
	}
});
