/**
 * WordPress Dependencies
 */

import { Fragment, useState } from '@wordpress/element';
import { TextControl, SelectControl, PanelBody } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { InspectorControls } from '@wordpress/block-editor';

const stubEnabledSiteIds = Array.from(Array(19).keys()).filter(
	(id) => 17 !== id && 0 !== id,
);

export default function Controls({ attributes, setAttributes }) {
	const { taxonomy, postType, perPage } = attributes;

	const [siteId] = useEntityProp('root', 'site', 'siteId');

	return (
		<InspectorControls>
			<PanelBody title="Related Posts Query">
				<SelectControl
					label="Select Taxonomy To Display"
					value={taxonomy}
					options={
						stubEnabledSiteIds.includes(siteId)
							? [
								{ label: 'Formats', value: 'formats' },
								{ label: 'Research Teams', value: 'research-teams' },
									{ label: 'Topics', value: 'topic' },
							  ]
							: [{ label: 'Category', value: 'category' }]
					}
					onChange={(newTaxonomy) => {
						setAttributes({ taxonomy: newTaxonomy });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
