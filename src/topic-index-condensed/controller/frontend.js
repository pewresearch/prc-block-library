import domReady from '@wordpress/dom-ready';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';

import './style.scss';

const makeActive = (uuid, isAccordion = false) => {
    console.log('makeActive', uuid);
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
        console.log(page);
        // Update the url with new ?menuItem arg.
        const newUrlArgs = { menuItem: menuItem.dataset.slug };
        console.log(newUrlArgs);
        let newUrl = addQueryArgs(window.location.href, newUrlArgs);
        newUrl = removeQueryArgs(newUrl, 'menuItemId');
        console.log(newUrl);
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

domReady(() => {
    const controller = document.querySelector('.wp-block-prc-block-topic-index-condensed-controller');
    if ( controller ) {
        const isAccordion = controller.classList.contains('accordion');
        console.log('isAccordion', isAccordion);
        if ( isAccordion ) {
            jQuery(controller).accordion({
                onOpen: function() {
                    const newUrlArgs = { menuItem: this.dataset.slug };
                    console.log(newUrlArgs);
                    let newUrl = addQueryArgs(window.location.href, newUrlArgs);
                    newUrl = removeQueryArgs(newUrl, 'menuItemId');
                    console.log(newUrl);
                    window.history.pushState(newUrlArgs, document.title, newUrl);
                },
        });
        } else {
            // Key off menu items.
            const menuItems = controller.querySelectorAll(
                '.wp-block-prc-block-topic-index-condensed-menu-item',
            );
            menuItems.forEach(i => {
                i.addEventListener('click', elm => {
                    const uuid = elm.target.getAttribute('data-uuid');
                    hideActive();
                    makeActive(uuid);
                });
            });
        }
    }
});
