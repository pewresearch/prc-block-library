/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
	Warning,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl, SelectControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';

export default function Edit({
	attributes,
	clientId,
	isSelected,
	setAttributes,
}) {
	const { animation, effect, emoji, speed } = attributes;

	const { hasBlocks } = useSelect((select) => {
		const { getBlock } = select(blockEditorStore);
		const block = getBlock(clientId);
		return {
			hasBlocks: block.innerBlocks.length > 0,
		};
	}, [clientId]);

	const blockProps = useBlockProps({});
	const innerBlocksProps = useInnerBlocksProps({}, {
		template: [
			['core/paragraph', {
				placeholder: 'Type / to add a block anchored to this animation',
			}],
		]
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Animation">
					<SelectControl
						label="Animation"
						value={animation}
						onChange={(value) => setAttributes({ animation: value })}
						options={[
							{ label: 'Confetti', value: 'confetti' },
							{ label: 'Emoji', value: 'emoji' },
						]}
					/>
					<SelectControl
						label="Effect"
						value={effect}
						onChange={(value) => setAttributes({ effect: value })}
						options={[
							{ label: 'Center', value: 'center' },
							{ label: 'Fireworks', value: 'fireworks' },
							{ label: 'Rain', value: 'rain' },
						]}
					/>
					{animation === 'emoji' && (
						<TextControl
							label="Emoji"
							value={emoji}
							onChange={(value) => setAttributes({ emoji: value })}
						/>
					)}
					<NumberControl
						label="Speed"
						value={speed}
						type="number"
						help="The speed of the animation in milliseconds. Lower numbers mean faster animations."
						onChange={(value) => setAttributes({ speed: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{!hasBlocks && !isSelected && (
					<Warning>
						This is an animation block. You can optionally add a block to an anchor it to this animation.
					</Warning>
				)}
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
