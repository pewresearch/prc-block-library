/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	InspectorAdvancedControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';

// eslint-disable-next-line no-undef
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
					<PanelColorSettings
						__experimentalHasMultipleOrigins
						__experimentalIsRenderedInSidebar
						title={__('Quote art color')}
						initialOpen
						colorSettings={[
							{
								value: attributes.quoteArtColor,
								onChange: (value) => setAttributes({ quoteArtColor: value }),
								label: __('Color'),
							},
						]}
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
			</InspectorControls>
			<InspectorAdvancedControls />
		</Fragment>
	);
}

export default Controls;
