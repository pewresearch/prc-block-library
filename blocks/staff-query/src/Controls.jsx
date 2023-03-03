/* eslint-disable indent */
/**
 * External Dependencies
 */
import { TermSelect } from '@prc/components';
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { has } from 'lodash';

const PanelDescription = styled.div`
	grid-column: span 2;
`;

export default function Controls({ attributes, setAttributes, clientId }) {
	const { staffType, researchArea } = attributes;
	return (
		<InspectorControls>
			<ToolsPanel
				label={__('Staff Query Filters')}
				resetAll={() => {
					console.log('Reset All');
				}}
				panelId={clientId}
			>
				<PanelDescription>
					{__(
						'Use the filters below to filter the staff members that are displayed. Filter by staff type or research area.'
					)}
				</PanelDescription>
				<ToolsPanelItem
					label={__('Filter by Staff Type')}
					hasValue={() => staffType !== undefined}
					onDeselect={() => console.log('onDeselect')}
					resetAllFilter={(newAttributes) =>
						console.log('reset all', newAttributes)
					}
					panelId={clientId}
				>
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
				</ToolsPanelItem>
				<ToolsPanelItem
					label={__('Filter by Research Area')}
					hasValue={() => researchArea !== undefined}
					onDeselect={() => console.log('onDeselect')}
					resetAllFilter={(newAttributes) =>
						console.log('reset all', newAttributes)
					}
					panelId={clientId}
				>
					<TermSelect
						maxTerms={1}
						value={
							has(researchArea, 'name')
								? [
										{
											value: researchArea.name,
											title: researchArea.name,
										},
								  ]
								: []
						}
						taxonomy="research-teams"
						usePrimaryRestAPI
						onChange={(term) => {
							setAttributes({ researchArea: term });
						}}
					/>
				</ToolsPanelItem>
			</ToolsPanel>
		</InspectorControls>
	);
}
