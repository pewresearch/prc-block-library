/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs, removeQueryArgs, getQueryArg } from '@wordpress/url';

/**
 * Internal Dependencies
 */
import './style.scss';

const onClick = elm => {
    if ( elm.classList.contains('plus') ) {
        elm.classList.remove('plus');
        elm.classList.add('minus');
    } else {
        elm.classList.remove('minus');
        elm.classList.add('plus');
    }
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
    const existingArg = getQueryArg(window.location.href, 'menuItemId');
    if ( existingArg ) {
        document.querySelector(`[data-target="${existingArg}"]`).scrollIntoView();
    }
}

domReady(() => {
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
