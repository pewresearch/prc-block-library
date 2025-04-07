/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	CardDivider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	dotColor,
	setDotColor,
	arrowColor,
	setArrowColor,
}) {
	const {
		orientation,
		enableDots,
		enableArrows,
		enableRewind,
		arrowsSize,
		dotsSize,
	} = attributes;

	const colorSettings = useMultipleOriginColorsAndGradients();

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
		<>
			<InspectorControls>
				<PanelBody
					title={'Carousel Orientation'}
					initialOpen={isInsideCover}
				>
					<SelectControl
						label={'Orientation'}
						value={orientation}
						options={options}
						onChange={(value) =>
							setAttributes({ orientation: value })
						}
						help={
							!isInsideCover
								? 'To use a vertical carousel, the carousel must be inside a cover block.'
								: 'When the carousel is inside a cover block, you can select between the default horizontal or vertical orientation.'
						}
					/>
				</PanelBody>
				<PanelBody title={'Carousel Navigation'} initialOpen={true}>
					<ToggleControl
						label={'Enable Dots'}
						checked={enableDots}
						onChange={(value) =>
							setAttributes({ enableDots: value })
						}
					/>
					{enableDots && (
						<SelectControl
							label={'Dots Size'}
							value={dotsSize}
							options={[
								{
									label: 'Small',
									value: 'small',
								},
								{
									label: 'Medium',
									value: 'medium',
								},
								{
									label: 'Large',
									value: 'large',
								},
							]}
							onChange={(value) =>
								setAttributes({ dotsSize: value })
							}
						/>
					)}
					<CardDivider />
					<ToggleControl
						label={'Enable Arrows'}
						checked={enableArrows}
						onChange={(value) =>
							setAttributes({ enableArrows: value })
						}
					/>
					{enableArrows && (
						<SelectControl
							label={'Arrows Size'}
							value={arrowsSize}
							options={[
								{
									label: 'Small',
									value: 'small',
								},
								{
									label: 'Medium',
									value: 'medium',
								},
								{
									label: 'Large',
									value: 'large',
								},
							]}
							onChange={(value) =>
								setAttributes({ arrowsSize: value })
							}
						/>
					)}
					{isInsideCover && (
						<>
							<CardDivider />
							<ToggleControl
								label={'Enable Rewind'}
								checked={enableRewind}
								onChange={(value) =>
									setAttributes({ enableRewind: value })
								}
								help={
									'When enabled, the carousel will rewind to the first slide when the last slide is reached and the user scrolls back to the top of the carousel.'
								}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							colorValue: dotColor?.color,
							onColorChange: setDotColor,
							label: __('Navigation Dot'),
						},
						{
							colorValue: arrowColor?.color,
							onColorChange: setArrowColor,
							label: __('Navigation Arrow'),
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={true}
					__experimentalIsRenderedInSidebar
					{...colorSettings}
				/>
			</InspectorControls>
		</>
	);
}
