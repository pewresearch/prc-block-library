/**
 * WordPress Dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Controls({ attributes, setAttributes }) {
	const { vertical } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Tabs Layout')}>
				<ToggleControl
					label="Vertical Orientation"
					checked={vertical}
					onChange={() => {
						setAttributes({ vertical: !vertical });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Controls;
