const storyItemsImageLoaded = () => {
    console.log("loaded");
    const images = document.querySelectorAll('.wp-block-prc-block-story-item .image > img');
    images.forEach(img => {
        img.classList.add('loaded');
    });
};

window.addEventListener('load', (event) => {
    storyItemsImageLoaded();
});