/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Gets a single staff member by ID from PRC primary site.
 * @param {*} staffId
 * @returns
 */
export function fetchStaff(staffId, valueToFetch) {
	const endpointUrl = `${window.location.origin}/wp-json/wp/v2/staff/${staffId}`;

	return new Promise((resolve) => {
		apiFetch({
			url: endpointUrl,
		}).then((post) => {
			// eslint-disable-next-line camelcase
			const { staffInfo } = post;
			const value = staffInfo[`${valueToFetch}`];
			return resolve(value);
		});
	});
}

/**
 * Gets a single value from a byline term by termId from the current PRC site.
 * @param {*} termId
 * @param {*} valueToFetch
 */
export function fetchByline(termId, valueToFetch) {
	return new Promise((resolve) => {
		apiFetch({
			path: `/wp/v2/bylines/${termId}`,
		}).then((byline) => {
			// eslint-disable-next-line camelcase
			const { staffInfo } = byline;
			console.log('bylines staffInfo...', staffInfo);
			const value = staffInfo[`${valueToFetch}`];
			return resolve(value);
		});
	});
}
