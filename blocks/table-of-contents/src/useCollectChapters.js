/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import useBackChapters from './useBackChapters';

export default function useCollectChapters( { clientId, context } ) {
	const { postId, postType } = context;

	const { backChapters } = useBackChapters(postId, postType);

	const { chapters = [], childPostIds = [] } = useSelect(
		(select) => {
			// Currently we're just getting all blocks in the editor context, need to see what this brings in when on the site editor.
			const blocks = select('core/block-editor').getBlocks();
			const placeholder = [
				{
					attributes: {
						content: 'Chapter 1...',
					},
				},
				{
					attributes: {
						content: 'Chapter 2...',
					},
				},
				{
					attributes: {
						content: 'Chapter 3...',
					},
				},
			];
			const foundChapters = blocks.filter(
				(block) => 'core/heading' === block.name && block.attributes?.isChapter === true,
			);

			return {
				chapters: 0 === foundChapters.length ? placeholder : foundChapters,
				childPostIds: [],
			};
		},
		[clientId],
	);

	console.log('chapters', chapters);
	console.log('backChapters', backChapters);

	// Memoize chapters, so that we don't have to recalculate them on every render.
	// This is important because we're using the chapters in a useEffect hook.
	// If we didn't memoize, the useEffect would run on every render.

	const memoizedChapters = useMemo(() => chapters, [chapters]);
	const memoizedChildPostIds = useMemo(() => childPostIds, [childPostIds]);

	return {
		chapters: memoizedChapters,
		childPostIds: memoizedChildPostIds,
	};
}