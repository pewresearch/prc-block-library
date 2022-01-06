/**
 * External Dependencies
 */
import { Accordion, Icon } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import { useState, Fragment, RawHTML, render } from '@wordpress/element';

const CollapsibleBlock = ({ title, style, children, defaultOpen = false }) => {
    const [isOpen, setOpen] = useState(defaultOpen);

    let icon = isOpen ? 'minus circle outline' : 'plus circle outline';
    if ('is-style-caret' === style) {
        icon = isOpen ? 'caret down' : 'caret right';
    }

    return (
        <Accordion styled>
            <Accordion.Title
                active={true === isOpen}
                index={0}
                onClick={() => {
                    setOpen(!isOpen);
                }}
            >
                <Fragment>
                    {'is-style-caret' === style && (
                        <Icon
                            name={icon}
                            onClick={() => {
                                setOpen(!isOpen);
                            }}
                        />
                    )}
                    {__(title)}
                    {'is-style-caret' !== style && (
                        <Icon
                            name={icon}
                            style={{ marginLeft: '0.5em' }}
                            onClick={() => {
                                setOpen(!isOpen);
                            }}
                        />
                    )}
                </Fragment>
            </Accordion.Title>
            <Accordion.Content active={true === isOpen}>
                <RawHTML>{children}</RawHTML>
            </Accordion.Content>
        </Accordion>
    );
};

domReady(() => {
    const collapsibleBlocks = document.querySelectorAll(
        '.js-react-collapsible',
    );
    if (1 <= collapsibleBlocks.length) {
        collapsibleBlocks.forEach(elm => {
            const children = elm.innerHTML;
            const title = elm.getAttribute('data-title');
            const style = elm.getAttribute('data-style');
            render(
                <CollapsibleBlock title={title} style={style}>
                    {children}
                </CollapsibleBlock>,
                elm,
            );
        });
    }
});
