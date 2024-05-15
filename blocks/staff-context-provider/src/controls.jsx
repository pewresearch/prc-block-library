/**
 * External Dependencies
 */
import { WPEntitySearch } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

export default function Controls({ staffId, setAttributes }) {
	return (
		<InspectorControls>
			<PanelBody title={__('Staff Context Provider')}>
				<WPEntitySearch
					placeholder="Search for Staff"
					searchLabel="Search for Staff"
					entityType="postType"
					entitySubType="staff"
					onSelect={(entity) => {
						console.log('Staff: ', entity);
						setAttributes({
							staffSlug: entity.slug,
						});
					}}
					onKeyEnter={() => {
						console.log('Enter Key Pressed');
					}}
					onKeyESC={() => {
						console.log('ESC Key Pressed');
					}}
					perPage={5}
					showExcerpt={false}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
