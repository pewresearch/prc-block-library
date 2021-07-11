/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs, removeQueryArgs, getQueryArg } from '@wordpress/url';

/**
 * Internal dependencies
 */
import './style.scss';

const onClick = elm => {
    elm.parentElement.classList.toggle('active');
    elm.nextElementSibling.classList.toggle('hidden');

    const newUrlArgs = { menuItemId: elm.dataset.target };
    let newUrl = addQueryArgs(window.location.href, newUrlArgs);
    if (!elm.parentElement.classList.contains('active')) {
        // Update the url with new ?menuItemId arg.
        newUrl = removeQueryArgs(window.location.href, 'menuItemId');
    }
    window.history.pushState(newUrlArgs, document.title, newUrl);
};

const bringMenuItemIntoView = () => {
    console.log('bringMenuItemIntoView');
    const existingArg = getQueryArg(window.location.href, 'menuItemId');
    console.log('watchAndMove', existingArg);
    if ( existingArg ) {
        document.querySelector(`[data-target="${existingArg}"]`).scrollIntoView();
    }
}

domReady(() => {
    console.log('menuItem Init');
    setTimeout(()=>{
        bringMenuItemIntoView();
    }, 600);
    const targets = document.querySelectorAll('.expand-sub-list');
    if ( targets ) {
        targets.forEach(l => {
            l.addEventListener('click', t => {
                onClick(t.target);
            });
        });
    }
});
