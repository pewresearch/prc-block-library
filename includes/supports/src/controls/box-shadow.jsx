/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalToolsPanelItem as ToolsPanelItem,
	ToggleControl
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useEffect, useMemo } from '@wordpress/element';

export default function BoxShadowControls({
	attributes,
	setAttributes,
	clientId,
}) {
	const { style = {}, isStuckBoxShadow = false } = attributes;
	const { shadow, position } = style;
	const { type } = position || {};

	const isSticky = useMemo(() => 'sticky' === type, [type]);
	const hasShadow = useMemo(() => !!shadow, [shadow]);

	// Generate a unique ID for the ToggleControl input.
	const inputId = useInstanceId(ToggleControl, 'box-shadow-sticky-toggle');

	// Clear isStuckBoxShadow when attributes.style.position?.type is not 'sticky' and when there is no shadow.
	useEffect(() => {
		if (('sticky' !== type || !hasShadow) && isStuckBoxShadow) {
			setAttributes({ isStuckBoxShadow: false });
		}
	}, [type, hasShadow, isStuckBoxShadow]);

	if (!hasShadow || !isSticky) {
		return null;
	}

	return (
		<InspectorControls group="border">
			<div style={{ gridColumn: '1 / -1' }}>
				<ToggleControl
					label={__('Stuck Box Shadow', 'prc-block-library')}
					help={
						isStuckBoxShadow
							? __(
									'Apply box shadow only when the block is stuck.',
									'prc-block-library'
							  )
							: __(
									'Always apply box shadow.',
									'prc-block-library'
							  )
					}
					checked={isStuckBoxShadow}
					onChange={(value) =>
						setAttributes({ isStuckBoxShadow: value })
					}
					id={inputId}
				/>
			</div>
		</InspectorControls>
	);
}
