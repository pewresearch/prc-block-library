const storyItemsImageLoaded = () => {
	const images = document.querySelectorAll(
		'.wp-block-prc-block-story-item .image',
	);
	images.forEach((img) => {
		img.classList.add('loaded');
	});
};

window.addEventListener('load', () => {
	storyItemsImageLoaded();
});
