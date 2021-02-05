import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import AccordionBlock from './component';

domReady(() => {
    console.log(
        'Collapsible?',
        document.querySelector('.js-react-collapsible'),
    );
    if (document.querySelector('.js-react-collapsible')) {
        const elms = document.querySelectorAll('.js-react-collapsible');
        elms.forEach(elm => {
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
        });
    }
});
