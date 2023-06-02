/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useCallback } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

function InspectorPanel( { attributes, setAttributes } ) {
	return (
		<InspectorControls>
			<PanelBody title="Block Controls">
				<BaseControl label="Do Something">
					<Button variant="primary">Do Something</Button>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
}

function Toolbar( { attributes, setAttributes, context } ) {
	const { forceLanguage, detectedLanguage } = attributes;

	const MemoizedLanguageValue = useCallback( () => {
		if ( forceLanguage ) {
			return forceLanguage;
		}
		return `Auto-detect (${detectedLanguage}) `;
	}, [ forceLanguage, detectedLanguage ] );

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={ MemoizedLanguageValue }
					label="Select language"
					controls={ [
						{
							title: 'Auto-detect',
							isActive: 'undefined' === typeof forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: undefined } );
							},
						},
						{
							title: 'R',
							isActive: 'R' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'R' } );
							},
						},
						{
							title: 'Python',
							isActive: 'Python' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'Python' } );
							},
						},
						{
							title: 'PHP',
							isActive: 'PHP' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'PHP' } );
							},
						},
						{
							title: 'HTML',
							isActive: 'HTML' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'HTML' } );
							},
						},
						{
							title: 'JavaScript',
							isActive: 'JavaScript' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'JavaScript' } );
							},
						},
						{
							title: 'JSON',
							isActive: 'JSON' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'JSON' } );
							},
						},
						{
							title: 'Bash',
							isActive: 'Bash' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'Bash' } );
							},
						},
						{
							title: 'SQL',
							isActive: 'SQL' === forceLanguage,
							onClick: () => {
								setAttributes( { forceLanguage: 'SQL' } );
							},
						},
					] }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls( { attributes, setAttributes, context } ) {
	return (
		<Fragment>
			<Toolbar { ...{ attributes, setAttributes, context } } />
		</Fragment>
	);
}

