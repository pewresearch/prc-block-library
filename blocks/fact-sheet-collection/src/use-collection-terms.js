/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useState, useEffect, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const ENGLISH_TERM_ID = 478;

export default function useCollectionTerms(termIds = []) {
	const [parentId, setParentTermId] = useState(null);
	const [parent, setParentTerm] = useState(null);
	const [altLanguagePosts, setAltLanguagePosts] = useState([]); // [ { id, title, url }, ... ]
	const [data, setData] = useState([]);
	const [isResolving, setIsResolving] = useState(true);

	const firstTermId = useMemo(() => termIds[0], [termIds]);

	useEffect(() => {
		console.log('firstTermId', firstTermId);
		if (firstTermId) {
			setIsResolving(true);
			apiFetch({
				path: `/wp/v2/collection/${firstTermId}`,
			}).then((firstTerm) => {
				console.log('firstTerm', firstTerm);
				const pId = firstTerm?.parent;
				setParentTermId(pId);
				apiFetch({
					path: `/wp/v2/collection/${pId}`,
				}).then((p) => {
					console.log('parentTerm', p);
					setParentTerm(p);
				});
			});
		}
	}, [firstTermId]);

	useEffect(() => {
		console.log('parentTermId', parentId);
		if (parentId) {
			setIsResolving(true);
			apiFetch({
				path: `/wp/v2/collection?parent=${parentId}`,
			}).then((terms) => {
				console.log('terms', terms);
				setData(terms);
				setIsResolving(false);
			});
		}
	}, [parentId]);

	useEffect(() => {
		if (parentId && firstTermId && parent) {
			setIsResolving(true);
			const path = addQueryArgs('/wp/v2/fact-sheet', {
				collection: firstTermId,
				languages_exclude: ENGLISH_TERM_ID, // We could query for this but we do know this information and it's static... for now.
				status: 'publish,draft',
			});
			apiFetch({ path }).then((posts) => {
				setAltLanguagePosts(posts);
				setIsResolving(false);
			});
		}
	}, [parentId, firstTermId, parent]);

	const {
		parentTerm,
		records,
	} = useMemo(() => ({
		parentTerm: parent,
		records: data,
	}), [parent, data]);

	return {
		parentTerm,
		records,
		isResolving,
		altLanguagePosts,
	};
}


