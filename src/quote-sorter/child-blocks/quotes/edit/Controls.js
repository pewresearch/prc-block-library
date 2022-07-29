/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';

function Controls({ attributes, setAttributes }) {
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Quote Wall Styles and Copy')}>
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
