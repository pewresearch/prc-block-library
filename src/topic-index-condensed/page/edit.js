/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    BlockControls,
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const Edit = ({ attributes, setAttributes, className, clientId, context }) => {
    const active = true;
    // Get associated menu item uuid and then get associated menu item client id.
    const { updateBlockAttributes } = useDispatch('core/block-editor');
    const { hasChildBlocks, rootClientId } = useSelect(
        select => {
            const { getBlockOrder, getBlockRootClientId } = select(
                'core/block-editor',
            );
            const rootBlockClientId = getBlockRootClientId(clientId);
            return {
                hasChildBlocks: 0 < getBlockOrder(clientId).length,
                rootClientId: rootBlockClientId,
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames(className, 'column eleven wide', active),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: hasChildBlocks
            ? undefined
            : InnerBlocks.ButtonBlockAppender,
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Page settings')}>
                    <Fragment>
                        <p>Yep</p>
                    </Fragment>
                </PanelBody>
            </InspectorControls>
            <div {...innerBlocksProps} />
        </Fragment>
    );
};

export default Edit;
