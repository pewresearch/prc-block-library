const viewMoreHandler = function() {
    console.log('ViewMoreHandler active');
    const termLists = document.querySelectorAll('.ui.tree.list');
    console.log(termLists);
    if ( undefined === termLists ) {
        return;
    }
    for (let list of termLists) {
        const readMore = list.querySelector('.read-more');
        if ( undefined === readMore ) {
            continue;
        }
        readMore.addEventListener('click', function() {
            console.log('clicking read more');
            const { display } = readMore.nextElementSibling.style;
            if ('none' === display) {
                readMore.nextElementSibling.style.display = 'inherit';
            } else {
                readMore.nextElementSibling.style.display = 'none';
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", function(){
    viewMoreHandler();
});