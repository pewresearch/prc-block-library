/**
 * External dependencies
 */
import classnames from 'classnames';
import { Accordion, Icon } from 'semantic-ui-react';

/**
 * WordPress dependencies
 */
import { useState, Fragment } from '@wordpress/element';
import {
    RichText,
    useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/image',
    'core/table',
    'core/list',
    'prc-block/menu-link',
];

const TEMPLATE = [['core/paragraph', {}]];

const edit = ({ attributes, setAttributes }) => {
    const { title, className } = attributes;

    const style = undefined !== className ? className.split(' ') : [];

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            template: TEMPLATE,
        },
    );

    const [isOpen, setOpen] = useState(true);

    return (
        <div {...blockProps}>
            <Accordion styled>
                <Accordion.Title
                    active={true === isOpen}
                    index={0}
                    onClick={() => {
                        // setOpen(!isOpen);
                    }}
                >
                    <Fragment>
                        {!style.includes('is-style-alternate') && (
                            <Icon
                                name={isOpen ? 'caret down' : 'caret right'}
                                onClick={() => {
                                    setOpen(!isOpen);
                                }}
                            />
                        )}
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
                        {style.includes('is-style-alternate') && (
                            <Icon
                                name={isOpen ? 'minus' : 'plus'}
                                style={{ marginLeft: '0.5em' }}
                                onClick={() => {
                                    setOpen(!isOpen);
                                }}
                            />
                        )}
                    </Fragment>
                </Accordion.Title>
                <Accordion.Content active={true === isOpen}>
                    <div {...innerBlocksProps} />
                </Accordion.Content>
            </Accordion>
        </div>
    );
};

export default edit;
