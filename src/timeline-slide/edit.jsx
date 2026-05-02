/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useMemo, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

export default function Edit({ clientId, isSelected, context }) {
	const {
		blockIndex,
		hasChildBlocks,
		hasInnerBlocksSelected,
		timelineClientId,
	} = useSelect(
		(select) => {
			const rootClientId =
				select(blockEditorStore).getBlockRootClientId(clientId);
			return {
				blockIndex: select(blockEditorStore).getBlockIndex(clientId),
				hasChildBlocks:
					select(blockEditorStore).getBlockOrder(clientId).length > 0,
				hasInnerBlocksSelected: select(
					blockEditorStore
				).hasSelectedInnerBlock(clientId, true),
				timelineClientId: rootClientId,
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
		updateBlockAttributes(timelineClientId, {
			currentActiveIndex: blockIndex,
		});
	}, [blockIndex, timelineClientId, isSelected, updateBlockAttributes]);

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
	}, [isSelected, hasInnerBlocksSelected, context, blockIndex]);

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
