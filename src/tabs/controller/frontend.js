/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs, removeQueryArgs, getQueryArg } from '@wordpress/url';

const scrollIntoView = () => {
    const uuid = getQueryArg(window.location.href, 'menuItem');
    if (uuid) {
        const target = document.querySelector(
            `.wp-block-prc-block-tabs-menu-item[data-uuid="${uuid}"]`,
        );
        setTimeout(() => target.scrollIntoView(true), 1000);
    }
};

/**
 * Sets a title/item and content/tab active by UUID.
 * Accepts a boolean for isAccordion if true changes the logic to hide currently active items if clicked on again.
 * @param {string} uuid
 * @param {boolean} isAccordion
 * @returns New window.history state.
 */
const makeActive = (uuid, id, isAccordion) => {
    console.log('makeActive', uuid, id, isAccordion);
    const menuItem = document.querySelector(
        `.wp-block-prc-block-tabs-menu-item[data-uuid="${uuid}"]`,
    );
    if (menuItem) {
        if (isAccordion) {
            console.log('menuItem', menuItem);
            menuItem.classList.toggle('active');
        } else {
            console.log('not accordion');
            menuItem.classList.add('active');
        }
    }

    const pane = document.querySelector(
        `.wp-block-prc-block-tabs-pane[data-uuid="${uuid}"]`,
    );
    if (pane) {
        // Update the url with new ?menuItem arg.
        const newUrlArgs = { menuItem: uuid };
        let newUrl = addQueryArgs(window.location.href, newUrlArgs);

        if (isAccordion) {
            if (true === pane.classList.contains('active')) {
                newUrl = removeQueryArgs(newUrl, 'menuItem');
                pane.classList.remove('active');
            } else {
                pane.classList.add('active');
            }
        } else {
            pane.classList.add('active');
        }

        window.history.pushState(newUrlArgs, document.title, newUrl);
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
            const { classList } = menuItem;
            menuItem.addEventListener('click', () => {
                hideActive(id);
                makeActive(uuid, id, isAccordion);
            });
        });
    });
    scrollIntoView();
});
