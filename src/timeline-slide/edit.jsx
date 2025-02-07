/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Fragment, useMemo, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
	context,
}) {
	const {
		blockIndex,
		hasChildBlocks,
		hasInnerBlocksSelected,
		isRootSelected,
		isRootDeepSelected,
		timelineClientId,
	} = useSelect(
		(select) => {
			const rootClientId =
				select(blockEditorStore).getBlockRootClientId(clientId);
			return {
				blockIndex:
					select(blockEditorStore).getBlockIndex(clientId) + 1,
				hasChildBlocks:
					select(blockEditorStore).getBlockOrder(clientId).length > 0,
				hasInnerBlocksSelected: select(
					blockEditorStore
				).hasSelectedInnerBlock(clientId, true),
				timelineClientId: rootClientId,
				isRootSelected:
					select(blockEditorStore).isBlockSelected(rootClientId),
				isRootDeepSelected: select(
					blockEditorStore
				).hasSelectedInnerBlock(rootClientId, true),
			};
		},
		[clientId]
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	// If this slide is selected, update the current active index in the parent timeline block.
	useEffect(() => {
		if (true !== isSelected) {
			return;
		}
		console.log(
			"Updating the parent timeline block's current active index",
			isSelected,
			timelineClientId,
			blockIndex
		);
		updateBlockAttributes(timelineClientId, {
			currentActiveIndex: blockIndex,
		});
	}, [blockIndex, timelineClientId, isSelected]);

	/**
	 * This hook determines if the current timeline slide is selected.
	 * This is true if it is selected or if any of its inner blocks are selected.
	 */
	const isSelectedSlide = useMemo(() => {
		return (
			isSelected ||
			hasInnerBlocksSelected ||
			(context && blockIndex === context['timeline/currentActiveIndex'])
		);
	}, [isSelected, hasInnerBlocksSelected, context]);

	const blockProps = useBlockProps({
		hidden: !isSelectedSlide,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			role: 'tabpanel',
		},
		{
			template: [
				['core/paragraph', { placeholder: 'Timeline Slide Content' }],
			],
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<div {...blockProps}>
			{isSelectedSlide && <section {...innerBlocksProps} />}
		</div>
	);
}
