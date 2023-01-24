/* eslint-disable indent */
/**
 * External Dependencies
 */
import { TermSelect } from '@prc/components';
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { has } from 'lodash';

// Why do just a simple fragment when you can set yourself up for future styling.
const ComboControl = styled('div')``;

export function TaxonomyTermControl({ attributes, setAttributes }) {
	const { staffType } = attributes;
	return (
		<ComboControl>
			<TermSelect
				maxTerms={1}
				value={
					has(staffType, 'name')
						? [
								{
									value: staffType.name,
									title: staffType.name,
								},
						  ]
						: []
				}
				taxonomy="staff-type"
				usePrimaryRestAPI
				onChange={(term) => {
					setAttributes({ staffType: term });
				}}
			/>
			<TermSelect
				maxTerms={1}
				value={
					has(staffType, 'name')
						? [
								{
									value: staffType.name,
									title: staffType.name,
								},
						  ]
						: []
				}
				taxonomy="research-teams"
				usePrimaryRestAPI
				onChange={(term) => {
					setAttributes({ staffType: term });
				}}
			/>
		</ComboControl>
	);
}

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<PanelBody title="Settings">
				<TaxonomyTermControl
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
