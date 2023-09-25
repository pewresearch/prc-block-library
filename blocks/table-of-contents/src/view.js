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

if (!window.hasOwnProperty('prcBlocks')) {
	window.prcBlocks = {};
}
window.prcBlocks.tableOfContents = {
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
	if ( isDropdown || autoDropdownEnabled ) {
		const dropdownButton = elm.querySelector('.wp-block-prc-block-table-of-contents__dropdown');

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
			// if (block.getAttribute('data-show-current-chapter')) {
			// 	watchChapters(block);
			// }
			watchTableOfContentsDropdownThreshold(block)

			initDropdownClickHandler(block);

			initSmoothScrollClickHandler(block);
		});
	}
});
