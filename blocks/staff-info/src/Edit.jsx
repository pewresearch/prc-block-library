/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import { fetchByline } from './utils';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const { valueToFetch } = attributes;

	const { bylineTermId, staffName, staffJobTitle, staffTwitter } = context;

	console.log('Context', context);

	const [staffValue, setStaffValue] = useState('Jane Doe');

	useEffect(() => {
		if (undefined !== bylineTermId) {
			fetchByline(bylineTermId, valueToFetch).then((v) => {
				setStaffValue(v);
			});
		}
		if (undefined !== staffName && 'name' === valueToFetch) {
			setStaffValue(staffName);
		}
		if (undefined !== staffJobTitle && 'jobTitle' === valueToFetch) {
			setStaffValue(staffJobTitle);
		}
		if (undefined !== staffTwitter && 'twitter' === valueToFetch) {
			setStaffValue(staffTwitter);
		}
	}, [bylineTermId, staffName, staffJobTitle, staffTwitter, valueToFetch]);

	const blockProps = useBlockProps();

	return <div {...blockProps}>{staffValue}</div>;
}
