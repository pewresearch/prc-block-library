import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import StoryItem from './display';

// Get prop from static element.
const getProps = elm => {
    const props = {
        title: '',
        excerpt: '',
        extra: '',
        link: '',
        label: '',
        date: '',
        image: '',
        imageSlot: 'disabled',
        imageSize: 'A3',
        isChartArt: false,
        postID: '',
        headerSize: 2,
        enableEmphasis: false,
        enableHeader: true,
        enableMeta: true,
        enableAltHeaderWeight: false,
        enableExcerpt: true,
        enableExcerptBelow: false,
        enableExtra: false,
        enableBreakingNews: false,
        extraContent: false,
        className: '',
        inLoop: false,
    };
    props.className = elm.getAttribute('data-classname');
    props.title = elm.querySelector('.title').textContent;
    // Get any additional markup to be inserted here.
    if (elm.querySelector('.extra-content')) {
        props.extraContent = elm.querySelector('.extra-content').innerHTML;
    }

    const excerpt = elm.querySelector('.description');
    if (excerpt) {
        props.excerpt = excerpt.innerHTML;
    } else {
        props.enableExcerpt = false;
    }

    props.link = elm.getAttribute('data-link');
    props.label = elm.getAttribute('data-label');
    props.date = elm.getAttribute('data-date');

    // If has image...
    const image = elm.getAttribute('data-image');
    if (image) {
        props.image = image;
        props.imageSlot = elm.getAttribute('data-imageslot');
        props.imageSize = elm.getAttribute('data-imagesize');
        if (elm.getAttribute('data-chartart')) {
            if (
                '1' === elm.getAttribute('data-chartart') ||
                'true' === elm.getAttribute('data-chartart')
            ) {
                props.isChartArt = true;
            }
        }
    }
    if (elm.querySelector('.extra')) {
        props.extra = elm.querySelector('.extra').innerHTML;
        props.enableExtra = true;
    }
    if (elm.getAttribute('data-headersize')) {
        props.headerSize = elm.getAttribute('data-headersize');
    }
    if (elm.getAttribute('data-emphasis')) {
        if (
            '1' === elm.getAttribute('data-emphasis') ||
            'true' === elm.getAttribute('data-emphasis')
        ) {
            props.enableEmphasis = true;
        }
    }
    if (elm.getAttribute('data-meta')) {
        if (
            '1' === elm.getAttribute('data-meta') ||
            'true' === elm.getAttribute('data-meta')
        ) {
            props.enableMeta = true;
        } else if (
            '0' === elm.getAttribute('data-meta') ||
            'false' === elm.getAttribute('data-meta') ||
            '' === elm.getAttribute('data-meta')
        ) {
            props.enableMeta = false;
        }
    } else {
        props.enableMeta = false;
    }
    if (elm.getAttribute('data-breakingnews')) {
        if (
            '1' === elm.getAttribute('data-breakingnews') ||
            'true' === elm.getAttribute('data-breakingnews')
        ) {
            props.enableBreakingNews = true;
        }
    }
    if (elm.getAttribute('data-inloop')) {
        if (
            '1' === elm.getAttribute('data-inloop') ||
            'true' === elm.getAttribute('data-inloop')
        ) {
            props.inLoop = true;
        }
    }
    if (elm.getAttribute('data-excerptbelow')) {
        if (
            '1' === elm.getAttribute('data-excerptbelow') ||
            'true' === elm.getAttribute('data-excerptbelow')
        ) {
            props.enableExcerptBelow = true;
        }
    }
    // console.log("story item props:", props);
    return props;
};

const StoryItemsRender = () => {
    const items = document.querySelectorAll('.react-story-item');
    items.forEach(item => {
        const props = getProps(item);
        render(<StoryItem {...props} />, item);
        item.classList.add('loaded');
    });
};

domReady(() => {
    StoryItemsRender();
    jQuery(document).on('facetwp-loaded', () => {
        StoryItemsRender();
    });
});
