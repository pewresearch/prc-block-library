/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';

function Toolbar({ attributes, setAttributes, context }) {
	const { textAlign } = attributes;

	return (
		<BlockControls>
			<AlignmentControl
				value={textAlign}
				onChange={(nextAlign) => {
					setAttributes({ textAlign: nextAlign });
				}}
			/>
		</BlockControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <Toolbar {...{ attributes, setAttributes, context }} />;
}
