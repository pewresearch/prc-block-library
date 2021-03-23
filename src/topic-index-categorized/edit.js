/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    Flex,
    FlexItem,
    FlexBlock,
    Toolbar,
    ToolbarGroup,
} from '@wordpress/components';
import {
    BlockControls,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { Icon } from 'semantic-ui-react';

/**
 * Internal dependencies
 */

import { BlockInserterButton, LinkToolbarButton } from 'shared';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-tree'];

const edit = ({ attributes, className, setAttributes, clientId }) => {
    const { heading, url } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: () => (
                <BlockInserterButton
                    label="Add New Tree List"
                    blockName="prc-block/taxonomy-tree"
                    clientId={clientId}
                />
            ),
        },
    );

    return (
        <div {...blockProps}>
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
                        tagName="h2"
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
                        size="large"
                        style={{ marginLeft: '0.5em' }}
                    />
                </FlexBlock>
            </Flex>
            <div {...innerBlocksProps} />
        </div>
    );
};

export default edit;
