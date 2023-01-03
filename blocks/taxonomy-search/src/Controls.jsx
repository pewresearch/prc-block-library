/* eslint-disable indent */
/**
 * External Dependencies
 */
import { TaxonomySelect, TermSelect } from '@prc/components';
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { has } from 'lodash';

const ComboControl = styled('div')``;

export function TaxonomyTermControl({ attributes, setAttributes }) {
	const { taxonomy, restrictToTerm } = attributes;
	return (
		<ComboControl>
			<TaxonomySelect
				value={taxonomy}
				onChange={(newTaxonomy) => {
					setAttributes({ taxonomy: newTaxonomy });
				}}
			/>
			<TermSelect
				maxTerms={1}
				value={
					has(restrictToTerm, 'name')
						? [
								{
									value: restrictToTerm.name,
									title: restrictToTerm.name,
								},
						  ]
						: []
				}
				taxonomy={taxonomy}
				onChange={(term) => {
					setAttributes({ restrictToTerm: term });
				}}
			/>
		</ComboControl>
	);
}

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<PanelBody title="Taxonomy Controls">
				<TaxonomyTermControl
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
