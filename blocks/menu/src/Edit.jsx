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
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = [
	'prc-block/menu-link',
	'prc-block/mega-menu-controller',
	'core/block',
];

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
 * @param            props.activeColor
 * @param            props.setActiveColor
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
	activeColor,
	setActiveColor,
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

	const blockProps = useBlockProps({
		className: classNames(className, {
			'items-justified-right': justifyContent === 'right',
			'items-justified-space-between': justifyContent === 'space-between',
			'items-justified-left': justifyContent === 'left',
			'items-justified-center': justifyContent === 'center',
			'is-vertical': orientation === 'vertical',
			'is-horizontal': orientation === 'horizontal',
			'no-wrap': flexWrap === 'nowrap',
			'has-active': activeColor?.color,
			'has-border': borderColor?.color,
			'has-background': backgroundColor?.color,
			'has-text': textColor?.color,
		}),
		style: {
			'--menu--active-color': `var(--wp--preset--color--${activeColor?.slug})`,
			'--menu--border-color': `var(--wp--preset--color--${borderColor?.slug})`,
			'--menu--text-color': `var(--wp--preset--color--${textColor?.slug})`,
			'--menu--background-color': `var(--wp--preset--color--${backgroundColor?.slug})`,
		},
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
						activeColor,
						setActiveColor,
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
	{ activeColor: 'color' },
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ borderColor: 'color' }
)(Edit);
