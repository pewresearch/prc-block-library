/**
 * External Dependencies
 */
import { TaxonomySelect } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useMemo } from '@wordpress/element';
import { PanelColorSettings, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import ColorControls from './color-controls';

function InspectorPanel( { attributes, setAttributes, colors, isList, clientId } ) {
	const {perPage, taxonomy, separator} = attributes;


	return (
		<Fragment>
		<ColorControls {...{
			attributes,
			colors,
			isList,
			clientId,
		}} />
		<InspectorControls>
			<PanelBody title={__('Settings', 'prc-block-library')}>
				<RangeControl
					label="Number of Terms"
					value={ perPage }
					onChange={ ( value ) => setAttributes( {perPage: value} ) }
					min={ 1 }
					max={ 25 }
					allowReset
					resetFallbackValue={ 25 }
				/>
				{!isList && <TextControl label="Separator" value={separator} onChange={(value) => setAttributes({separator: value})} />}
			</PanelBody>
		</InspectorControls>
		</Fragment>
	);
}

export default function Controls( { attributes, setAttributes, context, colors, isList, clientId } ) {
	return (
		<InspectorPanel { ...{ attributes, setAttributes, context, colors, isList, clientId } } />
	);
}