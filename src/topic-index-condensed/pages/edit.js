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
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-page'];

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
