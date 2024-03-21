/**
 * WordPress Dependencies
 */
import { useState, useMemo } from 'react';
import { useSelect } from '@wordpress/data';

export default function useShortcodeCollector() {
	const [collected, setCollected] = useState([]);
	// get the post content useSelect...
	const postContent = useSelect((select) =>
		select('core/editor').getEditedPostContent()
	);

	// Collect all the [1. Footnote] shortcodes from the post content and store them in state
	// memoize the function so it only runs when the post content changes
	useMemo(() => {
		const matches = postContent
			.match(/\[\d+\.\s(.*?)(?:\s\w+=".*?")?\]/g)
			?.map(
				(match) => match.match(/\[\d+\.\s(.*?)(?:\s\w+=".*?")?\]/)?.[1]
			);
		if (matches) {
			setCollected(matches);
		} else {
			setCollected([
				'No footnotes found.',
				'Add a footnote using the [1. Footnote] shortcode.',
				'Add a footnote using the [2. Footnote] shortcode.',
			]);
		}
	}, [postContent]);

	return collected;
}
