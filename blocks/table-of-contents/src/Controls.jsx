/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	const { showCurrentChapter } = attributes;

	return (
		<InspectorAdvancedControls>
			<ToggleControl
				label={__('Highlight Current Chapter')}
				checked={showCurrentChapter}
				onChange={() => {
					setAttributes({ showCurrentChapter: !showCurrentChapter });
				}}
				help={__(
					'Highlight the current chapter in the table of contents when scrolling.',
					'prc-block-library',
				)}
			/>
		</InspectorAdvancedControls>
	);
}
