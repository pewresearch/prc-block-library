/**
 * External Dependencies
 */
import 'waypoints/lib/noframework.waypoints';
import 'waypoints/lib/shortcuts/inview';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

import './style.scss';

const getInternalChaptersList = (elm) => {
	// check if the first level of the list has list-items with is-top-level class
	// if so, return the first level of the list
	if (elm.querySelector('.wp-block-prc-block-table-of-contents__list .is-top-level')) {
		console.log("THIS ONE");
		return elm.querySelector('.wp-block-prc-block-table-of-contents__list');
	}
	console.log("THAT ONE");
	return elm.querySelector('.wp-block-prc-block-table-of-contents__list .wp-block-prc-block-table-of-contents__list');
}

const watchChapters = (block) => {
	// We will need to watch the post content for changes. and create intersection observers for each chapter block.
	// When we hit the chapter we should get the id and mark it as active...
	const internalChaptersList = getInternalChaptersList(block);
	const postContent = document.querySelector('.wp-block-post-content');
	const chapters = postContent.querySelectorAll('[data-is-chapter]');
	if (chapters.length) {
		chapters.forEach((chapter) => {
			const id = chapter.getAttribute('id');

			new Waypoint.Inview({
				element: chapter,
				enter(direction) {
					console.log("enter", direction, id);
					const currentlyActive = internalChaptersList.querySelector(`.is-active`);
					if (currentlyActive) {
						console.log("currentlyActive", currentlyActive);
						currentlyActive.classList.remove('is-active');
					}
				},
				entered(direction) {
					const target = internalChaptersList.querySelector(`a[href="#${id}"]`);
					console.log("entered", direction, target, id);
					if (target) {
						console.log("target", target);
						target.parentElement.classList.add('is-active');
					}
				},
			});
		});
	}
};

const initSmoothScrollClickHandler = (elm) => {
	const internalChaptersList = getInternalChaptersList(elm);
	const links = internalChaptersList.querySelectorAll('a');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			// If the link is a hash link, we need to smooth scroll to the hash.
			if (0 === href.indexOf('#')) {
				e.preventDefault();
				const target = document.getElementById(href.replace('#', ''));
				if (target) {
					target.scrollIntoView({ behavior: 'smooth' }, true);
					// Add the hash to the end of the URL.
					window.history.pushState(null, null, href);
				}
			}
		});
	});
};

function watchTableOfContentsDropdownThreshold(elm) {
	const autoDropdownEnabled = elm.getAttribute('data-auto-dropdown-enabled');
	const autoDropdownWidth = parseInt(elm.getAttribute('data-auto-dropdown-width'));
	console.log('watchTableOfContentsDropdownThreshold', autoDropdownEnabled, autoDropdownWidth);
	if (autoDropdownEnabled) {
		const handleResize = function() {
			const containerWidth = elm.parentElement.offsetWidth;
			if (containerWidth <= autoDropdownWidth) {
				elm.classList.add('is-switched');
				elm.setAttribute('aria-expanded', false);
			} else {
				elm.classList.remove('is-switched');
				elm.removeAttribute('aria-expanded');
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial check on page load
	}
}

function initDropdownClickHandler(elm) {
	const isDropdown = elm.classList.contains('is-style-dropdown');
	const autoDropdownEnabled = elm.getAttribute('data-auto-dropdown-enabled');
	const dropdownButton = elm.querySelector('.wp-block-prc-block-table-of-contents__dropdown-trigger');
	if ( (isDropdown || autoDropdownEnabled) && dropdownButton ) {
		dropdownButton.addEventListener('click', (e) => {
			e.preventDefault();
			const isExpanded = elm.getAttribute('aria-expanded');
			if (isExpanded === 'true') {
				elm.setAttribute('aria-expanded', false);
			} else {
				elm.setAttribute('aria-expanded', true);
			}
		});
	}
}

domReady(() => {
	const tableOfContents = document.querySelectorAll(
		'.wp-block-prc-block-table-of-contents',
	);
	// If there are any TOC blocks init them. (There should only be one, per page, but we'll loop anyway.)
	if (tableOfContents.length) {
		tableOfContents.forEach((block) => {
			console.log("tableOfContents", block);

			if (block.getAttribute('data-show-current-chapter')) {
				watchChapters(block);
			}

			watchTableOfContentsDropdownThreshold(block)

			initDropdownClickHandler(block);
			// console.log('block', block);
			initSmoothScrollClickHandler(block);
		});
	}
});
