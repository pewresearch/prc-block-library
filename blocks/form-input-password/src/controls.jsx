/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { placeholder, includesConfirmation, confirmationPlaceholder } =
		attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Form Password Field Settings')}>
				<ToggleControl
					label="Include confirmation field and password strength meter"
					checked={includesConfirmation}
					onChange={(val) => {
						setAttributes({
							includesConfirmation: val,
						});
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
