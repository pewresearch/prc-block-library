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
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-menu-link'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                    Properties passed to the function.
 * @param {Object}   props.attributes         Available block attributes.
 * @param            props.className
 * @param            props.clientId
 * @param            props.context
 * @param            props.isSelected
 * @param            props.textColor
 * @param            props.setTextColor
 * @param            props.backgroundColor
 * @param            props.setBackgroundColor
 * @param            props.borderColor
 * @param            props.setBorderColor
 * @param {Function} props.setAttributes      Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
function Edit({
	attributes,
	setAttributes,
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
		className,
		templateLock,
		layout: {
			justifyContent,
			orientation = 'horizontal',
			flexWrap = 'wrap',
		} = {},
		allowedBlocks,
	} = attributes;

	const isSecondaryStyle =
		className && className.includes('is-style-secondary');

	console.log('classNames??', className, borderColor, flexWrap);

	const blockProps = useBlockProps({
		className: classNames(className, {
			'items-justified-right': justifyContent === 'right',
			'items-justified-space-between': justifyContent === 'space-between',
			'items-justified-left': justifyContent === 'left',
			'items-justified-center': justifyContent === 'center',
			'is-vertical': orientation === 'vertical',
			'is-horizontal': orientation === 'horizontal',
			'no-wrap': flexWrap === 'nowrap',
			'has-border-color': isSecondaryStyle && !!borderColor,
			[getColorClassName('border-color', borderColor.slug)]:
				isSecondaryStyle && !!borderColor,
		}),
	});

	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
		orientation,
	});

	console.log('Client ID: ', clientId);

	return (
		<Fragment>
			<Controls
				{...{
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
					context,
				}}
			/>
			<div {...innerBlocksProps} />
		</Fragment>
	);
}

export default withColors(
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ borderColor: 'color' }
)(Edit);
