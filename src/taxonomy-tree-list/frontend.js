const viewMoreHandler = function() {
    console.log('ViewMoreHandler active');
    const termLists = document.querySelectorAll('.ui.tree.list');
    if ( undefined === termLists ) {
        return;
    }
    for (let list of termLists) {
        if ( list.parentElement.classList.contains('block-editor-block-list__block') ) {
            continue;
        }
        const readMore = list.querySelector('.read-more');
        if ( undefined === readMore ) {
            continue;
        }
        if ( null === readMore ) {
            continue;
        }
        readMore.addEventListener('click', function() {
            const { display } = readMore.nextElementSibling.style;
            if ('none' === display) {
                readMore.innerHTML = "View Less";
                readMore.nextElementSibling.style.display = 'inherit';
            } else {
                readMore.innerHTML = "View More";
                readMore.nextElementSibling.style.display = 'none';
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(viewMoreHandler, 1000);
});