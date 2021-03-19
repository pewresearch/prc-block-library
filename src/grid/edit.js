/* eslint-disable react/jsx-pascal-case */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { dropRight, times } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, RangeControl, Notice } from '@wordpress/components';
import {
    InnerBlocks,
    InspectorControls,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { withDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In the grid block, the only block we allow is 'prc-block/row'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['prc-block/row'];

const GridEditContainer = ({ attributes, className, updateRows, clientId }) => {
    // Return a count of prc-block/row inside...
    const { count } = useSelect(
        select => {
            return {
                count: select('core/block-editor').getBlockCount(clientId),
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps();

    // @TODO When we get to a certain viewport size in the editor we should change the orientation from horizontal to vertical.
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        renderAppender: InnerBlocks.ButtonBlockAppender,
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody>
                    <RangeControl
                        label={__('Rows')}
                        value={count}
                        onChange={value => updateRows(count, value)}
                        min={1}
                        max={Math.max(6, count)}
                        withInputField
                    />
                </PanelBody>
            </InspectorControls>

            <div {...innerBlocksProps} />
        </Fragment>
    );
};

const GridEditContainerWrapper = withDispatch(
    (dispatch, ownProps, registry) => ({
        /**
         * Updates the row count, including necessary revisions to child Row
         * blocks to grant required or redistribute available space.
         *
         * @param {number} previousRows Previous row count.
         * @param {number} newRows      New row count.
         */
        updateRows(previousRows, newRows) {
            const { clientId } = ownProps;
            const { replaceInnerBlocks } = dispatch('core/block-editor');
            const { getBlocks } = registry.select('core/block-editor');

            let innerBlocks = getBlocks(clientId);

            // Flag if we are adding rows or removing them.
            const isAddingRow = newRows > previousRows;

            if (isAddingRow) {
                innerBlocks = [
                    ...innerBlocks,
                    ...times(newRows - previousRows, () => {
                        return createBlock('prc-block/row');
                    }),
                ];
            } else {
                // Remove a row, subtract.
                // The removed row will be the last of the inner blocks.
                innerBlocks = dropRight(innerBlocks, previousRows - newRows);
            }

            replaceInnerBlocks(clientId, innerBlocks);
        },
    }),
)(GridEditContainer);

const Edit = props => <GridEditContainerWrapper {...props} />;

export default Edit;