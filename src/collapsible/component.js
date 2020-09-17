import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { useState, Fragment, RawHTML } from '@wordpress/element';
import { Accordion, Icon } from 'semantic-ui-react';

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/image',
    'core/table',
    'core/list',
    'prc-block/button',
];

const template = [['core/paragraph', {}]];

const AccordionBlock = ({
    title,
    className,
    children,
    setAttributes = false,
    defaultOpen = false,
}) => {
    const [isOpen, setOpen] = useState(defaultOpen);

    let icon = isOpen ? 'caret down' : 'caret right';
    if ('is-style-alternate' === className) {
        icon = isOpen ? 'minus' : 'plus';
    }

    return (
        <Accordion styled>
            <Accordion.Title
                active={true === isOpen}
                index={0}
                onClick={() => {
                    if (false === setAttributes) {
                        setOpen(!isOpen);
                    }
                }}
            >
                <Fragment>
                    {'is-style-alternate' !== className && (
                        <Icon
                            name={icon}
                            onClick={() => {
                                if (false !== setAttributes) {
                                    setOpen(!isOpen);
                                }
                            }}
                        />
                    )}
                    {false !== setAttributes && (
                        <RichText
                            tagName="div" // The tag here is the element output and editable in the admin
                            value={title} // Any existing content, either from the database or an attribute default
                            onChange={t => setAttributes({ title: t })} // Store updated content as a block attribute
                            placeholder="How we did this" // Display this text before any content has been added by the user
                            formattingControls={[]}
                            keepPlaceholderOnFocus
                            style={{
                                display: 'inline-block',
                            }}
                        />
                    )}
                    {false === setAttributes && <span>{title}</span>}
                    {'is-style-alternate' === className && (
                        <Icon
                            name={icon}
                            style={{ marginLeft: '0.5em' }}
                            onClick={() => {
                                if (false !== setAttributes) {
                                    setOpen(!isOpen);
                                }
                            }}
                        />
                    )}
                </Fragment>
            </Accordion.Title>
            <Accordion.Content active={true === isOpen}>
                {false !== setAttributes && (
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={template}
                    />
                )}
                {false === setAttributes && <RawHTML>{children}</RawHTML>}
            </Accordion.Content>
        </Accordion>
    );
};

export default AccordionBlock;
