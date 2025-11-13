/* eslint-disable indent */
/**
 * External Dependencies
 */
import { TaxonomySelect, TermSelect } from '@prc/components';
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { has } from 'lodash';

// Why do just a simple fragment when you can set yourself up for future styling.
const ComboControl = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export function TaxonomyTermControl({ attributes, setAttributes, context }) {
	const { restrictToTerm } = attributes;
	const taxonomy = useMemo(
		() => {
			return !!attributes.taxonomy ? attributes.taxonomy : context?.taxonomy
		},
		[attributes, context?.taxonomy]
	);
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
