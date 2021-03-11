/**
 * WordPress dependencies
 */
import { __experimentalBlockNavigationTree as BlockNavigationTree } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

const BlockNavigationList = ({ clientId, __experimentalFeatures }) => {
    const { block, selectedBlockClientId } = useSelect(
        select => {
            const { getSelectedBlockClientId, getBlock } = select(
                'core/block-editor',
            );

            return {
                block: getBlock(clientId),
                selectedBlockClientId: getSelectedBlockClientId(),
            };
        },
        [clientId],
    );

    const { selectBlock } = useDispatch('core/block-editor');

    return (
        <BlockNavigationTree
            blocks={block.innerBlocks}
            selectedBlockClientId={selectedBlockClientId}
            selectBlock={selectBlock}
            __experimentalFeatures={__experimentalFeatures}
            showNestedBlocks
            showAppender
            showBlockMovers
        />
    );
};

export default BlockNavigationList;
