/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

function InspectorPanel({ attributes, setAttributes, context }) {
	return (
		<InspectorControls>
			<PanelBody title="Taxonomy Navigation Link">
				<p>
					Controls for taxonomy term select should be inline here along with
					some other options...
				</p>
			</PanelBody>
		</InspectorControls>
	);
}

function Toolbar({ attributes, setAttributes, clientId }) {
	const { showSubMenu } = attributes;

	const { allowSubMenu } = useSelect((select) => {
		const rootClientId =
			select(blockEditorStore).getBlockRootClientId(clientId);
		const rootBlockName = select(blockEditorStore).getBlockName(rootClientId);
		return {
			allowSubMenu: 'prc-block/taxonomy-navigation-link' !== rootBlockName,
		};
	}, []);

	return (
		<BlockControls>
			<ToolbarGroup>
				{allowSubMenu && (
					<ToolbarButton
						icon="admin-site"
						label={__(
							`${showSubMenu ? 'Disable' : 'Enable'} Sub Menu`,
							'prc-block-library',
						)}
						onClick={() => {
							setAttributes({ showSubMenu: !showSubMenu });
						}}
						isActive={showSubMenu}
					/>
				)}
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({
	attributes,
	setAttributes,
	context,
	clientId,
}) {
	console.log('Taxonomy Navigation Links Context: ', context);
	return (
		<Fragment>
			<InspectorPanel {...{ attributes, setAttributes, context }} />
			<Toolbar {...{ attributes, setAttributes, clientId }} />
		</Fragment>
	);
}
