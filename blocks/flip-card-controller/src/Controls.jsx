/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToolbarButton,
	ToolbarGroup,
	ResizableBox as WPComResizableBox,
} from '@wordpress/components';

function Toolbar({ isFlipped, doFlip }) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					onClick={() => doFlip()}
					isActive={isFlipped}
					label="Flip Over"
					icon="image-rotate"
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({
	attributes,
	setAttributes,
	context,
	isFlipped,
	doFlip,
}) {
	const { maxWidth } = attributes;
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Layout')}>
					<RangeControl
						label={__('Width')}
						withInputField
						min={0}
						max={640}
						value={parseInt(maxWidth, 10)}
						onChange={(num) =>
							setAttributes({
								maxWidth: parseInt(num, 10),
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
			<Toolbar {...{ isFlipped, doFlip }} />
		</Fragment>
	);
}
