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

const edit = ({ attributes, setAttributes, clientId }) => {
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
};

export default edit;
