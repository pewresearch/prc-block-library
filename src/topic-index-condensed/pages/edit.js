/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-page'];

const Edit = ({ className }) => {
    const blockProps = useBlockProps({
        className: classnames(className, 'column eleven wide'),
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
