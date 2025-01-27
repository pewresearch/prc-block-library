/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	const { disableLazyLoading } = attributes;

	return (
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
	);
}
