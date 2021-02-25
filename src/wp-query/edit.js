/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
    InnerBlocks,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED = ['prc-block/story-item'];

const edit = ({ attributes, setAttributes, className, clientId }) => {
    const blockProps = useBlockProps({ className });

    const innerBlocksProps = useInnerBlocksProps({
        allowedBlocks: ALLOWED,
        orientation: 'vertical', // We should allow toggling this based on layout.
        renderAppender: InnerBlocks.ButtonBlockAppender,
    });

    return (
        <div {...blockProps}>
            <Controls {...{ attributes, setAttributes, clientId }} />
            <div {...innerBlocksProps} />
        </div>
    );
};

export default edit;
