/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import clsx from 'clsx';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';

export default function Edit({ attributes, setAttributes, clientId, context }) {
	// Read active index
	const activeEditorIndex =
		context['navigation-panel/activeEditorIndex'] ??
		context['navigation-panel/activeIndex'] ??
		0;
	// Get Block Index
	const blockIndex = useSelect(
		(select) => {
			return select('core/block-editor').getBlockIndex(clientId);
		},
		[clientId]
	);
	// Is this panel visible
	const isVisible =
		'number' === typeof activeEditorIndex &&
		blockIndex === activeEditorIndex;
	// Add the class is-visible if the active index and the block index match
	const blockProps = useBlockProps({
		className: clsx({
			'is-visible': isVisible,
		}),
	});
	// Default Blocks
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-prc-block-navigation-panel__content' },
		{
			template: [
				[
					'core/paragraph',
					{
						placeholder: __('Panel content…', 'navigation-panel'),
					},
				],
			],
		}
	);
	return (
		<div {...blockProps}>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
			<div {...innerBlocksProps} />
		</div>
	);
}
