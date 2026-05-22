/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';

import DEFAULT_FORM_TEMPLATE from './constants';

export default function Edit({
	attributes,
	setAttributes,
	clientId,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { displayMessageEditing } = attributes;
	const setDisplayMessageEditing = (value) =>
		setAttributes({ displayMessageEditing: value });
	const { hasInnerBlocks } = useSelect(
		(select) => {
			const { getBlock } = select(blockEditorStore);
			const block = getBlock(clientId);
			return {
				hasInnerBlocks: !!(block && block.innerBlocks.length),
			};
		},
		[clientId]
	);

	const blockProps = useBlockProps({
		className: clsx(layoutClassNames, {
			'is-displaying-form-message': displayMessageEditing,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: DEFAULT_FORM_TEMPLATE,
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
				displayMessageEditing={displayMessageEditing}
				setDisplayMessageEditing={setDisplayMessageEditing}
			/>
			<form {...innerBlocksProps} />
		</>
	);
}
