/* eslint-disable no-unused-vars */
/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const { gridLayout, allowedBlocks, templateLock, verticalAlignment } =
		attributes;

	const {
		index,
		desktopSpan,
		tabletSpan,
		mobileSpan,
		desktopStart,
		tabletStart,
		mobileStart,
		desktopRow,
		tabletRow,
		mobileRow,
	} = gridLayout;

	const { hasChildBlocks } = useSelect(
		(select) => {
			const { getBlockOrder } = select(blockEditorStore);

			return {
				hasChildBlocks: 0 < getBlockOrder(clientId).length,
			};
		},
		[clientId],
	);

	const blockProps = useBlockProps({
		className: classnames({
			[`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
			[`column${index}-desktop-grid__span-${desktopSpan}`]: desktopSpan,
			[`column${index}-tablet-grid__span-${tabletSpan}`]: tabletSpan,
			[`column${index}-mobile-grid__span-${mobileSpan}`]: mobileSpan,
			[`column${index}-desktop-grid__start-${desktopStart}`]: desktopStart,
			[`column${index}-tablet-grid__start-${tabletStart}`]: tabletStart,
			[`column${index}-mobile-grid__start-${mobileStart}`]: mobileStart,
			// [`column${index}-desktop-grid__row-${desktopRow}`]: desktopRow,
			// [`column${index}-tablet-grid__row-${tabletRow}`]: tabletRow,
			// [`column${index}-mobile-grid__row-${mobileRow}`]: mobileRow,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks,
		orientation: 'vertical',
		templateLock,
		renderAppender: hasChildBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
}
