/**
 * WordPress Dependencies
 */
import { useState, useEffect, render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
// import './styles.scss';

domReady(() => {
    console.log('frontend loaded');
    // if (document.querySelector('.wp-block-prc-block-ai2html')) {
    //     const getWidth = () => {
    //         window.innerWidth;
    //     };
    //     const elms = document.querySelectorAll('.wp-block-prc-block-ai2html');
    //     window.addEventListener(
    //         'resize',
    //         function (event) {
    //             elms.forEach((elm) => {
    //                 const min = elm.getAttribute('data-min');
    //                 const max = elm.getAttribute('data-max');

    //                 if (window.innerWidth < max && window.innerWidth > min) {
    //                     elm.classList.add('active');
    //                     elm.classList.remove('hidden');
    //                 } else {
    //                     elm.classList.remove('active');
    //                     elm.classList.add('hidden');
    //                 }
    //             });
    //         },
    //         true,
    //     );
    // }
});
