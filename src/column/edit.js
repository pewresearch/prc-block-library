/**
 * External dependencies
 */
import classnames from 'classnames';
import numWords from 'num-words';

/**
 * WordPress dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    InnerBlocks,
    BlockControls,
    BlockVerticalAlignmentToolbar,
    InspectorControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { Notice, PanelBody, RangeControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const ColumnEdit = ({
    attributes: { verticalAlignment = false, width, tabletWidth, phoneWidth, templateLock = false },
    setAttributes,
    className,
    clientId,
}) => {
    const [maxWidth, setMaxWidth] = useState(16);
    
    const { updateBlockAttributes } = useDispatch('core/block-editor');

    const {
        hasChildBlocks,
        isEqual,
        rootClientId,
        otherColumnsInRow,
        isStackable,
    } = useSelect(
        select => {
            const {
                getBlocks,
                getBlockOrder,
                getBlockRootClientId,
                getBlockAttributes,
            } = select('core/block-editor');
            const rootBlockClientId = getBlockRootClientId(clientId);

            // Get equal attribute from row.
            const rootAttributes = getBlockAttributes(rootBlockClientId);
            const { equal, stackable } = rootAttributes;

            return {
                hasChildBlocks: 0 < getBlockOrder(clientId).length,
                rootClientId: rootBlockClientId,
                isEqual: equal,
                isStackable: stackable,
                otherColumnsInRow: getBlocks(rootBlockClientId),
            };
        },
        [clientId],
    );

    const updateMaxWidth = () => {
        // Get available width.
        let allColumnWidths = [];
        otherColumnsInRow.forEach(column => {
            let columnWidth = column.attributes.width;
            if (clientId === column.clientId) {
                columnWidth = width;
            }
            allColumnWidths.push(columnWidth);
        });
        allColumnWidths = allColumnWidths.reduce((a, b) => a + b, 0);

        const availableWidth = 16 - allColumnWidths;
        setMaxWidth(availableWidth);
    };

    const updateAlignment = value => {
        console.log('updateAlignment', value);
        // Update own alignment.
        setAttributes({ verticalAlignment: value });
        // Reset parent Columns block.
        updateBlockAttributes(rootClientId, {
            verticalAlignment: null,
        });
    };

    const verticalAlignmentClassName = () => {
        if (false === verticalAlignment) {
            return null;
        }
        let vA = verticalAlignment;
        if ('center' === verticalAlignment) {
            vA = 'middle';
        }
        return `${vA} aligned`;
    };

    const getWidthClassName = () => {
        // If parent block (columns) is set to equal then return null;
        if (true === isEqual) {
            return null;
        }
        return `${numWords(width)} wide`;
    };

    const WidthControl = ({label, icon = null, w, setWidth}) => {
        const tooltipContent = value => `${value}/16`;
        return(
            <Fragment>
                {1 >= maxWidth && (
                    <Notice
                        status={
                            -1 === Math.sign(maxWidth)
                                ? 'warning'
                                : 'info'
                        }
                        isDismissible={false}
                    >
                        {-1 === Math.sign(maxWidth)
                            ? `Exceeding Grid Width!!`
                            : `Attention: Approaching Grid Maximum`}
                    </Notice>
                )}
                <RangeControl
                    beforeIcon={icon}
                    label={label}
                    value={w}
                    onChange={value => {
                        const nextWidth =
                            0 > parseFloat(value) ? '0' : value;
                        setWidth(nextWidth);
                    }}
                    min={1}
                    max={16}
                    withInputField
                    disabled={isEqual}
                    renderTooltipContent={ tooltipContent }
                />
            </Fragment>
        );
    }

    useEffect(() => {
        updateMaxWidth();
    }, [width]);

    useEffect(() => {
        if (isEqual) {
            setAttributes({ width: null });
        }
    }, [isEqual]);

    const blockProps = useBlockProps({
        className: classnames(
            className,
            getWidthClassName(),
            'column',
            verticalAlignmentClassName(),
        ),
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
                    <Fragment>
                        {isEqual && (
                            <Notice status="info" isDismissible={false}>
                                Columns in this row are set to be equal. Setting
                                column widths has been disabled.
                            </Notice>
                        )}
                        <WidthControl label={__('Desktop Width')} icon={'desktop'} w={width} setWidth={(v) => setAttributes({width: v})}/>
                        <WidthControl label={__('Tablet Width')} icon={'tablet'} w={tabletWidth} setWidth={(v) => setAttributes({tabletWidth: v})}/>
                        <WidthControl label={__('Phone Width')} icon={'smartphone'} w={phoneWidth} setWidth={(v) => setAttributes({phoneWidth: v})}/>
                    </Fragment>
                </PanelBody>
            </InspectorControls>

            <div {...innerBlocksProps} />
        </Fragment>
    );
};

export default ColumnEdit;
