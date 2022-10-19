/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import {
	ColorPalette,
	PanelBody,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';

// eslint-disable-next-line no-undef
const themeSettings = JSON.parse(prcThemeJsonSettings);
function Controls({ attributes, setAttributes }) {
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Quote Wall Layout')}>
					<ToggleControl
						label={__('Include quote art')}
						help={__('Adds stylized quote icon to first quote.')}
						checked={attributes.includeQuoteArt}
						onChange={() =>
							setAttributes({ includeQuoteArt: !attributes.includeQuoteArt })
						}
					/>
					<TextareaControl
						label={__('No results message')}
						help={__(
							'This is the message displayed when a search query produces no results.',
						)}
						value={attributes.noResultsMessage}
						onChange={(value) => setAttributes({ noResultsMessage: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Quote Wall Styles')}>
					<ToggleControl
						label={__('Use custom attribution styles')}
						help={__(
							'If checked, will apply custom styling to attribution element.',
						)}
						checked={attributes.customAttributionStyles}
						onChange={() =>
							setAttributes({
								customAttributionStyles: !attributes.customAttributionStyles,
							})
						}
					/>
					<ColorPalette
						label={__('Text Color')}
						colors={themeSettings.color.palette.theme}
						color={attributes.attributionStyles.color}
						disabled={!attributes.customAttributionStyles}
						onChange={(c) =>
							setAttributes({
								attributionStyles: {
									...attributes.attributionStyles,
									color: c,
								},
							})
						}
						disableCustomColors
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls />
		</Fragment>
	);
}

export default Controls;
