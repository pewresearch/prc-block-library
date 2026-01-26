/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl, PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Core Tabs Controls Extension
 *
 * This component extends the base tabs block with additional functionality through
 * the WordPress block filters pattern. Add new control panels here as needed.
 *
 * To add new functionality:
 * 1. Add attributes in index.js -> addAttributes()
 * 2. Add control panels here as <PanelBody> components
 * 3. Add corresponding PHP render logic in class-core-tabs.php
 * 4. Add frontend behavior in view.js
 *
 * @param {Object}   props               Component props
 * @param {Object}   props.attributes    Block attributes
 * @param {Function} props.setAttributes Function to update attributes
 */
export default function Controls({ attributes, setAttributes }) {
	const { mobileDropdown, mobileDropdownWidth } = attributes;

	return (
		<InspectorControls>
			{/* Mobile Dropdown Settings */}
			<PanelBody title={__('Settings', 'prc-block-library')}>
				<ToggleControl
					label={__('Mobile Dropdown', 'prc-block-library')}
					help={__(
						'Convert tabs to a dropdown on mobile devices',
						'prc-block-library'
					)}
					checked={mobileDropdown}
					onChange={(value) =>
						setAttributes({
							mobileDropdown: value,
						})
					}
					__nextHasNoMarginBottom
				/>
				{mobileDropdown && (
					<RangeControl
						label={__(
							'Mobile Breakpoint (px)',
							'prc-block-library'
						)}
						help={__(
							'Convert to dropdown when the screen width is less than this value',
							'prc-block-library'
						)}
						value={mobileDropdownWidth}
						onChange={(value) =>
							setAttributes({
								mobileDropdownWidth: value,
							})
						}
						min={320}
						max={1024}
						step={1}
					/>
				)}
			</PanelBody>
		</InspectorControls>
	);
}
