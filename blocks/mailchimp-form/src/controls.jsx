/**
 * External Dependencies
 */
import { MailchimpSegmentSelect } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { interest } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Mailchimp Form Options')}>
				<PanelRow>
					<MailchimpSegmentSelect
						label="Choose Newsletter Segment"
						value={interest}
						onChange={(newInterestId) => {
							setAttributes({ interest: newInterestId });
						}}
						apiKey="mailchimp-form"
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}
