import domReady from '@wordpress/dom-ready';

const makeActive = uuid => {
    const menuItem = document.querySelector(
        `.wp-block-prc-block-topic-index-condensed-menu-item[data-uuid="${uuid}"]`,
    );
    if (menuItem) {
        menuItem.classList.add('active');
    }

    const page = document.querySelector(
        `.wp-block-prc-block-topic-index-condensed-page[data-uuid="${uuid}"]`,
    );
    if (page) {
        page.classList.add('active');
    }
};

const hideActive = () => {
    const currentlyActiveMenuItem = document.querySelector(
        `.wp-block-prc-block-topic-index-condensed-menu-item.active`,
    );
    if (currentlyActiveMenuItem) {
        currentlyActiveMenuItem.classList.remove('active');
    }

    const currentlyActivePage = document.querySelector(
        `.wp-block-prc-block-topic-index-condensed-page.active`,
    );
    if (currentlyActivePage) {
        currentlyActivePage.classList.remove('active');
    }
};

domReady(() => {
    // Key off menu items.
    const menuItems = document.querySelectorAll(
        '.wp-block-prc-block-topic-index-condensed-menu-item',
    );
    menuItems.forEach(i => {
        i.addEventListener('click', elm => {
            const uuid = elm.target.getAttribute('data-uuid');
            hideActive();
            makeActive(uuid);
        });
    });
});
