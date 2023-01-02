/**
 * External Dependencies
 */
import { TaxonomySelect, WPObjectSearch } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

export default function Controls({ attributes, setAttributes, context }) {
	const { taxonomy, termId } = attributes;
	return (
		<InspectorControls>
			<PanelBody title="Taxonomy Controls">
				<TaxonomySelect
					value={taxonomy}
					onChange={(newTaxonomy) => {
						setAttributes({ taxonomy: newTaxonomy });
					}}
				/>
				<TaxonomySelect
					value={[taxonomy]}
					onChange={(newTaxonomy) => {
						console.log('newTaxonomy: ', newTaxonomy);
					}}
					allowMultiple
				/>
				<WPObjectSearch
					onSelectItem={(item) => {
						console.log(item);
					}}
					label="Please select a Taxonomy or Topic Term:"
					mode="term"
					contentTypes={['topic']}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
