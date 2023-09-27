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
import { BaseControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';

export default function Controls({
	attributes,
	setAttributes,
	colors
}) {
	const { showCurrentChapter, hideHeading, className, autoDropdownWidth, autoDropdownEnabled } = attributes;

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
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor
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
			{
				value: activeTextColor?.color,
				onChange: setActiveTextColor,
				label: __('Active Text'),
			},
			{
				value: activeBackgroundColor?.color,
				onChange: setActiveBackgroundColor,
				label: __('Active Background'),
			},
			{
				value: hoverTextColor?.color,
				onChange: setHoverTextColor,
				label: __('Hover Text'),
			},
			{
				value: hoverBackgroundColor?.color,
				onChange: setHoverBackgroundColor,
				label: __('Hover Background'),
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
						<Fragment>
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
							<BaseControl label={__('Auto Dropdown')} help={__(
								'Automatically switch to the dropdown style when the container is less than the specified width.',
								'prc-block-library',
							)}>
								<ToggleControl
									label={__('Enable')}
									checked={autoDropdownEnabled}
									onChange={() => {
										setAttributes({ autoDropdownEnabled: !autoDropdownEnabled });
									}}
								/>
								{autoDropdownEnabled && (
									<NumberControl
										label={__('Container Width Threshold')}
										onChange={ ( value ) => setAttributes( { autoDropdownWidth: value } ) }
										shiftStep={ 10 }
										value={ autoDropdownWidth }
									/>
								)}
							</BaseControl>
						</Fragment>
					)}
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
