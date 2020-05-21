import { useState, RawHTML, render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import { Accordion, Icon } from 'semantic-ui-react';

const Frontend = ({title, children}) => {
    const [ open, setState ] = useState(true);
    let direction = open ? 'down' : 'right';
    return( 
        <Accordion styled>
            <Accordion.Title
            active={open ===  true}
            index={0}
            onClick={ () => setState( ! open ) }
            >
                <Icon name={'caret ' + direction} />
                <span>{title}</span>
            </Accordion.Title>
            <Accordion.Content active={ open === true }>
                <RawHTML>{children}</RawHTML>
            </Accordion.Content>
        </Accordion>
    );
}

domReady( function() {
    if (document.querySelector('.js-react-collapsible')) {
        const elms = document.querySelectorAll('.js-react-collapsible');
        for (const elm of elms) {
            const markup = elm.innerHTML;
            const title = elm.getAttribute('data-title');
            render(
                <Frontend title={title}>{markup}</Frontend>,
                elm,
            );
        }
    }
} );