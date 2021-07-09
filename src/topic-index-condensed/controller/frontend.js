import domReady from '@wordpress/dom-ready';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';

const makeActive = uuid => {
    const menu = document.querySelector(
        '.wp-block-prc-block-topic-index-condensed-controller .wp-block-prc-block-topic-index-condensed-menu',
    );
    if ('true' === menu.getAttribute('data-borderHidden')) {
        menu.setAttribute('data-borderHidden', 'false');
    }
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
        // Update the url with new ?menuItem arg.
        const newUrlArgs = { menuItem: menuItem.dataset.slug };
        let newUrl = addQueryArgs(window.location.href, newUrlArgs);
        newUrl = removeQueryArgs(newUrl, 'menuItemId');
        window.history.pushState(newUrlArgs, document.title, newUrl);

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

const checkForQueryVar = () => {
    const { prcTopicIndexCondensed } = window;
    const { active } = prcTopicIndexCondensed;
    if (1 <= active.length) {
        const activeMenuItem = document.querySelector(
            `.wp-block-prc-block-topic-index-condensed-menu-item[data-slug="${active}"]`,
        );
        console.log(activeMenuItem.dataset);
        const { uuid } = activeMenuItem.dataset;
        makeActive(uuid);
    }
};

domReady(() => {
    checkForQueryVar();
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
