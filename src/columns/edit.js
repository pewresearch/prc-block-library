/* eslint-disable react/jsx-pascal-case */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { dropRight, get, times } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    Notice,
} from '@wordpress/components';
import {
    InspectorControls,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    __experimentalBlockVariationPicker,
    useBlockProps,
} from '@wordpress/block-editor';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import {
    createBlock,
    createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
    hasExplicitPercentColumnWidths,
    getMappedColumnWidths,
    getRedistributedColumnWidths,
    toWidthPrecision,
} from './utils';

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['prc-block/column'];

const ColumnsEditContainer = ({
    attributes,
    className,
    updateColumns,
    toggleDivided,
    clientId,
}) => {
    const { divided } = attributes;

    // Return a count of prc-block/column inside...
    const { count } = useSelect(
        select => {
            return {
                count: select('core/block-editor').getBlockCount(clientId),
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames(className, 'ui', 'grid', {
            divided,
        }),
    });

    // @TODO When we get to a certain viewport size in the editor we should change the orientation from horizontal to vertical.
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'horizontal',
        renderAppender: false,
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody>
                    <ToggleControl
                        label={divided ? 'Divided' : 'Not Divided'}
                        checked={divided}
                        onChange={() => toggleDivided()}
                    />
                    <RangeControl
                        label={__('Columns')}
                        value={count}
                        onChange={value => updateColumns(count, value)}
                        min={1}
                        max={Math.max(6, count)}
                        withInputField
                    />
                    {5 < count && (
                        <Notice status="warning" isDismissible={false}>
                            {__(
                                'This column count exceeds the recommended amount and may cause visual breakage.',
                            )}
                        </Notice>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...innerBlocksProps} />
        </Fragment>
    );
};

const ColumnsEditContainerWrapper = withDispatch(
    (dispatch, ownProps, registry) => ({
        toggleDivided() {
            const { attributes, setAttributes } = ownProps;
            const { divided } = attributes;
            setAttributes({ divided: !divided });
        },
        /**
         * Updates the column count, including necessary revisions to child Column
         * blocks to grant required or redistribute available space.
         *
         * @param {number} previousColumns Previous column count.
         * @param {number} newColumns      New column count.
         */
        updateColumns(previousColumns, newColumns) {
            const { clientId } = ownProps;
            const { replaceInnerBlocks } = dispatch('core/block-editor');
            const { getBlocks } = registry.select('core/block-editor');

            let innerBlocks = getBlocks(clientId);
            const hasExplicitWidths = hasExplicitPercentColumnWidths(
                innerBlocks,
            );

            // Redistribute available width for existing inner blocks.
            const isAddingColumn = newColumns > previousColumns;

            if (isAddingColumn && hasExplicitWidths) {
                // If adding a new column, assign width to the new column equal to
                // as if it were `1 / columns` of the total available space.
                const newColumnWidth = toWidthPrecision(100 / newColumns);

                // Redistribute in consideration of pending block insertion as
                // constraining the available working width.
                const widths = getRedistributedColumnWidths(
                    innerBlocks,
                    100 - newColumnWidth,
                );

                innerBlocks = [
                    ...getMappedColumnWidths(innerBlocks, widths),
                    ...times(newColumns - previousColumns, () => {
                        return createBlock('prc-block/column', {
                            width: newColumnWidth,
                        });
                    }),
                ];
            } else if (isAddingColumn) {
                innerBlocks = [
                    ...innerBlocks,
                    ...times(newColumns - previousColumns, () => {
                        return createBlock('prc-block/column');
                    }),
                ];
            } else {
                // The removed column will be the last of the inner blocks.
                innerBlocks = dropRight(
                    innerBlocks,
                    previousColumns - newColumns,
                );

                if (hasExplicitWidths) {
                    // Redistribute as if block is already removed.
                    const widths = getRedistributedColumnWidths(
                        innerBlocks,
                        100,
                    );

                    innerBlocks = getMappedColumnWidths(innerBlocks, widths);
                }
            }

            replaceInnerBlocks(clientId, innerBlocks);
        },
    }),
)(ColumnsEditContainer);

const Placeholder = ({ clientId, name, setAttributes }) => {
    const { blockType, defaultVariation, variations } = useSelect(
        select => {
            return {
                blockType: select('core/blocks').getBlockType(name),
                defaultVariation: select(
                    'core/blocks',
                ).getDefaultBlockVariation(name, 'block'),
                variations: select('core/blocks').getBlockVariations(
                    name,
                    'block',
                ),
            };
        },
        [name],
    );
    const { replaceInnerBlocks } = useDispatch('core/block-editor');
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <__experimentalBlockVariationPicker
                icon={get(blockType, ['icon', 'src'])}
                label={get(blockType, ['title'])}
                variations={variations}
                onSelect={(nextVariation = defaultVariation) => {
                    if (nextVariation.attributes) {
                        setAttributes(nextVariation.attributes);
                    }
                    if (nextVariation.innerBlocks) {
                        replaceInnerBlocks(
                            clientId,
                            createBlocksFromInnerBlocksTemplate(
                                nextVariation.innerBlocks,
                            ),
                            true,
                        );
                    }
                }}
                allowSkip
            />
        </div>
    );
};

const Edit = props => {
    const { clientId } = props;

    // Check for existence of inner blocks (prc-block/column)
    const hasInnerBlocks = useSelect(
        select => 0 < select('core/block-editor').getBlocks(clientId).length,
        [clientId],
    );

    // Define active component...
    // ... if block hasInnerBlocks then use ColumnsEditContainerWrapper otherwise use Placholder, pass all props through
    const Component = hasInnerBlocks
        ? ColumnsEditContainerWrapper
        : Placeholder;

    return <Component {...props} />;
};

export default Edit;
