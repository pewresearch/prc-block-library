/**
 * External dependencies
 */
import classnames from 'classnames';
import numWords from 'num-words';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import {
    InnerBlocks,
    BlockControls,
    BlockVerticalAlignmentToolbar,
    InspectorControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const ColumnEdit = ({
    attributes: { verticalAlignment, width, templateLock = false },
    setAttributes,
    className,
    clientId,
}) => {
    const { hasChildBlocks, rootClientId } = useSelect(
        select => {
            const { getBlockOrder, getBlockRootClientId } = select(
                'core/block-editor',
            );

            return {
                hasChildBlocks: 0 < getBlockOrder(clientId).length,
                rootClientId: getBlockRootClientId(clientId),
            };
        },
        [clientId],
    );

    const { updateBlockAttributes } = useDispatch('core/block-editor');

    const updateAlignment = value => {
        console.log('updateAlignment', value);
        // Update own alignment.
        setAttributes({ verticalAlignment: value });
        // Reset parent Columns block.
        updateBlockAttributes(rootClientId, {
            verticalAlignment: null,
        });
    };

    const blockProps = useBlockProps({
        className: classnames(className, numWords(width), 'wide', 'column'),
    });
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        templateLock,
        renderAppender: hasChildBlocks
            ? undefined
            : InnerBlocks.ButtonBlockAppender,
    });

    return (
        <Fragment>
            <BlockControls>
                <BlockVerticalAlignmentToolbar
                    onChange={updateAlignment}
                    value={verticalAlignment}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Column settings')}>
                    <RangeControl
                        label={__('Width')}
                        value={width}
                        onChange={nextWidth => {
                            const nW =
                                0 > parseFloat(nextWidth) ? '0' : nextWidth;
                            setAttributes({ width: nW });
                        }}
                        min={1}
                        max={16}
                        withInputField
                    />
                </PanelBody>
            </InspectorControls>

            <div {...innerBlocksProps} />
        </Fragment>
    );
};

export default ColumnEdit;
