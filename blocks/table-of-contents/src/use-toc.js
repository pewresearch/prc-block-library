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
	const { currentChapters = [] } = useSelect(
		(select) => {
			const foundChapters = select('core/block-editor').getBlocks().filter(
				(block) => 'core/heading' === block.name && block.attributes?.isChapter === true,
			);
			return {
				currentChapters: 0 === foundChapters.length ? [
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
				] : foundChapters,
			};
		},
		[],
	);
	return currentChapters;
}

export default function useTOC( { postId, postType } ) {
	const { record, isResolving } = useEntityRecord( 'postType', postType, postId );

	const {reportPackage, parentTitle, parentId, tableOfContents} = useMemo(() => {
		if (!record || isResolving) {
			return {};
		}
		return {
			reportPackage: record?.report_package,
			parentTitle: record?.report_package?.parent_title,
			parentId: record?.report_package?.parent_id,
			tableOfContents: record?.report_package?.table_of_contents,
		}
	}, [record, isResolving]);

	const currentPostChapters = useCurrentChapters();

	console.log('useTOC', postId, postType, reportPackage, currentPostChapters, tableOfContents);

	const memoizedChapters = useMemo(() => {
		if (!tableOfContents) {
			return [
				{
					id: 1,
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
					]
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
		return tableOfContents?.map((chapter) => {
			const internalChapters = postId === chapter?.id ? currentPostChapters.map((chapter) => ({
				title: chapter.attributes?.content,
				id: chapter?.id,
				clientId: chapter?.clientId,
				link: chapter?.link,
			})) : chapter?.internal_chapters;

			return {
				id: chapter.id,
				title: chapter?.title,
				link: chapter?.link,
				internalChapters: internalChapters,
			}
		});
	}, [currentPostChapters, tableOfContents]);

	return {
		parentId,
		parentTitle,
		chapters: memoizedChapters,
	};
}
