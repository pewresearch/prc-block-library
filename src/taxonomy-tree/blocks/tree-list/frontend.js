const viewMoreHandler = () => {
    for (const list of termLists) {
        const readMore = list.querySelector('.read-more');
        readMore.addEventListener('click', function() {
            const { display } = readMore.nextElementSibling.style;
            if ('none' === display) {
                readMore.nextElementSibling.style.display = 'inherit';
            } else {
                readMore.nextElementSibling.style.display = 'none';
            }
        });
    }
};
