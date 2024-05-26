/* eslint-disable max-lines-per-function */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import {
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
	Path,
	SVG,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

function ImageSizeIcon({ selected, currentlyActive = '' }) {
	const iconPaths = {
		A1: 'M12.13,18.09h-3l-.74-2.46H4.49l-.75,2.46H1.27l3.84-12H8.36ZM7.72,13.41,6.44,9.2,5.16,13.41Z M13.31,8.35a7,7,0,0,0,4-2.44h2v10h3.33v2.19H13V15.9h3.63V9a23.54,23.54,0,0,1-3.33,1.78Z',
		A2: 'M12.5,18.09h-3l-.74-2.46H4.86l-.75,2.46H1.64l3.83-12H8.73ZM8.09,13.41,6.81,9.2,5.53,13.41Z M22.16,18.09h-9V15.75l.72-.52,1.46-1a31.07,31.07,0,0,0,3.1-2.6,2.74,2.74,0,0,0,.9-1.87,1.55,1.55,0,0,0-1.66-1.6c-1.19,0-1.86.76-2,2.3l-2.48-.55c.56-2.67,2.11-4,4.66-4a4.37,4.37,0,0,1,3,.91A3.5,3.5,0,0,1,22.2,9.69c0,1.51-.69,2.61-2.52,4a33.64,33.64,0,0,1-3.06,2h5.74Z',
		A3: 'M12.52,18h-3l-.74-2.47H4.89L4.13,18H1.67L5.5,6H8.76ZM8.11,13.32,6.83,9.11,5.56,13.32Z M17.38,10.75a1.87,1.87,0,0,0,1.46-.47,1.36,1.36,0,0,0,.38-.94A1.5,1.5,0,0,0,17.6,7.89c-1,0-1.51.45-1.84,1.53L13.28,9a3.62,3.62,0,0,1,1.1-2,4.58,4.58,0,0,1,3.33-1.24C20.24,5.82,22,7.13,22,9a2.69,2.69,0,0,1-2,2.68,3.09,3.09,0,0,1,1.51.74,2.73,2.73,0,0,1,.9,2.11c0,2.19-1.82,3.61-4.64,3.61A4.67,4.67,0,0,1,14.23,17a3.88,3.88,0,0,1-1.31-2.45l2.55-.36A2,2,0,0,0,17.63,16a1.64,1.64,0,0,0,1.84-1.62,1.55,1.55,0,0,0-.61-1.27,3,3,0,0,0-1.66-.27H16.1V10.75Z',
		A4: 'M12.31,18.09h-3l-.74-2.46H4.67l-.75,2.46H1.45l3.84-12H8.54ZM7.9,13.41,6.62,9.2,5.34,13.41Z M20.86,13.22h1.69v2.1H20.86v2.77H18.05V15.32H12.81v-2.1l4.84-7.31h3.21Zm-2.69,0V9.16c0-.09,0-.28,0-.57l0-.51-3.29,5.14Z',
		XL: 'M9.23,11.58,12.94,18H9.7L7.28,13.65,4.87,18H2.21l3.71-6.38L2.62,6H5.9L7.84,9.65,9.88,6h2.63Z M21.79,15.63V18H14.18V6H17v9.64Z',
	};
	return (
		<SVG
			width={24}
			height={24}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			isPressed={selected === currentlyActive}
		>
			<Path d={iconPaths[selected]} />
		</SVG>
	);
}

function Toolbar({ attributes, setAttributes, context }) {
	const { imageSize, isChartArt } = attributes;

	const handleImageSizeChange = (newSize) => {
		setAttributes({ imageSize: newSize });
	};

	const MemoizedImageSizeIcon = useCallback(
		() => (
			<ImageSizeIcon selected={imageSize} currentlyActive={imageSize} />
		),
		[imageSize]
	);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={MemoizedImageSizeIcon}
					label="Select Image Size"
					controls={[
						{
							title: 'A1',
							icon: (
								<ImageSizeIcon
									selected="A1"
									currentlyActive={imageSize}
								/>
							),
							isActive: 'A1' === imageSize,
							onClick: () => handleImageSizeChange('A1'),
						},
						{
							title: 'A2',
							icon: (
								<ImageSizeIcon
									selected="A2"
									currentlyActive={imageSize}
								/>
							),
							isActive: 'A2' === imageSize,
							onClick: () => handleImageSizeChange('A2'),
						},
						{
							title: 'A3',
							icon: (
								<ImageSizeIcon
									selected="A3"
									currentlyActive={imageSize}
								/>
							),
							isActive: 'A3' === imageSize,
							onClick: () => handleImageSizeChange('A3'),
						},
						{
							title: 'A4',
							icon: (
								<ImageSizeIcon
									selected="A4"
									currentlyActive={imageSize}
								/>
							),
							isActive: 'A4' === imageSize,
							onClick: () => handleImageSizeChange('A4'),
						},
						{
							title: 'XL',
							icon: (
								<ImageSizeIcon
									selected="XL"
									currentlyActive={imageSize}
								/>
							),
							isActive: 'XL' === imageSize,
							onClick: () => handleImageSizeChange('XL'),
						},
					]}
				/>
				<ToolbarButton
					icon="chart-pie"
					isPressed={isChartArt}
					label={__('Enable Chart Art')}
					onClick={() => {
						setAttributes({
							isChartArt: !isChartArt,
						});
					}}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default Toolbar;
