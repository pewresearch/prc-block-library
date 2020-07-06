import { render } from '@wordpress/element';

import domReady from '@wordpress/dom-ready';
import FollowUs from './component';

domReady(() => {
    if (document.querySelector('.js-react-follow-us')) {
        const elms = document.querySelectorAll('.js-react-follow-us');
        elms.forEach(elm => {
            const socialMediaMarkup = elm.innerHTML;
            const props = {
                newsletters: elm.getAttribute('data-newsletters'),
                setAttributes: false,
            };
            render(<FollowUs {...props}>{socialMediaMarkup}</FollowUs>, elm);
        });
    }
});
