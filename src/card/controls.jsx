/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	PanelBody,
	ColorIndicator,
	RangeControl
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import {
	ContrastChecker,
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

function ContrastCheckerMatrix({attributes}) {
	const {
		className,
		fontSize,
		headingBackgroundColor,
		customHeadingBackgroundColor,
		headingTextColor,
		customHeadingTextColor,
	} = attributes;

	const headingBackground = useMemo(() => {
		if (headingBackgroundColor?.color) {
			return headingBackgroundColor.color;
		}
		return customHeadingBackgroundColor;
	}, [headingBackgroundColor, customHeadingBackgroundColor, className]);

	const headingText = useMemo(() => {
		if (headingTextColor?.color) {
			return headingTextColor.color;
		}
		return customHeadingTextColor;
	}, [headingTextColor, customHeadingTextColor]);

	return(
		<>
			<ContrastChecker
				backgroundColor={headingBackground}
				fontSize={fontSize}
				textColor={headingText}
			/>
		</>
	);
}

export default function Controls( {
	attributes,
	setAttributes,
	clientId,
	headingBackgroundColor,
	setHeadingBackgroundColor,
	headingTextColor,
	setHeadingTextColor,
} ) {
	const {
		customHeadingBackgroundColor,
		customHeadingTextColor,
	} = attributes;
	/**
	 * Get the color settings for the block.
	 */
	const colorSettings = useMultipleOriginColorsAndGradients();

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ [
						{
							label: __( 'Heading Background' ),
							colorValue:
								headingBackgroundColor?.color ?? customHeadingBackgroundColor,
							onColorChange: ( value ) => {
								setHeadingBackgroundColor( value );
								setAttributes( {
									customHeadingBackgroundColor: value,
								} );
							},
						},
						{
							label: __( 'Heading Text' ),
							colorValue:
								headingTextColor?.color ?? customHeadingTextColor,
							onColorChange: ( value ) => {
								setHeadingTextColor( value );
								setAttributes( {
									customHeadingTextColor: value,
								} );
							},
						},
					] }
					panelId={ clientId }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorSettings }
				/>
				<ContrastCheckerMatrix attributes={attributes} />
			</InspectorControls>
		</>
	);
}
