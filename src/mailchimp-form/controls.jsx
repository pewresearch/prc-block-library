/**
 * External Dependencies
 */
import { mailChimpInterests } from '@prc-app/shared';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { interest } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Mailchimp Form Options')}>
				<PanelRow>
					<SelectControl
						label="Choose Newsletter"
						value={interest}
						options={mailChimpInterests}
						onChange={(id) => {
							setAttributes({ interest: id });
						}}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}
