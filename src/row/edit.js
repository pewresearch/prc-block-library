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
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In the row block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['prc-block/column'];

const RowEditContainer = ({
    attributes,
    updateColumns,
    toggleDivided,
    toggleEqual,
    toggleStackable,
    clientId,
}) => {
    const { divided, equal, stackable } = attributes;

    // Return a count of prc-block/column inside...
    const { count, rowCount } = useSelect(
        select => {
            const gridRootClientId = select('core/block-editor').getBlockRootClientId(clientId);
            return {
                count: select('core/block-editor').getBlockCount(clientId),
                rowCount: select('core/block-editor').getBlockCount(gridRootClientId),
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames({
            'ui' : true,
            'equal width' : equal,
            divided,
            stackable: stackable,
            'grid': rowCount <= 1,
            'row': rowCount > 1,
        }),
    });

    // @TODO When we get to a certain viewport size in the editor we should change the orientation from horizontal to vertical.
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'horizontal',
        renderAppender: false,
        templateLock: 'all',
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
                    <ToggleControl
                        label={
                            equal
                                ? 'Equal Width Columns'
                                : 'Not Equal Width Columns'
                        }
                        checked={equal}
                        onChange={() => toggleEqual()}
                    />
                    <ToggleControl
                        label={
                            stackable
                                ? 'Stack On Mobile'
                                : 'Do Not Stack On Mobile'
                        }
                        checked={stackable}
                        onChange={() => toggleStackable()}
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

const RowEditContainerWrapper = withDispatch(
    (dispatch, ownProps, registry) => ({
        /**
         * Toggles the divided style attribute true or false.
         */
        toggleDivided() {
            const { attributes, setAttributes } = ownProps;
            const { divided } = attributes;
            setAttributes({ divided: !divided });
        },
        /**
         * Toggles the divided style attribute true or false.
         */
        toggleEqual() {
            const { attributes, setAttributes } = ownProps;
            const { equal } = attributes;
            setAttributes({ equal: !equal });
        },
        /**
         * Toggles the stackable style attribute true or false.
         */
         toggleStackable() {
            const { attributes, setAttributes } = ownProps;
            const { stackable } = attributes;
            setAttributes({ stackable: !stackable });
        },
        /**
         * Updates the column count, including necessary revisions to child Column
         * blocks to grant required or redistribute available space.
         *
         * @param {number} previousColumns Previous column count.
         * @param {number} newColumns      New column count.
         */
        updateColumns(previousColumns, newColumns) {
            const { clientId, equal } = ownProps;
            const { replaceInnerBlocks } = dispatch('core/block-editor');
            const { getBlocks } = registry.select('core/block-editor');

            let innerBlocks = getBlocks(clientId);

            console.log(
                'updateColumns()',
                previousColumns,
                newColumns,
                innerBlocks,
            );

            // Flag if we are adding columns or removing them.
            const isAddingColumn = newColumns > previousColumns;

            const newWidth = Math.round(16 / newColumns);
            // Change
            if (isAddingColumn) {
                // Modify existing columns to new width
                innerBlocks = innerBlocks.map(block => {
                    const b = block;
                    b.attributes.width = newWidth;
                    return b;
                });
                // Merge existing columns with new columns
                innerBlocks = [
                    ...innerBlocks,
                    ...times(newColumns - previousColumns, () => {
                        return createBlock('prc-block/column', {
                            width: newWidth,
                        });
                    }),
                ];
            } else {
                // Remove a column, subtract.
                // The removed column will be the last of the inner blocks.
                innerBlocks = dropRight(
                    innerBlocks,
                    previousColumns - newColumns,
                );
            }

            replaceInnerBlocks(clientId, innerBlocks);
        },
    }),
)(RowEditContainer);

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
                instructions={__(`Select a layout to begin. Click "skip" to select the default One Column option.`)}
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
    // ... if block hasInnerBlocks then use RowEditContainerWrapper otherwise use Placholder, pass all props through
    const Component = hasInnerBlocks ? RowEditContainerWrapper : Placeholder;

    return <Component {...props} />;
};

export default Edit;
