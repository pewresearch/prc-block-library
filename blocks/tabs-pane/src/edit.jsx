/**
 * External Dependencies
 */
import classnames from 'classnames';

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
	const { currentlySelectedUUID } = useSelect((select) => {
		const { getBlockRootClientId } = select('core/block-editor');
		const panesClientId = getBlockRootClientId(clientId);
		const controllerClientId = getBlockRootClientId(panesClientId);
		return {
			currentlySelectedUUID: select('prc-block/tabs-controller')
				.getActiveUUID(controllerClientId),
		};
	}, [clientId]);

	const { uuid, className } = attributes;
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

	const blockProps = useBlockProps({
		className: classnames(className, {
			'is-active': isActive,
		}),
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
