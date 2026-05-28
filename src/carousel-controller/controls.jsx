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
	Button,
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
		viewType,
		enableDots,
		enableArrows,
		enableRewind,
		arrowsSize,
		dotsSize,
		useSlideBgForDots,
	} = attributes;

	const isCoverflow = viewType === 'coverflow';

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
		return [
			{
				label: 'Horizontal',
				value: 'horizontal',
			},
			{
				label: 'Vertical',
				value: 'vertical',
			},
			{
				label: 'Coverflow',
				value: 'coverflow',
			},
		];
	}, []);

	return (
		<>
			<InspectorControls>
				<PanelBody title={'Carousel View Type'} initialOpen={true}>
					<SelectControl
						label={'View Type'}
						value={viewType}
						options={options}
						onChange={(value) => setAttributes({ viewType: value })}
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
					{enableDots && (
						<ToggleControl
							label={'Use Slide Background Colors for Dot Colors'}
							checked={useSlideBgForDots}
							onChange={(value) =>
								setAttributes({ useSlideBgForDots: value })
							}
							help={
								'When enabled, each navigation dot uses its slide\u2019s background color. The custom Navigation Dot color is ignored.'
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
					{enableArrows && !isCoverflow && (
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
						...(useSlideBgForDots
							? []
							: [
									{
										colorValue: dotColor?.color,
										onColorChange: setDotColor,
										label: __('Navigation Dot'),
									},
								]),
						{
							colorValue: arrowColor?.color,
							onColorChange: setArrowColor,
							label: __('Navigation Arrow'),
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					__experimentalIsRenderedInSidebar
					{...colorSettings}
				/>
			</InspectorControls>
		</>
	);
}
