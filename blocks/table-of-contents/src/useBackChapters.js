/**
 * WordPress Dependencies
 */
import { useState, useEffect, useRef, useMemo } from '@wordpress/element';
import { useEntityRecords } from '@wordpress/core-data';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

export default function useBackChapters(postId, postType) {
	const [hiddenBackChapters, setHiddenBackChapters] = useState([]);

	const { records, isResolving, hasResolved } = useEntityRecords(
		'postType',
		postType,
		{
			per_page: 25,
			_fields: [ 'id', 'link', 'post_parent', 'title', 'type', 'menu_order' ],
			post_parent: postId,
		},
	);

	const hideBackChapter = (chapterId) => {
		if (hiddenBackChapters.includes(chapterId)) {
			setHiddenBackChapters(
				hiddenBackChapters.filter((id) => id !== chapterId),
			);
		} else {
			setHiddenBackChapters([...hiddenBackChapters, chapterId]);
		}
	};

	const backChapters = useMemo(() => {
		console.log('useBackChapters', records, isResolving, postId, postType);
		if (!records || isResolving) {
			return [];
		}
		return records;
	}, [records, isResolving]);

	return {
		backChapters,
		hiddenBackChapters,
		hideBackChapter,
	}
}
