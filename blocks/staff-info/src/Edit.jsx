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

	const { bylineTermId } = context;

	const [staffValue, setStaffValue] = useState('Jane Doe');

	const getValue = (termId) =>
		new Promise((resolve) => {
			apiFetch({
				path: `/wp/v2/bylines/${termId}`,
			}).then((byline) => {
				// eslint-disable-next-line camelcase
				const { name, staff_info } = byline;
				const value =
					// eslint-disable-next-line camelcase
					'name' !== valueToFetch ? staff_info[`${valueToFetch}`] : name;
				return resolve(value);
			});
		});

	useEffect(() => {
		getValue(bylineTermId).then((v) => {
			setStaffValue(v);
		});
	}, [bylineTermId]);

	const blockProps = useBlockProps();

	return <div {...blockProps}>{staffValue}</div>;
}
