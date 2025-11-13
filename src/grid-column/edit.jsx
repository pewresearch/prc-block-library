/* eslint-disable no-unused-vars */
/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
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
import Controls from './controls';
import StyleEngine from './style-engine';

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
		tabletPosition,
		mobilePosition,
		desktopDivider,
		tabletDivider,
		mobileDivider,
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
			[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
			[`column${index}-desktop-grid__span-${desktopSpan}`]: desktopSpan,
			'has-desktop-divider': desktopDivider,
			[`column${index}-tablet-grid__span-${tabletSpan}`]: tabletSpan,
			[`column${index}-tablet-position-${tabletPosition}`]: tabletPosition,
			'has-tablet-divider': tabletDivider,
			[`column${index}-mobile-grid__span-${mobileSpan}`]: mobileSpan,
			[`column${index}-mobile-position-${mobilePosition}`]: mobilePosition,
			'has-mobile-divider': mobileDivider,
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
		<>
			<StyleEngine attributes={attributes} clientId={clientId} />
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...innerBlocksProps} />
		</>
	);
}
