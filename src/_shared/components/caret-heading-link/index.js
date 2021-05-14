/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { Flex, FlexItem, FlexBlock, ToolbarGroup } from '@wordpress/components';
import { BlockControls, RichText } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { Icon } from 'semantic-ui-react';

/**
 * Internal dependencies
 */
import { LinkToolbarButton } from 'shared';

const CaretHeadingLink = ({
    url,
    heading,
    headingSize = 'h2',
    setAttributes,
}) => {
    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <LinkToolbarButton
                        url={url}
                        onChange={p => {
                            setAttributes({ url: p.url });
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>
            <Flex style={{ paddingBottom: '1em' }}>
                <FlexItem>
                    <RichText
                        tagName={headingSize}
                        value={heading}
                        onChange={h => setAttributes({ heading: h })}
                        placeholder="Heading..."
                        formattingControls={[]}
                        keepPlaceholderOnFocus
                        className="sans-serif"
                    />
                </FlexItem>
                <FlexBlock>
                    <Icon
                        name="chevron right"
                        size="small"
                        style={{ marginLeft: '0.5em' }}
                    />
                </FlexBlock>
            </Flex>
        </Fragment>
    );
};

export default CaretHeadingLink;
