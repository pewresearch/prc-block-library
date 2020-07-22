import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import AccordionBlock from './component';

domReady(function() {
    if (document.querySelector('.js-react-collapsible')) {
        const elms = document.querySelectorAll('.js-react-collapsible');
        for (const elm of elms) {
            console.log(elm);
            const children = elm.innerHTML;
            const title = elm.getAttribute('data-title');
            const className = elm.getAttribute('data-style');
            render(
                <AccordionBlock
                    title={title}
                    className={className}
                    setAttributes={false}
                >
                    {children}
                </AccordionBlock>,
                elm,
            );
        }
    }
});
