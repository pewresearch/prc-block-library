/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	getColorClassName,
	withColors,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import { ReactComponent as Icon } from '../assets/icon-caret-down.svg';

const ALLOWED_BLOCKS = ['core/group', 'prc-block/mega-menu-content'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                      Properties passed to the function.
 * @param {Object}   props.attributes           Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param            props.insertBlocksAfter
 * @param            props.activeColor
 * @param            props.setActiveColor
 * @param            props.activeBorderColor
 * @param            props.setActiveBorderColor
 * @param {Function} props.setAttributes        Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	insertBlocksAfter,
	activeColor,
	setActiveColor,
	activeBorderColor,
	setActiveBorderColor,
}) {
	const { className, label } = attributes;

	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);

	const menuActiveColor = context['menu/activeColor'];

	const activeC = activeColor?.slug || menuActiveColor;

	const blockProps = useBlockProps({
		className: classNames(className, {
			'is-active': isOpen,
			'has-active-color': !!activeC,
			[getColorClassName('active-color', activeC)]: !!activeC,
			'has-active-border-color':
				!!activeBorderColor.color || activeBorderColor?.class,
			[getColorClassName('active-border-color', activeBorderColor?.slug)]:
				!!activeBorderColor?.slug,
		}),
	});

	const labelClassNames = 'wp-block-prc-block-menu-link__label';

	const allowedFormats = ['core/bold', 'core/italic'];

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classNames(
				'wp-block-prc-block-mega-menu__inner-container',
				{
					'has-background': !!activeC,
					[getColorClassName('background-color', activeC)]: !!activeC,
				}
			),
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'vertical',
			template: [['prc-block/mega-menu-content', {}]],
		}
	);

	return (
		<Fragment>
			<Controls
				{...{
					activeColor,
					setActiveColor,
					activeBorderColor,
					setActiveBorderColor,
				}}
			/>
			<div {...blockProps}>
				<div className={labelClassNames}>
					<RichText
						tagName="span"
						value={label}
						onChange={(newLabel) =>
							setAttributes({ label: newLabel })
						}
						placeholder={__('Add Label', 'prc-block-library')}
						allowedFormats={allowedFormats}
						multiline={false}
						disableLineBreaks
						__unstableOnSplitAtEnd={() => {
							const newBlock = createBlock('prc-block/menu-link');
							insertBlocksAfter(newBlock);
						}}
					/>
					<button
						onClick={toggleOpen}
						className="wp-block-prc-block-mega-menu__toggle"
						type="button"
					>
						<Icon />
					</button>
				</div>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
}

export default withColors({
	activeColor: 'color',
	activeBorderColor: 'color',
})(Edit);
