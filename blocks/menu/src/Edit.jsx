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

const ALLOWED_BLOCKS = ['prc-block/menu-link', 'prc-block/mega-menu-link'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                    Properties passed to the function.
 * @param {Object}   props.attributes         Available block attributes.
 * @param {string}   props.clientId
 * @param {Object}   props.context
 * @param {boolean}  props.isSelected
 * @param {Object}   props.textColor
 * @param {Function} props.setTextColor
 * @param {Object}   props.backgroundColor
 * @param {Function} props.setBackgroundColor
 * @param {Object}   props.borderColor
 * @param {Function} props.setBorderColor
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
	} = attributes;

	const isTextStyle = className && className.includes('is-style-text');

	const blockProps = useBlockProps({
		className: classNames(className, {
			'items-justified-right': justifyContent === 'right',
			'items-justified-space-between': justifyContent === 'space-between',
			'items-justified-left': justifyContent === 'left',
			'items-justified-center': justifyContent === 'center',
			'is-vertical': orientation === 'vertical',
			'is-horizontal': orientation === 'horizontal',
			'no-wrap': flexWrap === 'nowrap',
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation,
	});

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
			<nav {...innerBlocksProps} />
		</Fragment>
	);
}

export default withColors(
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ borderColor: 'color' }
)(Edit);
