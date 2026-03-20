/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import {
	BlockControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import { cleanForSlug } from '@wordpress/url';
import {
	TextControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

function getAnchorFromContent(content = '') {
	const plainText = decodeEntities(String(content))
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	return cleanForSlug(plainText);
}

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

export default function Controls({ attributes, setAttributes, context }) {
	const { isChapter, content, anchor } = attributes;
	const previousContentRef = useRef(content);
	const previousIsChapterRef = useRef(isChapter);

	useEffect(() => {
		const chapterJustEnabled =
			!previousIsChapterRef.current && Boolean(isChapter);
		const chapterContentChanged =
			Boolean(previousIsChapterRef.current) &&
			Boolean(isChapter) &&
			previousContentRef.current !== content;

		if (chapterJustEnabled || chapterContentChanged) {
			const nextAnchor = getAnchorFromContent(content);
			if (nextAnchor && nextAnchor !== anchor) {
				setAttributes({ anchor: nextAnchor });
			}
		}

		previousContentRef.current = content;
		previousIsChapterRef.current = isChapter;
	}, [isChapter, content, anchor, setAttributes]);

	return (
		<Fragment>
			<InspectorPanel {...{ attributes, setAttributes, context }} />
			<Toolbar {...{ attributes, setAttributes, context }} />
		</Fragment>
	);
}
