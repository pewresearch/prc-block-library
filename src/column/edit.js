/**
 * External Dependencies
 */
import classnames from 'classnames';
import numWords from 'num-words';
import ordinal from 'ordinal';

/**
 * WordPress Dependencies
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

const WidthControl = ({label, icon = null, width, setWidth, min = 1, disabled}) => {
    const tooltipContent = value => `${value}/16`;
    return(
        <RangeControl
            beforeIcon={icon}
            label={label}
            value={width}
            onChange={value => {
                const nextWidth =
                    0 > parseFloat(value) ? '0' : value;
                setWidth(nextWidth);
            }}
            min={min}
            max={16}
            withInputField
            disabled={disabled}
            renderTooltipContent={ tooltipContent }
            type="stepper"
        />
    );
}

const OrderControl = ({label = `Current Position`, icon = null, disabled, position, max = 4, setOrder}) => {
    const tooltipContent = value => `Column Will Appear: ${ordinal(++value)}`;
    return(
        <RangeControl
            beforeIcon={icon}
            label={label}
            value={position}
            onChange={value => {
                const nextOrder =
                    0 > parseFloat(value) ? '0' : value;
                setOrder(nextOrder);
            }}
            min={0}
            max={max}
            disabled={disabled}
            renderTooltipContent={ tooltipContent }
            type="stepper"
        />
    );
}

const edit = ({
    attributes: { verticalAlignment = false, width, tabletOrder, tabletWidth, mobileOrder, mobileWidth, templateLock = false },
    setAttributes,
    className,
    clientId,
    context,
}) => {
    const [maxWidth, setMaxWidth] = useState(16);
    
    const { updateBlockAttributes } = useDispatch('core/block-editor');

    const isStackable = context['prc-block/row-active'];

    const {
        isEqual,
        index,
        hasChildBlocks,
        otherColumnsInRow,
        rootClientId,
    } = useSelect(
        select => {
            const {
                getBlocks,
                getBlockIndex,
                getBlockOrder,
                getBlockRootClientId,
                getBlockAttributes,
            } = select('core/block-editor');
            const rootBlockClientId = getBlockRootClientId(clientId);

            // Get equal attribute from row.
            const rootAttributes = getBlockAttributes(rootBlockClientId);
            const { equal } = rootAttributes;

            return {
                index: getBlockIndex(clientId, rootBlockClientId),
                isEqual: equal,
                hasChildBlocks: 0 < getBlockOrder(clientId).length,
                otherColumnsInRow: getBlocks(rootBlockClientId),
                rootClientId: rootBlockClientId,
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
                        <div style={{marginBottom: '1em', paddingBottom: '1em', borderBottom: '1px solid lightgray'}}>
                            <WidthControl 
                                label={__('Desktop Width')}
                                icon={'desktop'}
                                disabled={isEqual}
                                width={width}
                                setWidth={(v) => setAttributes({width: v})}
                            />
                        </div>
                        <div style={{marginBottom: '1em', paddingBottom: '1em', borderBottom: '1px solid lightgray'}}>
                            <WidthControl 
                                label={__('Tablet Width')}
                                icon={'tablet'}
                                min={0}
                                disabled={isEqual || isStackable}
                                width={100 === tabletWidth ? width : tabletWidth}
                                setWidth={(v) => setAttributes({tabletWidth: v})}
                            />
                            <OrderControl 
                                label={__('Tablet Order')}
                                icon={'tablet'}
                                disabled={isEqual || isStackable}
                                position={100 === tabletOrder ? index : tabletOrder}
                                setOrder={(v) => setAttributes({tabletOrder: v})}
                            />
                        </div>
                        <div>
                            <WidthControl 
                                label={__('Mobile Width')}
                                icon={'smartphone'}
                                min={0}
                                disabled={isEqual || isStackable}
                                width={100 === mobileWidth ? width : mobileWidth}
                                setWidth={(v) => setAttributes({mobileWidth: v})}
                            />
                            <OrderControl 
                                label={__('Mobile Order')}
                                icon={'smartphone'}
                                disabled={isEqual || isStackable}
                                position={100 === mobileOrder ? index : mobileOrder}
                                setOrder={(v) => setAttributes({mobileOrder: v})}
                            />
                        </div>
                    </Fragment>
                </PanelBody>
            </InspectorControls>

            <div {...innerBlocksProps} />
        </Fragment>
    );
};

export default edit;
