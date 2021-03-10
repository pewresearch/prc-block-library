/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    InnerBlocks,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/promo', 'prc-block/card'];

const Edit = ({ className }) => {
    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps(
        blockProps,
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: InnerBlocks.ButtonBlockAppender,
        },
    );

    return (
        <div {...innerBlocksProps} />
    );
};

export default Edit;
