/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */

export default function InspectorPanel({
	attributes,
	setAttributes,
	clientId,
}) {
	return (
		<InspectorControls>
			<PanelBody title="Block Controls">
				<p>Timeline Creation and Management Controls Here</p>
			</PanelBody>
		</InspectorControls>
	);
}
