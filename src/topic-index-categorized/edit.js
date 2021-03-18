/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Button, Flex, FlexItem, FlexBlock } from '@wordpress/components';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { Icon } from 'semantic-ui-react';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-tree'];

const edit = ({ attributes, className, setAttributes, clientId }) => {
    const { heading } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            // renderAppender: rootClientId => {
            //     return (
            //         <Button
            //             isSecondary
            //             onClick={() =>
            //                 console.log(
            //                     `insert a block for client id:: ${clientId}`,
            //                 )
            //             }
            //         >
            //             Insert New Tree
            //         </Button>
            //     );
            // },
        },
    );

    return (
        <div {...blockProps}>
            <Flex>
                <FlexItem>
                    <RichText
                        tagName="h2"
                        value={heading}
                        onChange={h => setAttributes({ heading: h })}
                        placeholder="Heading..."
                        formattingControls={['link']}
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
