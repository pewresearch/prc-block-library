/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, context, clientId }) {
	const currentlySelectedUUID = context['prc-block/tabs/activeUUID'];
	const { uuid } = attributes;
	const { hasChildBlocks } = useSelect(
		(select) => {
			const { getBlockOrder } = select('core/block-editor');
			return {
				hasChildBlocks: 0 < getBlockOrder(clientId).length,
			};
		},
		[clientId]
	);

	const isActive = useMemo(() => {
		return currentlySelectedUUID === uuid;
	}, [currentlySelectedUUID, uuid]);

	console.log('Pane: ', context, uuid, isActive, currentlySelectedUUID);

	const blockProps = useBlockProps({
		'aria-hidden': !isActive,
		'data-uuid': `${uuid}`, // @TODO: This may not be necessary.
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		renderAppender: hasChildBlocks
			? InnerBlocks.DefaultBlockAppender
			: InnerBlocks.ButtonBlockAppender,
		template: [
			[
				'core/paragraph',
				{ placeholder: 'Add content to this tab pane…' },
			],
		],
	});

	return <div {...innerBlocksProps} />;
}
