/**
 * Logo block: on iOS Safari, swap img src by prefers-color-scheme because
 * SVG loaded via <img> does not receive dark mode inside the image document.
 * Only runs on iOS; other platforms use the SVG's internal media query.
 */
(function () {
	'use strict';

	function isIos() {
		return /iPad|iPhone|iPod/.test(navigator.userAgent);
	}

	function applyColorScheme(img) {
		var light = img.getAttribute('data-src-light');
		var dark = img.getAttribute('data-src-dark');
		if (!light || !dark) return;
		var darkMode = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;
		img.src = darkMode ? dark : light;
	}

	function run() {
		if (!isIos()) return;
		var imgs = document.querySelectorAll(
			'.wp-block-prc-block-logo img[data-src-light][data-src-dark]'
		);
		var mq = window.matchMedia('(prefers-color-scheme: dark)');
		imgs.forEach(function (img) {
			applyColorScheme(img);
			mq.addEventListener('change', function () {
				applyColorScheme(img);
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run);
	} else {
		run();
	}
})();
