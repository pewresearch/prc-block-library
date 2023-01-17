/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import Placeholder from './Placeholder';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	insertBlocksAfter
} ) {
	const { postId, title } = attributes;

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
			<Controls { ...{ attributes, setAttributes, context: false } } />
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
						disableLineBreaks
						__unstableOnSplitAtEnd={() =>
							insertBlocksAfter(createBlock('prc-block/popular-story'))
						}
					/>
				)}
			</div>
		</Fragment>
	);
}
