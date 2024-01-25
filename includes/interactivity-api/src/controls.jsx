// Add isInteractive toggle and interactiveContext text control to all blocks where supports.interactivity === true.

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	ExternalLink,
	TextControl,
	ToggleControl,
	PanelBody,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

function InspectorPanel( { attributes, setAttributes, clientId, context } ) {
	const {isInteractive, interactiveNamespace} = attributes;
	const namespace = interactiveNamespace || context?.interactiveNamespace;
	return (
		<InspectorControls>
			<PanelBody title={__('Interactivity API')}>
				<ToggleControl
					label={ __( 'Interactive', 'prc-block-library' ) }
					checked={ isInteractive }
					onChange={ ( isInteractive ) => setAttributes( { isInteractive } ) }
					help={ __( 'When enabled, this block leverages the @wordpress/interactivity API.', 'prc-block-library' ) }
				/>
				{ isInteractive && (
					<TextControl
						label={ __( 'Namespace', 'prc-block-library' ) }
						value={ namespace }
						onChange={ ( newNamespace ) => setAttributes( { interactiveNamespace: newNamespace } ) }
						help={ __( 'The namespace serves as a unique identifier for this block\s interactivity context, ensuring that interactions are confined within the scope of this block or its parent.', 'prc-block-library' ) }
					/>
				)}
				<ExternalLink href="https://github.com/WordPress/gutenberg/blob/trunk/packages/interactivity/docs/2-api-reference.md">API documentation</ExternalLink>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls( { attributes, setAttributes, clientId, context } ) {
	return (
		<Fragment>
			<InspectorPanel { ...{ attributes, setAttributes, clientId, context } } />
		</Fragment>
	);
}
