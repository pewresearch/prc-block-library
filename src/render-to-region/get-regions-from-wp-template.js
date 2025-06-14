/**
 * WordPress Dependencies
 */
import { select, dispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { parse } from '@wordpress/blocks';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { store as noticeStore } from '@wordpress/notices';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Get the regions from the post.
 * @param {number} postId - The post ID.
 * @param {string} postType - The post type.
 * @returns {Array} - Array of regions.
 */
export function getRegionsFromPost(postId, postType) {
	const { createSuccessNotice, createErrorNotice } = dispatch(noticeStore);
	console.log('getRegionsFromPost::postId', postId);
	return new Promise((resolve, reject) => {
		apiFetch({
			path: addQueryArgs('prc-api/v3/render-to-regions', {
				post: postId,
			}),
			method: 'GET',
		})
			.then((response) => {
				console.log('getRegionsFromPost::response', response);
				createSuccessNotice('Regions fetched successfully', {
					type: 'snackbar',
				});
				resolve(response);
			})
			.catch((error) => {
				console.error('getRegionsFromPost::error', error);
				createErrorNotice('Error fetching regions', {
					type: 'snackbar',
				});
				reject(error);
			});
	});
}

export default function useRegionsFromPost(postId, postType) {
	const [regions, setRegions] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Only fetch if postId and postType are valid
		if (!postId || !postType) return;

		let isMounted = true;
		setIsLoading(true);

		getRegionsFromPost(postId, postType).then((data) => {
			if (isMounted) {
				setRegions(data);
				setIsLoading(false);
			}
		});

		return () => {
			isMounted = false;
		};
	}, [postId, postType]);

	return regions;
}
