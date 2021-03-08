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

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-menu-item'];

const Edit = ({ className }) => {
    const blockProps = useBlockProps({
        className: classnames(className, 'column five wide'),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'ui secondary vertical fluid menu',
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: InnerBlocks.ButtonBlockAppender,
        },
    );

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
