/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
    InnerBlocks,
    InspectorControls,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    __experimentalBlockVariationPicker,
    useBlockProps,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

const ALLOWED = ['prc-block/story-item'];

const edit = ({ attributes, setAttributes, className, clientId }) => {
    const blockProps = useBlockProps({ className });
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED,
        orientation: 'vertical',
        renderAppender: InnerBlocks.ButtonBlockAppender,
    });

    return <div {...innerBlocksProps} />;
};

export default edit;
