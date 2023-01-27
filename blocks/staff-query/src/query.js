/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export default function query({ staffType, researchArea }) {
	// extract id from staffType object if it exists.
	const staffTypeId = staffType ? staffType.id : null;
	const args = {
		per_page: 100,
		orderby: 'last_name',
		order: 'asc',
		fields: 'id,slug,title,type,name,staffInfo',
	};
	if (staffTypeId) {
		args['staff-type'] = staffTypeId;
	}
	if (researchArea) {
		const researchAreaId = researchArea ? researchArea.id : null;
		args['research-area'] = researchAreaId;
	}
	const endpointUrl = addQueryArgs(
		`${window.location.origin}/wp-json/wp/v2/staff`,
		args,
	);
	return new Promise((resolve) => {
		apiFetch({
			url: endpointUrl,
		}).then((posts) => {
			resolve(
				posts.map((item) => ({
					staffPostId: item.id,
					...item.staffInfo,
				})),
			);
		});
	});
}
