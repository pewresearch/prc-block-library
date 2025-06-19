import domReady from '@wordpress/dom-ready';

domReady(() => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	});

	document
		.querySelectorAll('.prc-animations__fade-in-down')
		.forEach((element) => {
			observer.observe(element);
		});
});
