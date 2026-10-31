/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	const { disableLazyLoading, enableSharing } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Sharing')}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Allow visitors to share this image')}
						checked={!!enableSharing}
						onChange={(value) =>
							setAttributes({ enableSharing: value })
						}
						help={__(
							'Shows a share button on hover with Facebook, X, Threads, Bluesky, and download options. Shared links point to this page.'
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={__('Disable Lazy Loading')}
					checked={disableLazyLoading}
					onChange={() =>
						setAttributes({
							disableLazyLoading: !disableLazyLoading,
						})
					}
					help={
						disableLazyLoading
							? __(
									'Lazy loading is disabled. This image will load "eagerly".'
								)
							: __('Lazy loading is enabled.')
					}
				/>
			</InspectorAdvancedControls>
		</>
	);
}
