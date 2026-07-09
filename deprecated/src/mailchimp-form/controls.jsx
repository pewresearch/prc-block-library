/**
 * External Dependencies
 */
import { MailchimpSegmentSelect } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { interest, mailchimpFormId } = attributes;
	return (
		<>
			<BlockControls>
				<MailchimpSegmentSelect
					label="Choose Newsletter Segment"
					value={interest}
					onChange={(newInterestId) => {
						console.log('Toolbar Dropdown', newInterestId);
						setAttributes({ interest: newInterestId });
					}}
					apiKey="mailchimp-form"
					renderAs="toolbar-dropdown"
				/>
			</BlockControls>
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
					<PanelRow>
						<TextControl
							label={__(
								'Mailchimp form ID (FIRSTFORM)',
								'mailchimp-form'
							)}
							help={__(
								'Optional. Sent as the FIRSTFORM merge field when the audience has that tag configured. HTML anchors are not used for tracking.',
								'mailchimp-form'
							)}
							value={mailchimpFormId || ''}
							onChange={(value) =>
								setAttributes({ mailchimpFormId: value })
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
