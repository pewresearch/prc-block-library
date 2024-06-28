/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import { URLSearchToolbar } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, HeadingLevelDropdown } from '@wordpress/block-editor';
import { Fragment, useCallback } from '@wordpress/element';
import {
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { ImageSizeIcon, ImageSlotIcon } from './icons';
import { setArtBySize, getPostAttributes } from '../../helpers';
import ToolbarURLSearch from './toolbar-url-search';

const COLUMN_LIMIT = 6;

function Toolbar({ attributes, setAttributes, context }) {
	const {
		postId,
		postType,
		url,
		imageSize,
		imageSlot,
		headerSize,
		isChartArt,
	} = attributes;

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
		[imageSlot]
	);

	const MemoizedImageSizeIcon = useCallback(
		() => (
			<ImageSizeIcon selected={imageSize} currentlyActive={imageSize} />
		),
		[imageSize]
	);

	return (
		<BlockControls>
			{!isUsingContext && (
				<ToolbarURLSearch
					{...{
						postId,
						postType,
						url,
						onSelect: (post) => {
							return new Promise((resolve) => {
								getPostAttributes(
									post.entityId,
									post.entitySubType,
									imageSize
								).then((attrs) => {
									console.log(
										'getPostAttributes attrs:',
										attrs
									);
									setTimeout(() => {
										setAttributes(attrs);
									}, 500);
									resolve(attrs);
								});
							});
						},
						onUpdateURL: (newURL) => {
							setAttributes({ url: newURL });
						},
					}}
				/>
			)}
			<ToolbarGroup>
				<HeadingLevelDropdown
					options={[1, 2, 3]}
					value={headerSize}
					onChange={(newSize) =>
						setAttributes({ headerSize: newSize })
					}
				/>
			</ToolbarGroup>
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
							isDisabled:
								false !== columnWidth &&
								columnWidth < COLUMN_LIMIT,
							onClick: () => {
								const newSlot = 'left';
								setAttributes({ imageSlot: newSlot });
							},
						},
						{
							title: 'Right',
							icon: <ImageSlotIcon selected="right" />,
							isActive: 'right' === imageSlot,
							isDisabled:
								false !== columnWidth &&
								columnWidth < COLUMN_LIMIT,
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
					</Fragment>
				)}
			</ToolbarGroup>
		</BlockControls>
	);
}

export default Toolbar;
