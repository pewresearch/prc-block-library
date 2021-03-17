/**
 * WordPress dependencies
 */

import domReady from '@wordpress/dom-ready';

const getSiblings = elem => {
    // Setup siblings array and get the first sibling
    const siblings = [];
    console.log('getSiblings', elem);
    let sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
        if (
            1 === sibling.nodeType &&
            sibling !== elem &&
            sibling.classList.contains('hidden')
        ) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    return siblings;
};

domReady(() => {
    const links = document.querySelectorAll('.item.view-more');
    links.forEach(l => {
        const siblings = getSiblings(l);
        l.addEventListener('click', t => {
            console.log('click!', t);
            siblings.forEach(e => e.classList.toggle('hidden'));
            if (!t.target.nextElementSibling.classList.contains('hidden')) {
                t.target.innerText = '- Less';
            } else {
                t.target.innerText = '+ More';
            }
        });
    });
});
