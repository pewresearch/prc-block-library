/**
 * WordPress Dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

export default function Controls({ attributes, setAttributes, clientId }) {
	const { orientation } = attributes;
	// detect if the parent block is a cover block or not...
	const { isInsideCover } = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlock } =
				select('core/block-editor');
			const rootClientId = getBlockRootClientId(clientId);
			if (!rootClientId) {
				return {
					isInsideCover: false,
				};
			}
			const parentBlock = getBlock(rootClientId);
			return {
				isInsideCover: parentBlock.name === 'core/cover',
			};
		},
		[clientId]
	);

	const options = useMemo(() => {
		return isInsideCover
			? [
					{
						label: 'Horizontal',
						value: 'horizontal',
					},
					{
						label: 'Vertical',
						value: 'vertical',
					},
				]
			: [
					{
						label: 'Horizontal',
						value: 'horizontal',
					},
				];
	}, [isInsideCover]);

	return (
		<InspectorControls>
			<PanelBody
				title={'Carousel Orientation'}
				initialOpen={isInsideCover}
			>
				<SelectControl
					label={'Orientation'}
					value={orientation}
					options={options}
					onChange={(value) => setAttributes({ orientation: value })}
					help={
						!isInsideCover
							? 'To use a vertical carousel, the carousel must be inside a cover block.'
							: 'When the carousel is inside a cover block, you can select between the default horizontal or vertical orientation.'
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
