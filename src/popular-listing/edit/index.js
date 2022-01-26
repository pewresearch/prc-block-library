/**
 * WordPress Dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import {
    Flex,
    FlexBlock,
    FlexItem,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Placeholder from './placeholder';

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {

    const { title, postId } = attributes;

    const blockProps = useBlockProps();

    const { blockIndex, numberEnabled } = useSelect(
        select => {
            const parentBlockId = select('core/block-editor').getBlockRootClientId(
                clientId,
            );

            if (null == parentBlockId || typeof parentBlockId === 'string' && 0 === parentBlockId.length) {
                return {
                    blockIndex: null,
                    numberEnabled: false
                };
            }

            let blockIndexID;

            const parentBlock = select('core/block-editor').getBlock(parentBlockId);

            if (parentBlock.name === 'core/group') {
                //get the block index for this block
                blockIndexID = select('core/block-editor').getBlockIndex(clientId, parentBlockId);
            }

            // Set your attribute with the index number here.
            return {
                blockIndex: blockIndexID,
                numberEnabled: true
            };
        },
        [clientId],
    );

    useEffect(() => {
        setAttributes({ blockIndexAttr: blockIndex });

        if (numberEnabled == true) {
            setAttributes({ enableNumber: true });
        } else {
            setAttributes({ enableNumber: false });
        }
    }, [blockIndex])

    if ( undefined === postId ) {
        return <Placeholder setAttributes={setAttributes} blockProps={blockProps}/>;
    }

    return (
        <div {...blockProps} >
			{numberEnabled && blockIndex >= 0 && (
				<span className="big-number">
					{blockIndex + 1}
				</span >
			)}
			{true !== isSelected && <RichText.Content className="title" tagName="h2" value={title} />}
            {true === isSelected && (
				<RichText
					tagName="h2"
					value={title}
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={t => setAttributes({ title: t })}
					placeholder="Joe Biden does something about climate change..."
					keepPlaceholderOnFocus
					className="title"
				/>
			)}
        </div >
    );
};

export default edit;
