/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import classNames from 'classnames';
import { icons, Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	getColorClassName,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useMergeRefs } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';

// Allow only this block to be inserted into the inner blocks.
const ALLOWED_BLOCKS = ['prc-block/taxonomy-menu-link'];

/**
 * Converts a spacing preset into a custom value.
 * Function from @wordpress/block-editor/src/components/spacing-control/utils.js
 *
 * @param {string} value Value to convert.
 *
 * @return {string} CSS var string for given spacing preset value.
 */
export function getSpacingPresetCssVar(value) {
	if (!value) {
		return null;
	}

	const slug = value.match(/var:preset\|spacing\|(.+)/);

	if (!slug) {
		return value;
	}

	return `var(--wp--preset--spacing--${slug[1]})`;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                   Properties passed to the function.
 * @param {Object}   props.attributes        Available block attributes.
 * @param            props.className
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param            props.insertBlocksAfter
 * @param {Function} props.setAttributes     Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	insertBlocksAfter,
}) {
	// eslint-disable-next-line prettier/prettier, object-curly-newline
	const { allowedBlocks, className, label, enableSubMenu, style } = attributes;
	const [subMenuIsOpen, toggleSubMenu] = useState(false);

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const listItemRef = useRef(null);

	const { textColor } = context;
	const blockGap = style?.spacing?.blockGap || 'var:preset|spacing|30';

	const blockProps = useBlockProps({
		ref: useMergeRefs([setPopoverAnchor, listItemRef]),
		className: classNames(className, {
			'has-text-color': !!textColor,
			[getColorClassName('color', textColor)]: !!textColor,
			'is-active': subMenuIsOpen,
		}),
	});

	const { insertBlock } = useDispatch(blockEditorStore);

	const subMenuStyle = {
		gap: getSpacingPresetCssVar(blockGap),
	};

	const plusIcon =
		'is-style-sub-expand' === className
			? icons.faPlus
			: icons.faCirclePlusThin;
	const minusIcion =
		'is-style-sub-expand' === className
			? icons.faMinus
			: icons.faCircleMinusThin;

	// By defining a allowedBlocks attribute any block can
	// now customize what inner blocks are allowed.
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classNames(
				'wp-block-prc-block-taxonomy-menu-link__sub-menu'
			),
			style: {
				...subMenuStyle,
			},
		},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
		}
	);

	const allowedFormats =
		'is-style-sub-heading' === className
			? []
			: ['core/bold', 'core/italic'];

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					isSelected,
					context,
					clientId,
					popoverAnchor,
				}}
			/>
			<div {...blockProps}>
				{'is-style-sub-expand' === className && (
					<span className="wp-block-prc-block-taxonomy-menu-link__label">
						{subMenuIsOpen ? 'Less' : 'More'}
					</span>
				)}
				{'is-style-sub-expand' !== className && (
					<RichText
						tagName="span"
						className="wp-block-prc-block-taxonomy-menu-link__label"
						value={label}
						onChange={(newLabel) =>
							setAttributes({ label: newLabel })
						}
						placeholder={__('Add Label', 'prc-block-library')}
						allowedFormats={allowedFormats}
						multiline={false}
						disableLineBreaks
						__unstableOnSplitAtEnd={() => {
							const newBlock = createBlock(
								'prc-block/taxonomy-menu-link'
							);
							if (enableSubMenu) {
								// Insert in this menu
								insertBlock(newBlock, undefined, clientId);
							} else {
								// Insert after this menu
								insertBlocksAfter(newBlock);
							}
						}}
					/>
				)}
				{'is-style-sub-heading' === className && (
					<Icon icon={icons.faChevronRight} size="xs" />
				)}
				{enableSubMenu && (
					<Fragment>
						<button
							className="wp-block-prc-block-taxonomy-menu-link__icon wp-block-prc-block-taxonomy-menu-link__toggle"
							onClick={() => toggleSubMenu(!subMenuIsOpen)}
							type="button"
						>
							<Icon
								icon={subMenuIsOpen ? minusIcion : plusIcon}
								size={
									'is-style-sub-expand' === className
										? 'xs'
										: null
								}
							/>
						</button>
						<div {...innerBlocksProps} />
					</Fragment>
				)}
			</div>
		</Fragment>
	);
}
