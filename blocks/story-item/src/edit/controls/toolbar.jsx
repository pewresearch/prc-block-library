/**
 * External Dependencies
 */
import { HeadingLevelToolbar, URLSearchToolbar } from '@prc/components';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Fragment, useCallback } from '@wordpress/element';
import {
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { HeadingLevelIcon, ImageSizeIcon, ImageSlotIcon } from './icons';
import { setArtBySize } from '../../helpers';

const COLUMN_LIMIT = 6;

function Icon({ level, isPressed }) {
	return <HeadingLevelIcon selected={level} currentlyActive={isPressed} />;
}

function Toolbar({ attributes, setAttributes, context }) {
	const { postId, imageSize, imageSlot, headerSize, isChartArt } = attributes;

	const columnWidth =
		undefined !== context['column/gridSpan']
			? context['column/gridSpan']
			: false;

	const isUsingContext =
		undefined !== context.queryId &&
		undefined !== context.postId &&
		undefined !== context.postType &&
		0 !== context.postId &&
		Number.isInteger(context.postId);

	const handleImageSizeChange = (newSize) => {
		setAttributes({ imageSize: newSize });
		setArtBySize(newSize, postId, setAttributes); // @TODO LOOK INTO
	};

	const MemoizedImageSlotIcon = useCallback(
		() => <ImageSlotIcon selected={imageSlot} />,
		[imageSlot],
	);

	const MemoizedImageSizeIcon = useCallback(
		() => <ImageSizeIcon selected={imageSize} currentlyActive={imageSize} />,
		[imageSize],
	);

	return (
		<BlockControls>
			{!isUsingContext && (
				<URLSearchToolbar
					{...{
						attributes,
						setAttributes,
						onSelect: (postAttrs) => {
							setAttributes(postAttrs);
						},
					}}
				/>
			)}
			<HeadingLevelToolbar
				selectedLevel={headerSize}
				levels={[1, 2, 3]}
				onChange={(newSize) => setAttributes({ headerSize: newSize })}
				Icon={Icon}
			/>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={MemoizedImageSlotIcon}
					label="Select Image Slot"
					controls={[
						{
							title: 'Top',
							icon: <ImageSlotIcon selected="top" />,
							isActive: 'top' === imageSlot,
							onClick: () => {
								const newSlot = 'top';
								setAttributes({ imageSlot: newSlot });
							},
						},
						{
							title: 'Bottom',
							icon: <ImageSlotIcon selected="bottom" />,
							isActive: 'bottom' === imageSlot,
							onClick: () => {
								const newSlot = 'bottom';
								setAttributes({ imageSlot: newSlot });
							},
						},
						{
							title: 'Left',
							icon: <ImageSlotIcon selected="left" />,
							isActive: 'left' === imageSlot,
							isDisabled: false !== columnWidth && columnWidth < COLUMN_LIMIT,
							onClick: () => {
								const newSlot = 'left';
								setAttributes({ imageSlot: newSlot });
							},
						},
						{
							title: 'Right',
							icon: <ImageSlotIcon selected="right" />,
							isActive: 'right' === imageSlot,
							isDisabled: false !== columnWidth && columnWidth < COLUMN_LIMIT,
							onClick: () => {
								const newSlot = 'right';
								setAttributes({ imageSlot: newSlot });
							},
						},
						{
							title: 'Disabled',
							icon: <ImageSlotIcon selected="disabled" />,
							isActive: 'disabled' === imageSlot,
							onClick: () => {
								const newSlot = 'disabled';
								setAttributes({ imageSlot: newSlot });
							},
						},
					]}
				/>
				{'disabled' !== imageSlot && (
					<Fragment>
						<ToolbarDropdownMenu
							icon={MemoizedImageSizeIcon}
							label="Select Image Size"
							controls={[
								{
									title: 'A1',
									icon: (
										<ImageSizeIcon selected="A1" currentlyActive={imageSize} />
									),
									isActive: 'A1' === imageSize,
									onClick: () => handleImageSizeChange('A1'),
								},
								{
									title: 'A2',
									icon: (
										<ImageSizeIcon selected="A2" currentlyActive={imageSize} />
									),
									isActive: 'A2' === imageSize,
									onClick: () => handleImageSizeChange('A2'),
								},
								{
									title: 'A3',
									icon: (
										<ImageSizeIcon selected="A3" currentlyActive={imageSize} />
									),
									isActive: 'A3' === imageSize,
									onClick: () => handleImageSizeChange('A3'),
								},
								{
									title: 'A4',
									icon: (
										<ImageSizeIcon selected="A4" currentlyActive={imageSize} />
									),
									isActive: 'A4' === imageSize,
									onClick: () => handleImageSizeChange('A4'),
								},
								{
									title: 'XL',
									icon: (
										<ImageSizeIcon selected="XL" currentlyActive={imageSize} />
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
					</Fragment>
				)}
			</ToolbarGroup>
		</BlockControls>
	);
}

export default Toolbar;