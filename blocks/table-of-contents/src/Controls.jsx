/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import { Notice, PanelBody, RangeControl } from '@wordpress/components';
import {
	InspectorControls,
	BlockControls,
	PanelColorSettings,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	colors
}) {
	const { showCurrentChapter, hideHeading, className } = attributes;

	const colorSettings = useMemo(() => {
		const {
			textColor,
			setTextColor,
			backgroundColor,
			setBackgroundColor,
			dropdownBackgroundColor,
			setDropdownBackgroundColor,
			dropdownTextColor,
			setDropdownTextColor,
			headingBackgroundColor,
			setHeadingBackgroundColor,
			headingTextColor,
			setHeadingTextColor,
		} = colors;

		const t = [
			{
				value: dropdownTextColor?.color,
				onChange: setDropdownTextColor,
				label: __('(Mobile) Dropdown Text'),
			},
			{
				value: dropdownBackgroundColor?.color,
				onChange: setDropdownBackgroundColor,
				label: __('(Mobile) Dropdown Background'),
			},
			{
				value: headingTextColor?.color,
				onChange: setHeadingTextColor,
				label: __('(Desktop) Heading Text'),
			},
			{
				value: headingBackgroundColor?.color,
				onChange: setHeadingBackgroundColor,
				label: __('(Desktop) Heading Background'),
			},
			{
				value: textColor?.color,
				onChange: setTextColor,
				label: __('Text'),
			},
			{
				value: backgroundColor?.color,
				onChange: setBackgroundColor,
				label: __('Background'),
			},
		];
		if ( 'is-style-dropdown' === className ) {
			// change the label of the first item to just be "Dropdown Text" and the second to just be "Dropdown Background", remove the 3rd and 4th items.
			t[0].label = __('Dropdown Text');
			t[1].label = __('Dropdown Background');
			t.splice(2, 2);
		}
		return t;
	}, [colors, className]);

	return (
		<Fragment>
			<InspectorControls group="styles">
				<PanelColorSettings
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					title={__('Color')}
					disableCustomColors
					colorSettings={colorSettings}
				/>
			</InspectorControls>
			<InspectorControls>
				<PanelBody title={__('Settings', 'prc-block-library')}>
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
					{'is-style-default' === className && (
						<ToggleControl
							label={__('Hide Heading')}
							checked={hideHeading}
							onChange={() => {
								setAttributes({ hideHeading: !hideHeading });
							}}
							help={__(
								'Hide the heading from the front end when in "Baseball Card" style.',
								'prc-block-library',
							)}
						/>
					)}
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
