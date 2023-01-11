/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export default function query({ staffType, researchArea }) {
	// extract id from staffType object if it exists.
	const staffTypeId = staffType ? staffType.id : null;
	const newArgs = {};
	if (staffTypeId) {
		newArgs['staff-type'] = staffTypeId;
	}
	const endpointUrl = addQueryArgs(
		`${window.location.origin}/wp-json/wp/v2/staff`,
		newArgs,
	);

	console.log('Staff Query', endpointUrl);

	return new Promise((resolve) => {
		apiFetch({
			url: endpointUrl,
		}).then((posts) => {
			console.log('Staff POSTS', posts);
			resolve(
				posts.map((item) => ({
					staffPostId: item.id,
					staffName: item.staffInfo.name,
					staffJobTitle: item.staffInfo.title,
					staffTwitter: item.staffInfo.twitter,
				})),
			);
		});
	});
}
