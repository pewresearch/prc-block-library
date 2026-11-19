/**
 * Link click tracking controls for core/group.
 *
 * The editor picks one analytics service and an event name. On the front end
 * every link click inside the group sends that event (see ../view.js).
 */

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import {
	DEFAULT_EVENT_NAME,
	normalizeEventName,
} from '../utils/link-tracking-event';

const SERVICE_OPTIONS = [
	{ label: __('None', 'core-group'), value: '' },
	{ label: __('Parse.ly', 'core-group'), value: 'parsely' },
	{ label: __('Google Analytics', 'core-group'), value: 'google-analytics' },
];

function getEventNameHelp(service, eventName) {
	const name = eventName || DEFAULT_EVENT_NAME;
	if ('parsely' === service) {
		return sprintf(
			/* translators: %s: Parse.ly action name. */
			__(
				'Lowercase letters, numbers and underscores. Sent as the Parse.ly action "%s". Custom events show only in the Parse.ly Raw Data Pipeline.',
				'core-group'
			),
			`_${name}`
		);
	}
	return sprintf(
		/* translators: %s: Google Analytics event name. */
		__(
			'Lowercase letters, numbers and underscores. Sent as the Google Analytics event "%s".',
			'core-group'
		),
		name
	);
}

export default function LinkTrackingControls({ attributes, setAttributes }) {
	const { linkTrackingService, linkTrackingKey } = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Link click tracking', 'core-group')}
				initialOpen={!!linkTrackingService}
			>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Send link clicks to', 'core-group')}
					value={linkTrackingService || ''}
					options={SERVICE_OPTIONS}
					onChange={(value) =>
						setAttributes({ linkTrackingService: value })
					}
				/>
				{!!linkTrackingService && (
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Event name', 'core-group')}
						value={linkTrackingKey || ''}
						placeholder={DEFAULT_EVENT_NAME}
						help={getEventNameHelp(
							linkTrackingService,
							linkTrackingKey
						)}
						onChange={(value) =>
							setAttributes({
								linkTrackingKey: normalizeEventName(value),
							})
						}
					/>
				)}
			</PanelBody>
		</InspectorControls>
	);
}
