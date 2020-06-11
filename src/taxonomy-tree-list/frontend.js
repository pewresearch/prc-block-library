import domReady from '@wordpress/dom-ready';

const viewMoreHandler = function() {
    console.log('ViewMoreHandler active');
    const termLists = document.querySelectorAll('.ui.tree.list');
    if (undefined === termLists) {
        return;
    }
    for (const list of termLists) {
        if (
            list.parentElement.classList.contains(
                'block-editor-block-list__block',
            )
        ) {
            continue;
        }
        const readMore = list.querySelector('.read-more');
        if (undefined === readMore) {
            continue;
        }
        if (null === readMore) {
            continue;
        }
        readMore.addEventListener('click', function() {
            const { display } = readMore.nextElementSibling.style;
            if ('none' === display) {
                readMore.innerHTML = 'View Less';
                jQuery(readMore.nextElementSibling).transition('slide up');
                // readMore.nextElementSibling.style.display = 'inherit';
            } else {
                readMore.innerHTML = 'View More';
                jQuery(readMore.nextElementSibling).transition('slide down');
                // readMore.nextElementSibling.style.display = 'none';
            }
        });
    }
};

domReady(() => {
    setTimeout(viewMoreHandler, 1000);
});
