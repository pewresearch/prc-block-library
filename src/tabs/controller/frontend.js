import domReady from '@wordpress/dom-ready';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';

const makeActive = uuid => {
    const menuItem = document.querySelector(
        `.wp-block-prc-block-tabs-menu-item[data-uuid="${uuid}"]`,
    );
    if (menuItem) {
        menuItem.classList.add('active');
    }

    const pane = document.querySelector(
        `.wp-block-prc-block-tabs-pane[data-uuid="${uuid}"]`,
    );
    if (pane) {
        // Update the url with new ?menuItem arg.
        const newUrlArgs = { menuItem: uuid };
        const newUrl = addQueryArgs(window.location.href, newUrlArgs);
        console.log('newUrl', newUrl);
        window.history.pushState(newUrlArgs, document.title, newUrl);

        pane.classList.add('active');
    }
};

const hideActive = id => {
    const currentlyActiveMenuItem = document
        .getElementById(id)
        .querySelector(`.wp-block-prc-block-tabs-menu-item.active`);
    if (currentlyActiveMenuItem) {
        currentlyActiveMenuItem.classList.remove('active');
    }

    const currentlyActivePane = document
        .getElementById(id)
        .querySelector(`.wp-block-prc-block-tabs-pane.active`);
    if (currentlyActivePane) {
        currentlyActivePane.classList.remove('active');
    }
};

domReady(() => {
    const tabs = document.querySelectorAll('.wp-block-prc-block-tabs');
    tabs.forEach(t => {
        const id = t.getAttribute('id');
        const isAccordion = t.classList.contains('accordion');

        const menuItems = t.querySelectorAll(
            '.wp-block-prc-block-tabs-menu-item',
        );
        menuItems.forEach(menuItem => {
            const uuid = menuItem.getAttribute('data-uuid');
            menuItem.addEventListener('click', () => {
                hideActive(id);
                makeActive(uuid);
            });
        });
    });
});
