/**
 * External dependencies
 */
import classnames from 'classnames';
import { Grid } from 'semantic-ui-react';

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

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-menu-item'];

const Edit = ({ attributes, setAttributes, className, clientId }) => {
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
        className: classnames(className, 'column five wide'),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        // renderAppender: hasChildBlocks
        //     ? undefined
        //     : InnerBlocks.ButtonBlockAppender,
    });

    // When you click into a menu link, when isSelected is true then we should using block context change something in the parent block, view block, that says this is whats active. From there we will hide or show the current page, when you click on a new menu link that will show the appropriate page.

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Menu settings')}>
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
