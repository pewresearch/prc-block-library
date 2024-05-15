/**
 * WordPress Dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

export default function useCollectionTerm(postId, termId){
	const perPage = 1;
	const {postTerms} = useSelect( select => {
		if (termId) {
			return {
				postTerms: [termId],
			}
		}
		if (!postId) {
			return {
				postTerms: false,
			}
		}
		const { getEditedPostAttribute } = select('core/editor');
		const termIds = getEditedPostAttribute('collection');
		return {
			postTerms: termIds,
		}
	}, [postId, termId]);

	const [collectionTerm, setCollectionTerm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getTermAsync = (id) =>
		new Promise((resolve) => {
			apiFetch({
				path: `/wp/v2/collection/${id}`,
			}).then((term) => {
				return resolve(term);
			});
		});

	const getTaxonomyTerms = () =>
		Promise.all(postTerms.map((id) => getTermAsync(id)));

	useEffect(() => {
		setIsLoading(true);
		console.log('... checking data ...', postTerms);
		if (postTerms && 0 < postTerms.length) {
			getTaxonomyTerms().then((data) => {
				let d = data;
				if ( false !== perPage ) {
					d = d.slice(0, perPage);
				}
				setCollectionTerm(d?.[0]);
				setIsLoading(false);
			});
		} else {
			setIsLoading(false);
		}
	}, [postTerms, perPage]);

	return {
		isLoading,
		collectionTerm,
	}
}
