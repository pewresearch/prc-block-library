/**
 * External Dependencies
 */
import classNames from 'classnames';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
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
import Controls from './controls';

const ALLOWED_BLOCKS = ['prc-block/accordion'];

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
function Edit({
	attributes,
	className,
	titleBackgroundColor,
	setTitleBackgroundColor,
	titleTextColor,
	setTitleTextColor,
	contentBackgroundColor,
	setContentBackgroundColor,
	contentTextColor,
	setContentTextColor,
	__unstableLayoutClassNames: layoutClassNames,
	clientId,
}) {
	const blockGap = getBlockGapSupportValue(attributes, 'vertical');

	const blockProps = useBlockProps({
		className: classNames( className, layoutClassNames, {
			'has-block-gap': "0" !== blockGap,
		} ),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<Fragment>
			<Controls colors={{
				titleBackgroundColor,
				setTitleBackgroundColor,
				titleTextColor,
				setTitleTextColor,
				contentBackgroundColor,
				setContentBackgroundColor,
				contentTextColor,
				setContentTextColor,
			}} clientId={clientId} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
}

export default withColors(
	{ contentTextColor: 'color' },
	{ contentBackgroundColor: 'color' },
	{ titleBackgroundColor: 'color' },
	{ titleTextColor: 'color' },
)(Edit);