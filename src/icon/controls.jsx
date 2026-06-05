/**
 * External Dependencies
 */
import { IconPicker } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

function InspectorPanel({ attributes, setAttributes }) {
	const { library, icon, size } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Block Controls')}>
				<IconPicker
					library={library}
					icon={icon}
					showPosition={false}
					onChange={(next) => {
						const update = {};
						if ('library' in next) {
							update.library = next.library;
						}
						if ('icon' in next) {
							update.icon = next.icon;
						}
						setAttributes(update);
					}}
				/>
				<NumberControl
					label={__('Size (in em)')}
					value={size}
					min={0.1}
					step={0.1}
					onChange={(val) =>
						setAttributes({ size: parseFloat(val) || 1 })
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes }) {
	return <InspectorPanel {...{ attributes, setAttributes }} />;
}
