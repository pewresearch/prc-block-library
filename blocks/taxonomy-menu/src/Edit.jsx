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
	withColors,
	getColorClassName,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-menu-link', 'prc-block/taxonomy-search'];

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
	setAttributes,
	className,
	clientId,
	context,
	isSelected,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
	borderColor,
	setBorderColor,
}) {
	const {
		templateLock,
		layout: {
			justifyContent,
			orientation = 'horizontal',
			flexWrap = 'wrap',
		} = {},
		allowedBlocks
	} = attributes;

	const textDecoration = attributes.style?.typography?.textDecoration;

	const blockProps = useBlockProps({
		className: classNames( className, {
			'items-justified-right': justifyContent === 'right',
			'items-justified-space-between': justifyContent === 'space-between',
			'items-justified-left': justifyContent === 'left',
			'items-justified-center': justifyContent === 'center',
			'is-vertical': orientation === 'vertical',
			'no-wrap': flexWrap === 'nowrap',
		} ),
		style: {
			color: ! textColor?.slug && textColor?.color,
			backgroundColor: ! backgroundColor?.slug && backgroundColor?.color,
		},
	});


	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: 'horizontal' === orientation ? ['prc-block/taxonomy-menu-link'] : (allowedBlocks || ALLOWED_BLOCKS),
		orientation,
	});

	console.log('Client ID: ', clientId);

	return (
		<Fragment>
			<Controls {...{
				attributes,
				setAttributes,
				colors: {
					textColor,
					setTextColor,
					backgroundColor,
					setBackgroundColor,
					borderColor,
					setBorderColor,
				},
				context
			}}
			/>
			<div {...innerBlocksProps} />
		</Fragment>
	);
}

export default withColors(
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ borderColor: 'color' },
)(Edit);
