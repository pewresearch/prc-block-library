/**
 * External Dependencies
 */
import enquire from 'enquire.js';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './style.scss';

const insertBefore = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode);
};

const insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
};

const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)

const scollSnapInit = () => {
	const snapCovers = document.querySelectorAll('.wp-block-cover.is-style-snap-groups');
	snapCovers.forEach(cover => {

		const id = generateRandomString();

		cover.setAttribute('data-top-watcher-id', id);
		// cover.classList.add('locked'); // init with locked

		const returnPoint = document.createElement('div');
		returnPoint.setAttribute('id', id);
		insertBefore(returnPoint, cover);

		const items = cover.querySelectorAll('.wp-block-group');
		const lastItem = items[items.length - 1];

		const topWatcher = new IntersectionObserver((payload) => {
			const p = payload[0];
			const isIntersecting = p.isIntersecting;
			console.log('topWatcher', isIntersecting, p);

			if ( ! isIntersecting ) {
				p.target.nextSibling.classList.add('active');
			} else {
				p.target.nextSibling.classList.remove('active');
			}
		});

		const scrollingBackSnapToTop = (top) => {
			// window.scroll({
			// 	top: top,
			// 	behavior: "smooth"
			// });
		}

		const middleWatcher = new IntersectionObserver((payload) => {
			const p = payload[0];
			const isIntersecting = p.isIntersecting;
			console.log('middleWatcher', isIntersecting, p);
			if ( isIntersecting ) {
				console.log("I would add locked now");
				p.target.classList.add('locked');
				scrollingBackSnapToTop(p.boundingClientRect.top);
			} else {
				console.log("I would remove locked now");
				p.target.classList.remove('locked');
			}
		}, {
			root: null,
			threshold: [0.70]
		});

		const bottomWatcher = new IntersectionObserver((payload) => {
			const p = payload[0];
			const isIntersecting = p.isIntersecting;
			console.log('bottomWatcher', isIntersecting, p);
			if ( isIntersecting) {
				p.target.parentElement.parentElement.classList.remove('locked');
			}
		}, {
			root: cover, // Declaring null uses the entire viewport.
			threshold: 0.5, //  The percentage of the bottomPost to come into view.
			// rootMargin: `-${navHeight}px`, // The offset based on the nav bar's height.
		});

		topWatcher.observe(returnPoint);
		middleWatcher.observe(cover);
		bottomWatcher.observe(lastItem);
	});
}

domReady(() => {
	scollSnapInit();
});
