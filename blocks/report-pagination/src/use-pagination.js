/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { getPath } from '@wordpress/url';

/**
 * Internal Dependencies
 */


export default function usePagination( { postId, postType } ) {
	const isSiteEditor = getPath( window.location.href )?.includes(
		'site-editor.php'
	);

	const { record, isResolving } = useEntityRecord( 'postType', postType, postId );

	const {currentPost, nextPost, previousPost, paginationItems} = useMemo(() => {
		if (isSiteEditor) {
			return {
				currentPost: {
					id: null,
					title: 'A Longitudinal Study of the Impact of COVID-19 on the U.S. Economy',
					link: '#'
				},
				nextPost: {
					id: null,
					title: 'The Trump Effect on the U.S. Economy',
					link: '#',
				},
				previousPost: {
					id: null,
					title: 'The Biden Effect on the U.S. Economy',
					link: '#',
				},
				paginationItems: [
					{
						link: '#',
						title: 'Introduction',
						isActive: true
					},
					{
						link: '#',
						title: 'Executive Summary',
						isActive: false
					},
					{
						link: '#',
						title: 'The Trump Effect on the U.S. Economy',
						isActive: false
					},
					{
						link: '#',
						title: 'The Biden Effect on the U.S. Economy',
						isActive: false
					},
					{
						link: '#',
						title: 'A Longitudinal Study of the Impact of COVID-19 on the U.S. Economy',
						isActive: false
					},
					{
						link: '#',
						title: 'Conclusion',
						isActive: false
					}
				]
			};
		}
		if (!record || isResolving) {
			return {
				currentPost: {
					title: 'Loading...',
					link: '#'
				},
				nextPost: {
					title: 'Loading...',
					link: '#'
				},
				previousPost: {
					title: 'Loading...',
					link: '#'
				},
				paginationItems: []
			};
		}
		const pagination = record?.report_pagination;
		return {
			currentPost: pagination?.current_post,
			nextPost: pagination?.next_post,
			previousPost: pagination?.previous_post,
			paginationItems: pagination?.pagination_items,
		};
	}, [record, isResolving]);

	return {
		currentPost,
		nextPost,
		previousPost,
		paginationItems
	};
}
