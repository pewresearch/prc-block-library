/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */
import { POST_TYPE, POST_TYPE_LABEL } from './constants';

function InspectorPanel( { attributes, setAttributes } ) {
	const { ref } = attributes;
	const [ title, setTitle ] = useEntityProp(
		'postType',
		POST_TYPE,
		'title',
		ref
	);
	const [ permalink ] = useEntityProp( 'postType', POST_TYPE, 'link', ref );
	return (
		<InspectorControls>
			<PanelBody title="Entity Info">
				<div>
					<TextControl
						__nextHasNoMarginBottom
						label={ __( `${ POST_TYPE_LABEL } Title` ) }
						value={ title }
						onChange={ setTitle }
					/>
					<ExternalLink href={ permalink }>
						Open { POST_TYPE_LABEL.toLowerCase() } in new window
					</ExternalLink>
				</div>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls( { attributes, setAttributes, context } ) {
	return (
		<Fragment>
			<InspectorPanel { ...{ attributes, setAttributes, context } } />
		</Fragment>
	);
}
