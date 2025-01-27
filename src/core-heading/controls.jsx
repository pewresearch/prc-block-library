/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	BlockControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import {
	TextControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

function InspectorPanel({ attributes, setAttributes }) {
	const { isChapter, altTocText, content } = attributes;
	return (
		<InspectorAdvancedControls>
			{isChapter && (
				<TextControl
					label={__('Alternate TOC Text', 'prc-block-library')}
					value={altTocText}
					placeholder={content}
					onChange={(value) => setAttributes({ altTocText: value })}
				/>
			)}
		</InspectorAdvancedControls>
	);
}

function Toolbar({ attributes, setAttributes, context }) {
	const { isChapter } = attributes;

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="book-alt"
					label={isChapter ? 'Remove Chapter' : 'Make Chapter'}
					isActive={isChapter}
					onClick={() => {
						const attrs = {
							isChapter: !isChapter,
						};
						setAttributes({ ...attrs });
					}}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return (
		<Fragment>
			<InspectorPanel {...{ attributes, setAttributes, context }} />
			<Toolbar {...{ attributes, setAttributes, context }} />
		</Fragment>
	);
}
