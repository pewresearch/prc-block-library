/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import Dropzone from './Dropzone';

function Controls({ attributes, setAttributes }) {
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Upload Data')}>
					<Dropzone attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls />
		</Fragment>
	);
}

export default Controls;
