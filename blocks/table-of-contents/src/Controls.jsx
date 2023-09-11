/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Notice, PanelBody, RangeControl } from '@wordpress/components';
import {
	InspectorControls,
	InspectorAdvancedControls,
	BlockControls,
	PanelColorSettings,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { ToggleControl } from '@wordpress/components';

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	colors,
}) {
	const {
		textColor,
		setTextColor,
		backgroundColor,
		setBackgroundColor,
		headingBackgroundColor,
		setHeadingBackgroundColor,
		headingTextColor,
		setHeadingTextColor,
	} = colors;

	const { showCurrentChapter } = attributes;

	return (
		<Fragment>
			<InspectorControls group="styles">
				<PanelColorSettings
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					title={__('Color')}
					disableCustomColors
					colorSettings={[
						{
							value: headingTextColor.color,
							onChange: setHeadingTextColor,
							label: __('Heading Text'),
						},
						{
							value: headingBackgroundColor.color,
							onChange: setHeadingBackgroundColor,
							label: __('Heading Background'),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __('Text'),
						},
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __('Background'),
						},
					]}
				/>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={__('Highlight Current Chapter')}
					checked={showCurrentChapter}
					onChange={() => {
						setAttributes({ showCurrentChapter: !showCurrentChapter });
					}}
					help={__(
						'Highlight the current chapter in the table of contents when scrolling.',
						'prc-block-library',
					)}
				/>
			</InspectorAdvancedControls>
		</Fragment>
	);
}
