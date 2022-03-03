/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './style.scss';

const scollSnapInit = () => {
	const ob = new IntersectionObserver((payload) => {
		console.log(payload);
		const isIntersecting = payload[0].isIntersecting;
		const firstCover = document.getElementById('essay-cover');
		if ( isIntersecting ) {
			firstCover.classList.add('active');
		} else {
			firstCover.classList.remove('active');
		}
	});

	const firstCover = document.getElementById('essay-cover');
	ob.observe(firstCover.lastElementChild.lastElementChild);
}

const insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
};

const essayCoverMobileToggle = () => {
    const covers = document.querySelectorAll('.wp-block-cover.is-style-essay');
    const vw = document.documentElement.clientWidth;
    covers.forEach(cover => {
        const content = cover.querySelector('.wp-block-cover__inner-container');
        // If tablet+ and the inner container is not present then move it back
        if (
            741 <= vw &&
            !cover.querySelector('.wp-block-cover__inner-container')
        ) {
            cover.nextElementSibling.classList.remove(
                'is-style-mobile-essay-header',
            );
            cover.appendChild(cover.nextElementSibling);
        }
        if (740 >= vw && null !== content) {
            content.classList.toggle('is-style-mobile-essay-header');
            insertAfter(content, cover);
        }
    });
};

// window.addEventListener('resize', essayCoverMobileToggle);

domReady(() => {
	scollSnapInit();
    // essayCoverMobileToggle();
});
