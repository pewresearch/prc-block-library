import domReady from '@wordpress/dom-ready';

domReady(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{
			// Only trigger when element is in the center 50% of the viewport
			rootMargin: '-25% 0px -25% 0px',
			// Element must be at least 50% visible to trigger
			threshold: 0.5,
		}
	);

	document
		.querySelectorAll('.prc-animations__fade-in-down')
		.forEach((element) => {
			observer.observe(element);
		});
});
