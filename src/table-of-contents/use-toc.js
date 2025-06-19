/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */

function useCurrentChapters() {
	// This loads the chapters currently in the editor context.
	const { currentChapters = [] } = useSelect((select) => {
		const { getBlocksByName, getBlock } = select('core/block-editor');
		const foundChapters = getBlocksByName(['core/heading']);
		const filteredChapters =
			foundChapters.length > 0
				? []
				: [
						{
							clientId: '1',
							title: 'Chapter 1...',
						},
						{
							clientId: '2',
							title: 'Chapter 2...',
						},
					];
		foundChapters.forEach((clientId) => {
			const block = getBlock(clientId);
			if (block.attributes?.isChapter === true) {
				filteredChapters.push({
					clientId,
					title: block.attributes?.content?.originalHTML,
				});
			}
		});
		return {
			currentChapters: filteredChapters,
		};
	}, []);
	return currentChapters;
}

export default function useTOC({ postId, postType }) {
	const { record, isResolving } = useEntityRecord(
		'postType',
		postType,
		postId
	);

	const tableOfContents = useMemo(() => {
		if (!record || isResolving) {
			return [
				{
					id: postId,
					title: 'Chapter 1...',
					internalChapters: [
						{
							title: 'Chapter 1.1...',
							id: 1,
						},
						{
							title: 'Chapter 1.2...',
							id: 2,
						},
						{
							title: 'Chapter 1.3...',
							id: 3,
						},
					],
				},
				{
					id: 2,
					title: 'Chapter 2...',
				},
				{
					id: 3,
					title: 'Chapter 3...',
				},
			];
		}

		return record?.table_of_contents;
	}, [record, isResolving]);

	const currentPostChapters = useCurrentChapters();

	const memoizedChapters = useMemo(() => {
		if (!tableOfContents || tableOfContents?.length === 0) {
			if (currentPostChapters.length > 0) {
				return currentPostChapters;
			}
			return [];
		}
		return tableOfContents?.map((chapter) => {
			const internalChapters =
				postId === chapter?.id
					? currentPostChapters.map((chapter) => ({
							title: chapter.title,
							id: chapter?.id,
							clientId: chapter?.clientId,
							link: chapter?.link,
						}))
					: chapter?.internal_chapters;

			return {
				id: chapter.id,
				title: chapter?.title,
				link: chapter?.link,
				internalChapters,
			};
		});
	}, [currentPostChapters, tableOfContents]);

	return {
		chapters: memoizedChapters,
	};
}
