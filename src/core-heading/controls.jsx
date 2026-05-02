/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import {
	BlockControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import {
	TextControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { getAnchorFromContent } from './utils';

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

function Toolbar({ attributes, setAttributes }) {
	const { isChapter, content } = attributes;

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="book-alt"
					label={isChapter ? 'Remove Chapter' : 'Make Chapter'}
					isActive={isChapter}
					onClick={() => {
						if (isChapter) {
							setAttributes({ isChapter: false });
							return;
						}

						const nextAnchor = getAnchorFromContent(content);
						setAttributes({
							isChapter: true,
							...(nextAnchor ? { anchor: nextAnchor } : {}),
						});
					}}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

function shouldAutoGenerateAnchor(level) {
	return level === 3 || level === 4;
}

export default function Controls({ attributes, setAttributes, context }) {
	const { content, anchor, level } = attributes;
	const previousContentRef = useRef(content);
	const previousLevelRef = useRef(level);
	const previousShouldAutoAnchorRef = useRef(shouldAutoGenerateAnchor(level));

	useEffect(() => {
		const autoAnchor = shouldAutoGenerateAnchor(level);

		const levelJustBecameH3OrH4 =
			![3, 4].includes(previousLevelRef.current) &&
			[3, 4].includes(level);
		const autoAnchorJustEnabled =
			(!previousShouldAutoAnchorRef.current && autoAnchor) ||
			levelJustBecameH3OrH4;

		const contentChangedWhileAuto =
			Boolean(previousShouldAutoAnchorRef.current) &&
			autoAnchor &&
			previousContentRef.current !== content;

		if (autoAnchorJustEnabled || contentChangedWhileAuto) {
			const nextAnchor = getAnchorFromContent(content);
			if (nextAnchor && nextAnchor !== anchor) {
				setAttributes({ anchor: nextAnchor });
			}
		}

		previousContentRef.current = content;
		previousLevelRef.current = level;
		previousShouldAutoAnchorRef.current = autoAnchor;
	}, [content, anchor, setAttributes, level]);

	return (
		<Fragment>
			<InspectorPanel {...{ attributes, setAttributes, context }} />
			<Toolbar {...{ attributes, setAttributes, context }} />
		</Fragment>
	);
}
