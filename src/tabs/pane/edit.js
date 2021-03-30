/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import {
    InnerBlocks,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const Edit = ({ attributes, className, context, clientId }) => {
    const { uuid } = attributes;
    // eslint-disable-next-line react/destructuring-assignment
    const currentlyActive = context['prc-block/tabs-active'];
    const isActive = uuid === currentlyActive;

    if (!isActive) {
        return <Fragment />;
    }

    const { hasChildBlocks } = useSelect(
        select => {
            const { getBlockOrder } = select('core/block-editor');
            return {
                hasChildBlocks: 0 < getBlockOrder(clientId).length,
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: hasChildBlocks
            ? InnerBlocks.DefaultBlockAppender
            : InnerBlocks.ButtonBlockAppender,
    });

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
