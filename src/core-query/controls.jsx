/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const BLOCKNAME = 'core/query';

export default function Controls(props) {
	const { name, attributes, setAttributes } = props;

	if (BLOCKNAME !== name) {
		return null;
	}

	const { onlyQueryParents } = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Query parents', 'prc-block-library')}
				initialOpen={false}
			>
				<ToggleControl
					label={__('Only query parents', 'prc-block-library')}
					help={__(
						'When enabled, only top-level posts (no child posts) will be returned.',
						'prc-block-library'
					)}
					checked={!!onlyQueryParents}
					onChange={(value) =>
						setAttributes({ onlyQueryParents: value })
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
