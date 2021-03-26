/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-page'];

const Edit = ({ className, context }) => {
    const isVertical = context['prc-block/tabs-vertical'];

    const blockProps = useBlockProps({
        className: classnames(className, { 'column twelve wide': isVertical }),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: false,
        renderAppender: false,
    });

    return <div {...innerBlocksProps} />;
};

export default Edit;
