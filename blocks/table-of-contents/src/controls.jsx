/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import { Notice, PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { BaseControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import ColorControls from './color-controls';

export default function Controls({
	attributes,
	setAttributes,
	colors,
	clientId,
}) {
	const { showCurrentChapter, hideHeading, className, autoDropdownWidth, autoDropdownEnabled } = attributes;

	return (
		<Fragment>
			<ColorControls {...{
				attributes,
				colors,
				clientId,
			}} />
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
