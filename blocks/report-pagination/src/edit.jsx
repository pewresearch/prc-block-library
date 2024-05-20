/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	withColors,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import usePagination from './use-pagination';
import Controls from './controls';
import NextPostButton from './next-post-button';
import NextPrevButton from './next-prev-button';
import PaginationItems from './pagination-items';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                              Properties passed to the function.
 * @param {Object}   props.attributes                   Available block attributes.
 * @param {Function} props.setAttributes                Function that updates individual attributes.
 * @param {Object}   props.context                      Context object with the block's context values.
 * @param {string}   props.clientId                     Unique ID of the block.
 * @param            props.itemBackgroundColor
 * @param            props.setItemBackgroundColor
 * @param            props.itemTextColor
 * @param            props.setItemTextColor
 * @param            props.itemBorderColor
 * @param            props.setItemBorderColor
 * @param            props.itemHoverBackgroundColor
 * @param            props.setItemHoverBackgroundColor
 * @param            props.itemActiveBackgroundColor
 * @param            props.setItemActiveBackgroundColor
 * @param            props.nextButtonBackgroundColor
 * @param            props.setNextButtonBackgroundColor
 * @param            props.nextButtonTextColor
 * @param            props.setNextButtonTextColor
 * @param            props.nextButtonBoxShadowColor
 * @param            props.setNextButtonBoxShadowColor
 * @param            props.__unstableLayoutClassNames
 * @param {boolean}  props.isSelected                   Whether or not the block is currently selected.
 *
 * @return {WPElement} Element to render.
 */
function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	itemBackgroundColor,
	setItemBackgroundColor,
	itemTextColor,
	setItemTextColor,
	itemBorderColor,
	setItemBorderColor,
	itemHoverBackgroundColor,
	setItemHoverBackgroundColor,
	itemActiveBackgroundColor,
	setItemActiveBackgroundColor,
	nextButtonBackgroundColor,
	setNextButtonBackgroundColor,
	nextButtonTextColor,
	setNextButtonTextColor,
	nextButtonBoxShadowColor,
	setNextButtonBoxShadowColor,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { postId, postType } = context;
	const { currentPost, nextPost, previousPost, paginationItems } =
		usePagination({ postId, postType });

	const blockProps = useBlockProps({
		className: layoutClassNames,
	});

	return (
		<Fragment>
			<Controls
				{...{
					colors: {
						itemBackgroundColor,
						setItemBackgroundColor,
						itemTextColor,
						setItemTextColor,
						itemBorderColor,
						setItemBorderColor,
						itemHoverBackgroundColor,
						setItemHoverBackgroundColor,
						itemActiveBackgroundColor,
						setItemActiveBackgroundColor,
						nextButtonBackgroundColor,
						setNextButtonBackgroundColor,
						nextButtonTextColor,
						setNextButtonTextColor,
						nextButtonBoxShadowColor,
						setNextButtonBoxShadowColor,
					},
					clientId,
				}}
			/>
			<div {...blockProps}>
				<NextPostButton
					{...{
						nextPost,
						backgroundColor: nextButtonBackgroundColor,
						textColor: nextButtonTextColor,
						boxShadowColor: nextButtonBoxShadowColor,
					}}
				/>
				<div className="wp-block-prc-block-report-pagination__pagination">
					<NextPrevButton
						{...{ post: previousPost, label: '&larr; Prev Page' }}
					/>
					<PaginationItems
						{...{
							paginationItems,
							backgroundColor: itemBackgroundColor,
							textColor: itemTextColor,
							borderColor: itemBorderColor,
							hoverBackgroundColor: itemHoverBackgroundColor,
							activeBackgroundColor: itemActiveBackgroundColor,
						}}
					/>
					<NextPrevButton
						{...{ post: nextPost, label: 'Next Page &rarr;' }}
					/>
				</div>
			</div>
		</Fragment>
	);
}

export default withColors(
	{ itemBackgroundColor: 'color' },
	{ itemTextColor: 'color' },
	{ itemBorderColor: 'color' },
	{ itemHoverBackgroundColor: 'color' },
	{ itemActiveBackgroundColor: 'color' },
	{ nextButtonBackgroundColor: 'color' },
	{ nextButtonTextColor: 'color' },
	{ nextButtonBoxShadowColor: 'color' }
)(Edit);
