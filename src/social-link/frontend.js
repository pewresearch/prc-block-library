/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal Dependencies
 */
import './style.scss';

const { innerWidth, innerHeight } = window;

const getArgs = elm => {
    let description = elm.getAttribute('data-share-description');
    if (!description) {
        description = document
            .querySelector('meta[property="og:description"]')
            .getAttribute('content');
    }
    let title = elm.getAttribute('share-title');
    if (!title) {
        title = document
            .querySelector('meta[property="og:title"]')
            .getAttribute('content');
    }

    let url = elm.getAttribute('data-share-url');
    if (!url) {
        url = document
            .querySelector('meta[property="og:url"]')
            .getAttribute('content');
    }
    return {
        url,
        description,
        title,
    };
};

const initFacebookLinks = () => {
    const items = document.querySelectorAll('.social-link.facebook');
    items.forEach(elm => {
        const { url, title, description } = getArgs(elm);

        elm.addEventListener('click', e => {
            e.preventDefault();
            const actionUrl = addQueryArgs(
                'https://www.facebook.com/sharer/sharer.php',
                {
                    u: url,
                },
            );
            window.open(
                actionUrl,
                'fbShareWindow',
                `height=450, width=550, top=${innerHeight / 2 -
                    275}, left=${innerWidth / 2 -
                    225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
            );
            e.stopPropagation();
        });
    });
};

const initLinkedInLinks = () => {
    const items = document.querySelectorAll('.social-link.linkedin');
    items.forEach(elm => {
        const { url, title, description } = getArgs(elm);

        elm.addEventListener('click', e => {
            e.preventDefault();
            const actionUrl = addQueryArgs(
                'https://www.linkedin.com/shareArticle',
                {
                    // mini: true,
                    summary: description,
                    url,
                    title,
                    source: 'PewResearch',
                },
            );
            window.open(
                actionUrl,
                'linkedinShareWindow',
                `height=450, width=550, top=${innerHeight / 2 -
                    275}, left=${innerWidth / 2 -
                    225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
            );
            e.stopPropagation();
        });
    });
};

const initTwitterLinks = () => {
    const items = document.querySelectorAll('.social-link.twitter');
    items.forEach(elm => {
        const { url, title, description } = getArgs(elm);

        elm.addEventListener('click', e => {
            e.preventDefault();
            const actionUrl = addQueryArgs('https://twitter.com/intent/tweet', {
                text: description,
                url,
            });
            window.open(
                actionUrl,
                'twtrShareWindow',
                `height=450, width=550, top=${innerHeight / 2 -
                    275}, left=${innerWidth / 2 -
                    225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
            );
            e.stopPropagation();
        });
    });
};

domReady(() => {
    initFacebookLinks();
    initLinkedInLinks();
    initTwitterLinks();
});
