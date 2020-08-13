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
        headerSize: 'normal',
        enableEmphasis: false,
        enableHeader: true,
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
            if ('true' === elm.getAttribute('data-chartart')) {
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
        if ('true' === elm.getAttribute('data-emphasis')) {
            props.enableEmphasis = true;
        }
    }
    if (elm.getAttribute('data-breakingnews')) {
        if ('true' === elm.getAttribute('data-breakingnews')) {
            props.enableBreakingNews = true;
        }
    }
    if (elm.getAttribute('data-inloop')) {
        if ('true' === elm.getAttribute('data-inloop')) {
            props.inLoop = true;
        }
    }
    if (elm.getAttribute('data-excerptbelow')) {
        if ('true' === elm.getAttribute('data-excerptbelow')) {
            props.enableExcerptBelow = true;
        }
    }
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
});
