/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import jQuery from 'jquery';
import domReady from '@wordpress/dom-ready';

const collapsibleListHandler = () => {
    const vW = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
    );
    const isSmall = 767 > vW;

    if (!isSmall) {
        return;
    }
    // If viewport is greater than mobile threshold disable

    const animation = 'fade';
    const lists = document.querySelectorAll('.prc-collapsible-list');
    if (undefined === lists) {
        return;
    }
    for (const list of lists) {
        const content = list.querySelector('.content');
        const title = list.querySelector('.title');
        if (undefined === title || null === title) {
            continue;
        }

        const linkCheck = title.querySelector('a');
        if (null !== linkCheck) {
            const titleLink = linkCheck.getAttribute('href');
            const h2 = title.querySelector('h2');
            // Replace The Title
            h2.innerHTML = linkCheck.innerHTML;

            // Create New Link
            const newLink = document.createElement('a');
            newLink.innerHTML = `View all ${linkCheck.innerHTML} publications`;
            newLink.setAttribute('href', titleLink);
            newLink.classList.add('sans-serif');
            content.prepend(newLink);

            linkCheck.remove();
        }

        title.addEventListener('click', function(e) {
            e.stopPropagation(); // Short-circuit any links
            const { display } = content.style;
            const caret = title.querySelector('.icon.caret');
            const isOpen = 'block' === display;
            const forceOpen = () => {
                content.style = 'block';
            };
            const open = () => {
                // Closed State - Force Open
                jQuery(content).transition(`${animation} down`);
                if (caret.classList.contains('down')) {
                    caret.classList.add('right');
                    caret.classList.remove('down');
                }
            };
            const close = () => {
                // Open State - Force Closed
                jQuery(content).transition(`${animation} up`);
                if (caret.classList.contains('right')) {
                    caret.classList.add('down');
                    caret.classList.remove('right');
                }
            };

            if (!isOpen) {
                open();
            } else {
                close();
            }
        });
    }
};

domReady(() => {
    // Initial load
    // collapsibleListHandler();
});
