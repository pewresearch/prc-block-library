/**
 * WordPress Dependencies
 */
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const DEFAULT_VALUES = [
	{
		name: 'Term A',
		slug: 'term-a',
		link: '#',
	},
	{
		name: 'Term B',
		slug: 'term-b',
		link: '#',
	},
	{
		name: 'Term C',
		slug: 'term-c',
		link: '#',
	}
];

export default function usePostTaxonomyTerms(postId, postType, taxonomy = 'categories', perPage = false){
	const {postTerms} = useSelect( select => {
		if (!postId || !postType || !taxonomy) {
			return {
				postTerms: [],
			}
		}
		const { getEditedPostAttribute } = select('core/editor');
		const termIds = getEditedPostAttribute(taxonomy);
		return {
			postTerms: termIds,
		}
	}, [postId, postType, taxonomy]);
	const [taxonomyTerms, setTaxonomyTerms] = useState(DEFAULT_VALUES);
	const [isLoading, setIsLoading] = useState(false);

	const getTermAsync = (termId) =>
		new Promise((resolve) => {
			apiFetch({
				path: `/wp/v2/${taxonomy}/${termId}`,
			}).then((term) => {
				return resolve(term);
			});
		});

	const getTaxonomyTerms = () =>
		Promise.all(postTerms.map((termId) => getTermAsync(termId)));

	useEffect(() => {
		setIsLoading(true);
		console.log('... checking data ...', postTerms);
		if (postTerms && 0 < postTerms.length) {
			getTaxonomyTerms().then((data) => {
				let d = data;
				if ( false !== perPage ) {
					d = d.slice(0, perPage);
				}
				console.log("GOT SOME DATA", d);
				setTaxonomyTerms([...d]);
				setIsLoading(false);
			});
		} else {
			let d = DEFAULT_VALUES;
			if ( false !== perPage ) {
				d = d.slice(0, perPage);
			}
			setTaxonomyTerms([...d]);
			setIsLoading(false);
		}
	}, [postTerms, perPage]);

	return {
		isLoading,
		taxonomyTerms,
	}
}