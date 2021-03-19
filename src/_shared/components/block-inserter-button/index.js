/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { select, dispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';

import { createBlock } from '@wordpress/blocks';

const BlockInserterButton = ({
    label = '',
    blockName,
    clientId,
    attributes = {},
}) => {
    const handleClick = () => {
        const currentBlock = select('core/block-editor').getBlock(clientId);
        console.log('debug info...', currentBlock.innerBlocks.length);
        const nextIndex = currentBlock.innerBlocks.length - 1;
        const newBlock = createBlock(blockName, attributes);
        dispatch('core/block-editor').insertBlock(
            newBlock,
            nextIndex,
            clientId,
        );
    };
    return (
        <Button
            label={__(label)}
            tooltipPosition="bottom"
            onClick={handleClick}
            className="block-editor-button-block-appender"
        >
            {__(label)}
        </Button>
    );
};

export default BlockInserterButton;
