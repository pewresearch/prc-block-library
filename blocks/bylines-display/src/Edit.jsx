/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const DEFAULT_BYLINES = ['Person A', 'Person B', 'Person C'];

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
	const { textAlign, prefix, className } = attributes;

	const [bylines, setBylines] = useState(DEFAULT_BYLINES);
	const bylineTerms = useSelect(
		(select) => select('core/editor').getEditedPostAttribute('bylines'),
		[clientId],
	);
	const blockProps = useBlockProps({
		className: classNames(className, {
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	const getBylineNameAsync = (termId) =>
		new Promise((resolve) => {
			apiFetch({
				path: `/wp/v2/bylines/${termId}`,
			}).then((byline) => {
				const { name } = byline;
				return resolve(name);
			});
		});

	const getBylines = () =>
		Promise.all(bylineTerms.map((termId) => getBylineNameAsync(termId)));

	useEffect(() => {
		if (bylineTerms && 0 < bylineTerms.length) {
			getBylines().then((data) => {
				setBylines([...data]);
			});
		} else {
			setBylines([...DEFAULT_BYLINES]);
		}
	}, [bylineTerms]);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, context }} />
			<div {...blockProps}>
				<RichText
					tagName="span"
					placeholder="By"
					value={prefix}
					onChange={(value) => setAttributes({ prefix: value })}
					allowedFormats={[]}
					style={{
						marginRight: '4px',
					}}
				/>
				{bylines.map((b, index) => {
					const total = bylines.length;
					if (1 < total && total === index + 1) {
						return <Fragment>and {b}</Fragment>;
					}
					if (1 < total && total !== index + 1) {
						return <Fragment>{b}, </Fragment>;
					}
					return b;
				})}
			</div>
		</Fragment>
	);
}
