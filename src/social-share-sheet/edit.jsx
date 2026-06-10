/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * External Dependencies
 */
import { IconPicker } from '@prc/components';
import { getBlockGapSupportValue } from '@prc/functions';
import { Icon } from '@prc/icons';
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	AlignmentControl,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context object with the block's context values.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {boolean}  props.isSelected    Whether or not the block is currently selected.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	isSelected,
	context,
	clientId,
}) {
	const {
		label,
		textAlign,
		iconLibrary = 'solid',
		iconName = 'share',
		iconPosition = 'right',
	} = attributes;
	const blockProps = useBlockProps({
		className: clsx({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
		style: {
			'--block-gap': getBlockGapSupportValue(attributes),
		},
	});
	const { iconColor, iconBackgroundColor } = context;

	const hasTextColor = attributes.textColor || attributes.style?.color?.text;
	const hasBackgroundColor =
		attributes.backgroundColor || attributes.style?.color?.background;

	const showLabel = label || isSelected;

	// get the allowedBlocks for the parent block...
	const allowedBlocks = useSelect(
		(select) => {
			/// get the parent block id...
			const parentClientId =
				select('core/block-editor').getBlockHierarchyRootClientId(
					clientId
				);
			const parentBlock =
				select('core/block-editor').getBlock(parentClientId);
			// check if parentBlock is core/social-links
			if (parentBlock.name !== 'core/social-links') {
				return ['core/social-link'];
			}
			return select('core/block-editor').getAllowedBlocks(parentClientId);
		},
		[clientId]
	);
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks,
			orientation: 'horizontal',
		}
	);

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Icon')} initialOpen>
					<IconPicker
						library={iconLibrary}
						icon={iconName}
						position={iconPosition}
						onChange={(next) => {
							const update = {};
							if ('library' in next) {
								update.iconLibrary = next.library;
							}
							if ('icon' in next) {
								update.iconName = next.icon;
							}
							if ('position' in next) {
								update.iconPosition = next.position;
							}
							setAttributes(update);
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
					}}
					className={clsx({
						[`has-${iconColor}-color`]: iconColor && !hasTextColor,
						[`has-${iconBackgroundColor}-background-color`]:
							iconBackgroundColor && !hasBackgroundColor,
					})}
				>
					{iconPosition === 'left' && (
						<Icon library={iconLibrary} icon={iconName} />
					)}
					{showLabel && (
						<RichText
							className="wp-block-prc-block-social-share-sheet__label"
							tagName="span"
							value={label}
							onChange={(value) =>
								setAttributes({ label: value })
							}
							placeholder="Share"
							allowedFormats={['core/bold', 'core/italic']}
						/>
					)}
					{iconPosition === 'right' && (
						<Icon library={iconLibrary} icon={iconName} />
					)}
				</button>
				<div {...innerBlocksProps}></div>
			</div>
		</>
	);
}
