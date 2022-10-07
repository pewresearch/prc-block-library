/**
 * External Dependencies
 */
import { URLSearchToolbar } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */

import {
	useBlockProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import { useEffect, Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Placeholder from './placeholder';

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
	const { title, postId } = attributes;

	const blockProps = useBlockProps();

	const { blockIndex, numberEnabled } = useSelect(
		(select) => {
			const parentBlockId =
				select('core/block-editor').getBlockRootClientId(clientId);

			if (
				null == parentBlockId ||
				('string' === typeof parentBlockId && 0 === parentBlockId.length)
			) {
				return {
					blockIndex: null,
					numberEnabled: false,
				};
			}

			let blockIndexID;

			const parentBlock = select('core/block-editor').getBlock(parentBlockId);

			if ('core/group' === parentBlock.name) {
				// get the block index for this block
				blockIndexID = select('core/block-editor').getBlockIndex(
					clientId,
					parentBlockId,
				);
			}

			// Set your attribute with the index number here.
			return {
				blockIndex: blockIndexID,
				numberEnabled: true,
			};
		},
		[clientId],
	);

	useEffect(() => {
		setAttributes({ blockIndexAttr: blockIndex });

		if (true === numberEnabled) {
			setAttributes({ enableNumber: true });
		} else {
			setAttributes({ enableNumber: false });
		}
	}, [blockIndex]);

	if (undefined === postId) {
		return <Placeholder {...{ attributes, setAttributes, blockProps }} />;
	}

	return (
		<Fragment>
			<BlockControls>
				<URLSearchToolbar
					{...{
						attributes,
						setAttributes,
						onSelect: (postAttrs) => {
							setAttributes(postAttrs);
						},
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				{numberEnabled && 0 <= blockIndex && (
					<span className="big-number">{blockIndex + 1}</span>
				)}
				{true !== isSelected && (
					<RichText.Content className="title" tagName="h2" value={title} />
				)}
				{true === isSelected && (
					<RichText
						tagName="h2"
						value={title}
						allowedFormats={['core/bold', 'core/italic']}
						onChange={(t) => setAttributes({ title: t })}
						placeholder="Political Typology"
						keepPlaceholderOnFocus
						className="title"
						multiline={false}
					/>
				)}
			</div>
		</Fragment>
	);
};

export default edit;
