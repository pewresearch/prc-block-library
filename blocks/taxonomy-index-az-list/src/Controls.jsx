/**
 * External Dependencies
 */
import { TaxonomySelect } from '@prc/components';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { getEntitiesByKind } from '@wordpress/core-data';

export function LetterControl({ value, onChange }) {
	return (
		<SelectControl
			label="Chose a letter"
			value={value}
			options={[
				{ label: '(Click to select letter)', value: null },
				{ label: 'A', value: 'A' },
				{ label: 'B', value: 'B' },
				{ label: 'C', value: 'C' },
				{ label: 'D', value: 'D' },
				{ label: 'E', value: 'E' },
				{ label: 'F', value: 'F' },
				{ label: 'G', value: 'G' },
				{ label: 'H', value: 'H' },
				{ label: 'I', value: 'I' },
				{ label: 'J', value: 'J' },
				{ label: 'K', value: 'K' },
				{ label: 'L', value: 'L' },
				{ label: 'M', value: 'M' },
				{ label: 'N', value: 'N' },
				{ label: 'O', value: 'O' },
				{ label: 'P', value: 'P' },
				{ label: 'Q', value: 'Q' },
				{ label: 'R', value: 'R' },
				{ label: 'S', value: 'S' },
				{ label: 'T', value: 'T' },
				{ label: 'U', value: 'U' },
				{ label: 'V', value: 'V' },
				{ label: 'W', value: 'W' },
				{ label: 'X', value: 'X' },
				{ label: 'Y', value: 'Y' },
				{ label: 'Z', value: 'Z' },
			]}
			onChange={(newLetter) => onChange(newLetter)}
		/>
	);
}

export function Controls({ attributes, setAttributes }) {
	const { letter, taxonomy } = attributes;

	const test = getEntitiesByKind('taxonomy');
	console.log("test", test);

	return (
		<InspectorControls>
			<PanelBody title="Taxonomy Query">
				<LetterControl
					value={letter}
					onChange={(newLetter) => setAttributes({ letter: newLetter })}
				/>
				<TaxonomySelect value={taxonomy} onSelect={setAttributes} />
			</PanelBody>
		</InspectorControls>
	);
}

export default Controls;
