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
	RangeControl,
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
		viewType,
		enableDots,
		enableArrows,
		enableRewind,
		enableAutoPlay,
		autoPlayInterval,
		arrowsSize,
		dotsSize,
		useSlideBgForDots,
	} = attributes;

	const isCoverflow = viewType === 'coverflow';
	const isSlideshow = viewType === 'slideshow';
	const hideArrowSize = isCoverflow || isSlideshow;

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
			{
				label: 'Slideshow',
				value: 'slideshow',
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
						__next40pxDefaultSize
					/>
				</PanelBody>
				<PanelBody title={__('Autoplay')} initialOpen={true}>
					<ToggleControl
						label={__('Enable Autoplay')}
						checked={enableAutoPlay !== false}
						onChange={(value) =>
							setAttributes({ enableAutoPlay: value })
						}
						help={__(
							'When enabled, Slideshow view advances slides automatically. A play/pause control is shown on the frontend.'
						)}
					/>
					<RangeControl
						label={__('Interval (seconds)')}
						value={(autoPlayInterval ?? 5000) / 1000}
						onChange={(value) => {
							if (undefined === value) {
								return;
							}
							setAttributes({
								autoPlayInterval: value * 1000,
							});
						}}
						min={1}
						max={10}
						step={0.5}
						marks={[
							{ value: 1, label: '1s' },
							{ value: 3, label: '3s' },
							{ value: 5, label: '5s' },
							{ value: 10, label: '10s' },
						]}
						help={__(
							'Time between automatic slide advances, in seconds.'
						)}
						__next40pxDefaultSize
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
							__next40pxDefaultSize
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
					{enableArrows && !hideArrowSize && (
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
							__next40pxDefaultSize
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
