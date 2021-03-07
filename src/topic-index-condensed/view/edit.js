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

const BLOCKS_TEMPLATE = [
    ['prc-block/topic-index-condensed-menu', {}],
    ['prc-block/topic-index-condensed-page', {}],
];

const ALLOWED_BLOCKS = [
    'prc-block/topic-index-condensed-menu',
    'prc-block/topic-index-condensed-page',
];

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
        className: classnames(className, 'ui grid'),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'horizontal',
        renderAppender: hasChildBlocks
            ? undefined
            : InnerBlocks.ButtonBlockAppender,
        template: BLOCKS_TEMPLATE,
    });

    return (
        <Fragment>
            <BlockControls />

            <InspectorControls>
                <PanelBody title={__('View settings')}>
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
