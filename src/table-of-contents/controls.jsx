/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import ColorControls from './color-controls';

export default function Controls({
	attributes,
	setAttributes,
	colors,
	clientId,
}) {
	const {
		showCurrentChapter,
	} = attributes;

	return (
		<Fragment>
			<ColorControls
				{...{
					attributes,
					setAttributes,
					colors,
					clientId,
				}}
			/>
			<InspectorControls>
				<PanelBody title={__('Settings', 'prc-block-library')}>
					<ToggleControl
						label={__('Highlight Current Chapter')}
						checked={showCurrentChapter}
						onChange={() => {
							setAttributes({
								showCurrentChapter: !showCurrentChapter,
							});
						}}
						help={__(
							'Highlight the current chapter in the table of contents when scrolling.',
							'prc-block-library'
						)}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
