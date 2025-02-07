/**
 * External Dependencies
 */
import { useDeviceBoundAttribute } from '@prc/hooks';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalUnitControl as UnitControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useEffect, useMemo } from '@wordpress/element';

export default function MaxWidthControls({
	attributes,
	setAttributes,
	clientId,
}) {
	const { style = {} } = attributes;
	const { layout = {} } = style;
	const { selfStretch } = layout;

	const [maxWidth, setMaxWidth] = useDeviceBoundAttribute(
		clientId,
		'maxWidth'
	);

	const inputId = useInstanceId(UnitControl, 'max-width-input');

	const units = useCustomUnits({
		availableUnits: ['px', '%'],
		defaultValues: {
			px: 240,
			'%': 100,
		},
	});

	// Clear maxWidth when selfStretch is fixed.
	useEffect(() => {
		if ('fixed' === selfStretch) {
			setAttributes({ maxWidth: undefined });
		}
	}, [selfStretch]);

	if ('fixed' === selfStretch) {
		return null;
	}

	return (
		<InspectorControls group="dimensions">
			<ToolsPanelItem
				label={__('Max Width')}
				hasValue={() =>
					attributes.maxWidth &&
					typeof attributes.maxWidth === 'object' &&
					attributes.maxWidth.desktop !== null
				}
				onDeselect={() => setAttributes({ maxWidth: undefined })}
				resetAllFilter={() => setAttributes({ maxWidth: undefined })}
				panelId={clientId}
				style={{
					gridRow: '5',
				}}
			>
				<UnitControl
					id={inputId}
					isResetValueOnUnitChange
					min={0}
					onChange={(value) => setMaxWidth(value)}
					value={maxWidth}
					units={units}
					label={__('Max Width')}
					__next40pxDefaultSize
				/>
			</ToolsPanelItem>
		</InspectorControls>
	);
}
