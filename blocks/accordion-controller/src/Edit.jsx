/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

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
	borderColor,
	setBorderColor,
}) {
	const { example } = attributes;

	const colors = {
		titleBackgroundColor,
		setTitleBackgroundColor,
		titleTextColor,
		setTitleTextColor,
		contentBackgroundColor,
		setContentBackgroundColor,
		contentTextColor,
		setContentTextColor,
		borderColor,
		setBorderColor,
	};

	const blockProps = useBlockProps({
		className: classNames( className, {
			'has-border-color': !! borderColor.color || !! borderColor?.class,
			[ getColorClassName( 'border-color', borderColor?.slug ) ]:
				!! borderColor?.slug,
		} ),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<Fragment>
			<Controls colors={colors} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
}

export default withColors(
	{ titleBackgroundColor: 'color' },
	{ titleTextColor: 'color' },
	{ contentBackgroundColor: 'color' },
	{ contentTextColor: 'color' },
	{ borderColor: 'color' },
)(Edit);
