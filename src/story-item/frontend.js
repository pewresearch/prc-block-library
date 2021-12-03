/**
 * WordPress Dependencies
 */
// import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
 
// const DEFAULTS = {
//     title: '',
//     description: '',
//     extra: '',
//     link: '',
//     label: '',
//     date: '',
//     image: '',
//     imageSlot: 'disabled',
//     imageSize: 'A3',
//     isChartArt: false,
//     headerSize: 2,
//     enableEmphasis: false,
//     enableHeader: true,
//     enableMeta: false,
//     enableAltHeaderWeight: false,
//     enableExcerpt: true,
//     enableExcerptBelow: false,
//     enableExtra: false,
//     enableBreakingNews: false,
//     extraContent: false,
//     className: '',
//     inLoop: false,
// };
 
//  // Get props from html element.
// const getProps = elm => {
//     const props =  {...DEFAULTS, ...elm.dataset };
    
//     const title = elm.querySelector('.title');
//     if ( title ) {
//         props.title = title.textContent;
//     }

//     const description = elm.querySelector('.description');
//     if (description) {
//         props.description = description.innerHTML;
//     }

//     const extra = elm.querySelector('.extra');
//     if (extra) {
//         props.extra = extra.innerHTML;
//     }

//     const extraContent = elm.querySelector('.extra-content');
//     if (extraContent) {
//         props.extraContent = extraContent.outerHTML;
//     }

//     props.enableBreakingNews = 'true' === props.enableBreakingNews ? true : false;
//     props.enableEmphasis = 'true' === props.enableEmphasis ? true : false;
//     props.enableExcerpt = 'true' === props.enableExcerpt ? true : false;
//     props.enableExcerptBelow = 'true' === props.enableExcerptBelow ? true : false;
//     props.enableExtra = 'true' === props.enableExtra ? true : false;
//     props.enableHeader = 'true' === props.enableHeader ? true : false;
//     props.enableMeta = 'true' === props.enableMeta ? true : false;
//     props.inLoop = 'true' === props.inLoop ? true : false;
//     props.isChartArt = 'true' === props.isChartArt ? true : false;

//     return props;
// };

const storyItemsImageLoaded = () => {
    const images = document.querySelectorAll('.wp-block-prc-block-story-item .image > img');
    images.forEach(img => {
        img.classList.add('loaded');
    });
};

domReady(() => {
    storyItemsImageLoaded();
});
