/**
 * WordPress Dependencies
 */
import { useState, useEffect, useRef } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

export default function useBackChapters(postId) {
	const [hiddenBackChapters, setHiddenBackChapters] = useState([]);
	const [backChapters, setBackChapters] = useState([]);

	useEffect(() => {
		apiFetch({
			path: `/prc-api/v2/report-package/${postId}`,
		}).then((response) => {
			setBackChapters(response);
		});
	}, [postId]);

	const hideBackChapter = (chapterId) => {
		if (hiddenBackChapters.includes(chapterId)) {
			setHiddenBackChapters(
				hiddenBackChapters.filter((id) => id !== chapterId),
			);
		} else {
			setHiddenBackChapters([...hiddenBackChapters, chapterId]);
		}
	};

	return {
		postId,
		backChapters,
		hiddenBackChapters,
		hideBackChapter,
	}
}
