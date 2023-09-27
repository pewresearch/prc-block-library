/**
 * WordPress Dependencies
 */

import { SelectControl, PanelBody } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { InspectorControls } from '@wordpress/block-editor';

const stubEnabledSiteIds = Array.from(Array(19).keys()).filter(
	(id) => 17 !== id && 0 !== id,
);

export default function Controls({ attributes, setAttributes }) {
	const { taxonomy, postType, perPage } = attributes;

	const [siteId] = useEntityProp('root', 'site', 'siteId');

	let taxonomyOptions = [
		{ label: 'Formats', value: 'formats' },
		{ label: 'Research Teams', value: 'research-teams' },
		{ label: 'Topics', value: 'topic' },
	];

	if (!stubEnabledSiteIds.includes(siteId)) {
		taxonomyOptions = [{ label: 'Category', value: 'category' }];
	}

	return (
		<InspectorControls>
			<PanelBody title="Related Posts Query">
				<SelectControl
					label="Select Taxonomy To Query"
					help="Select the taxonomy to query for related posts. First we will query for custom related posts, if there are not enough we will then query posts with the same primary term in the selected taxonomy. If there are not enough posts, we will query for posts with any term in the selected taxonomy. Lastly, if no posts can be found we will use Jetpack's Related Posts feature."
					value={taxonomy}
					options={taxonomyOptions}
					onChange={(newTaxonomy) => {
						setAttributes({ taxonomy: newTaxonomy });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
