/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useMemo } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	withColors,
	RichText,
} from '@wordpress/block-editor';
import { ResizableBox } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED_BLOCKS = ['core/group', 'core/paragraph'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                     Properties passed to the function.
 * @param {Object}   props.attributes          Available block attributes.
 * @param {Function} props.setAttributes       Function that updates individual attributes.
 * @param {Object}   props.context             Context object with the block's context values.
 * @param {string}   props.clientId            Unique ID of the block.
 * @param            props.buttonBackground
 * @param            props.setButtonBackground
 * @param            props.buttonColor
 * @param            props.setButtonColor
 * @param {boolean}  props.isSelected          Whether or not the block is currently selected.
 *
 * @return {WPElement} Element to render.
 */
function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	buttonBackground,
	setButtonBackground,
	buttonColor,
	setButtonColor,
}) {
	const { deviceType } = useSelect((select) => {
		const type = select('core/editor').getDeviceType();
		// make type lowercase
		return {
			deviceType: type.toLowerCase(),
		};
	}, []);
	const [isExpanded, toggleExpansion] = useState(false);
	const [isResizing, toggleResizing] = useState(false);

	const {
		allowedBlocks,
		customButtonBackground,
		customButtonColor,
		heights,
		showLabel,
		hideLabel,
	} = attributes;

	const targetHeight = useMemo(() => {
		return heights?.[deviceType] || 0;
	}, [heights, deviceType]);

	const setHeight = (device, newHeight) => {
		setAttributes({
			heights: {
				...heights,
				[device]: parseInt(targetHeight + newHeight, 10),
			},
		});
	};

	const blockProps = useBlockProps({
		className: classnames({
			'is-expanded': isExpanded,
			'is-resizing': isResizing,
		}),
		style: {
			'--collapsed-height': `${targetHeight}px`,
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'prc-show-more__inner-blocks',
		},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
			renderAppender: isResizing ? false : undefined,
		}
	);

	const buttonLabel = useMemo(() => {
		return isExpanded ? hideLabel : showLabel;
	}, [showLabel, hideLabel, isExpanded]);

	const buttonSupportingStyles = useMemo(() => {
		const styles = {};
		if (customButtonBackground) {
			if (customButtonBackground.slug) {
				styles['--button-background-color'] =
					`var( --wp--preset--color--${customButtonBackground.slug} );`;
			} else {
				styles['--button-background-color'] = customButtonBackground;
			}
		}

		if (customButtonColor) {
			if (customButtonColor.slug) {
				styles['--button-color'] =
					`var( --wp--preset--color--${customButtonColor.slug} );`;
			} else {
				styles['--button-color'] = customButtonColor;
			}
		}

		return styles;
	}, [customButtonBackground, customButtonColor]);

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					isResizing,
					isExpanded,
					toggleResizing,
					clientId,
					buttonBackground,
					setButtonBackground,
					buttonColor,
					setButtonColor,
				}}
			/>
			<div {...blockProps}>
				<ResizableBox
					size={{
						height: isExpanded ? 'auto' : targetHeight,
					}}
					minHeight="50"
					minWidth="50"
					__experimentalShowTooltip={true}
					__experimentalTooltipProps={{
						showPx: true,
						fadeTimeout: 1000,
					}}
					enable={
						!isExpanded
							? {
									top: false,
									right: false,
									bottom: isResizing,
									left: false,
									topRight: false,
									bottomRight: false,
									bottomLeft: false,
									topLeft: false,
								}
							: false
					}
					onResizeStop={(event, direction, elt, delta) => {
						setHeight(deviceType, delta.height);
					}}
				>
					<div {...innerBlocksProps}></div>
				</ResizableBox>
				<button
					type="button"
					className="prc-show-more__expand-button"
					onClick={() => {
						toggleExpansion(!isExpanded);
					}}
					style={buttonSupportingStyles}
				>
					<span hidden={isExpanded}>
						<Icon library="light" icon="circle-plus" />
					</span>
					<span hidden={!isExpanded}>
						<Icon library="light" icon="circle-minus" />
					</span>
					<RichText
						className="prc-show-more__expand-button__label"
						tagName="span"
						onChange={(value) => {
							if (!isExpanded) {
								setAttributes({ showLabel: value });
							} else {
								setAttributes({ hideLabel: value });
							}
						}}
						placeholder={__('Show More')}
						value={buttonLabel}
						withoutInteractiveFormatting
					/>
				</button>
			</div>
		</Fragment>
	);
}

export default withColors('buttonBackground', 'buttonColor')(Edit);
