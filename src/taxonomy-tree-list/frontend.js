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
    viewMoreHandler();
});