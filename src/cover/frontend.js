/**
 * External Dependencies
 */
import 'waypoints/lib/noframework.waypoints';
import 'waypoints/lib/shortcuts/inview';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './style.scss';

if ( !window.hasOwnProperty('prcBlocks') ) {
	window.prcBlocks = {};
}
window.prcBlocks.coverBlocks = {
	ids: [],
};

/**
 * One line helper functions:
 *
 * 1. Generate a random string.
 * 2. Insert an element before another element.
 * 3. Insert an element after another element.
 */
const generateRandomString = () => Math.random().toString(20).substr(2, 6);
const insertBefore = (el, referenceNode) => referenceNode.parentNode.insertBefore(el, referenceNode);
const insertAfter = (el, referenceNode) => referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
const toggleActive = (coverElm) => coverElm.classList.toggle('active');

const scollSnapInit = () => {
	const selector = '.wp-block-cover.is-style-snap-groups';
	const snapCovers = document.querySelectorAll(selector);
	snapCovers.forEach(cover => {
		const id = generateRandomString();
		cover.setAttribute('data-scroll-snap-id', id);
		window.prcBlocks.coverBlocks.ids.push(id);

		const top = document.createElement('div');
		top.setAttribute('id', id);
		insertBefore(top, cover);

		cover.addEventListener('scroll', () => {
			console.log("Watch scrolling inside cover", cover);
			// last item
			const lastGroup = cover.querySelector('.wp-block-group:last-child');
			const lastGroupTopPosition = lastGroup.offsetTop;

			if ( (scrollTop - (scrollTop - lastGroupTopPosition)) === lastGroupTopPosition && cover.classList.contains('locked') ) {
				// Reached the top of the cover.
				console.warn("GROUP REACHED THE TOP");
				cover.classList.remove('locked');
			}
		});
	});


	window.addEventListener('scroll', function() {
		document.querySelectorAll(selector).forEach(cover => {
			const coverHeight = cover.offsetHeight;

			const coverTopPosition = cover.offsetTop;
			const coverBottomPosition = coverTopPosition + coverHeight;

			const scrollTop = window.pageYOffset - (coverTopPosition - window.pageYOffset);
			const scrollBottom = scrollTop + window.innerHeight;

			// console.log("Cover Viewport Info:", {
			// 	coverTopPosition,
			// 	coverBottomPosition,
			// 	scrollTop,
			// 	scrollBottom,
			// });

			if ( scrollTop === coverTopPosition && ! cover.classList.contains('active') ) {
				// Reached the top of the cover.
				console.warn("REACHED THE TOP");
				cover.classList.add('active');
				cover.classList.add('locked');
			}

			if ( scrollTop === coverBottomPosition && cover.classList.contains('active') ) {
				// Reached the bottom of the cover.
				console.warn("REACHED THE BOTTOM");
				cover.classList.remove('active');
			}

			// if (coverBottom > scrollTop && coverTop < scrollBottom) {
			// 	toggleActive(cover);
			// }
		});
	});
}

domReady(() => {
	scollSnapInit();
});
