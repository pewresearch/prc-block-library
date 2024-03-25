/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useMemo, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useEntityProp } from '@wordpress/core-data';

const placeholderBylines = [
	{
		staffName: 'John Doe',
		staffJobTitle: 'Associate Researcher',
		staffImage: false,
		staffTwitter: 'johndoe',
		staffExpertise: [],
		staffBio:
			'Cupidatat minim amet labore esse adipisicing. Exercitation duis culpa do incididunt cillum Lorem dolor. Et irure non veniam amet deserunt officia aute do qui. Voluptate anim in duis.',
		staffMiniBio:
			'Cillum dolor nisi exercitation nostrud anim non ea deserunt deserunt ut tempor ut eiusmod',
		staffLink: false,
		staffJobTitleExtended: 'an Associate Researcher focusing on XYZ',
		staffBioShort:
			'<a href="#">John Doe</a> is an Associate Researcher focusing on XYZ.',
	},
	{
		staffName: 'Jane Doe',
		staffJobTitle: 'VP of Research Methods',
		staffImage: false,
		staffTwitter: 'janedoe',
		staffExpertise: [],
		staffBio:
			'Proident sit magna ullamco commodo esse duis labore. Consequat sint dolor incididunt id dolor laboris duis nulla pariatur. Consequat pariatur et ex. Dolore velit non deserunt. Dolore esse commodo deserunt magna quis irure. Ipsum id occaecat ea labore ipsum et proident culpa ullamco amet pariatur consequat elit ullamco mollit.',
		staffMiniBio:
			'Magna reprehenderit cupidatat magna elit do excepteur minim velit ex culpa nostrud voluptate laborum enim nulla amet laborum occaecat incididunt',
		staffLink: false,
		staffJobTitleExtended: 'an Associate Researcher focusing on XYZ',
		staffBioShort:
			'<a href="#">Jane Doe</a> is VP of Research Methods focusing on XYZ.',
	},
];

const getBylineNameAsync = (termId) =>
	new Promise((resolve, reject) => {
		apiFetch({
			path: `/wp/v2/bylines/${termId}`,
		})
			.then((byline) => {
				const { staffInfo } = byline;
				console.log('getBylineNameAsync', byline);
				return resolve(staffInfo);
			})
			.catch((err) => {
				console.error(err);
				return reject(err);
			});
	});

async function getBlockBylineContexts(bylineTermIds) {
	console.log('getBlockBylineContexts', bylineTermIds);
	if (!bylineTermIds) {
		return placeholderBylines;
	}
	return await Promise.all(
		bylineTermIds.map((termId) => getBylineNameAsync(termId))
	);
}

/**
 * Returns an object containing the bylines context and a contextId.
 * The bylines context is an array of staffInfo objects matching each bylineTermId passed in.
 * The contextId is a hash of the first staffInfo object in the bylines context array.
 * @param {*} bylineTermIds
 * @return
 */
export default function useBylinesContextProvider({ postId, postType }) {
	const [bylineTermIds] = useEntityProp('postType', postType, 'bylines');
	const [bylinesContext, _setBylines] = useState([]);
	const isResolving = useMemo(
		() => null === bylinesContext,
		[bylinesContext]
	);

	useEffect(() => {
		getBlockBylineContexts(bylineTermIds).then((bylines) => {
			_setBylines(bylines);
		});
	}, [bylineTermIds]);

	return {
		isResolving,
		bylinesContext,
	};
}
