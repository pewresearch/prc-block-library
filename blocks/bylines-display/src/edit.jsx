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
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { postId } = context;
	const { prefix, className } = attributes;

	const [bylines, setBylines] = useState(DEFAULT_BYLINES);
	const bylineTerms = useSelect(
		(select) => select('core/editor').getEditedPostAttribute('bylines'),
		[clientId]
	);
	const blockProps = useBlockProps({
		className: classNames(className, layoutClassNames),
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
		<div {...blockProps}>
			<RichText
				tagName="span"
				placeholder="By"
				className="prc-block-bylines__prefix"
				value={prefix}
				onChange={(value) => setAttributes({ prefix: value })}
				allowedFormats={[]}
				style={{
					marginRight: '4px',
				}}
			/>

			{bylines.map((b, index) => {
				const total = bylines.length;
				const name = b;
				let r = '';
				let Sep = () => {};
				if (1 < total && index + 1 === total) {
					Sep = () => (
						<span className="prc-platform-staff-bylines__separator">
							{' '}
							and{' '}
						</span>
					);
				} else if (1 < total && index !== 0) {
					Sep = () => (
						<span className="prc-platform-staff-bylines__separator">
							,{' '}
						</span>
					);
				}
				if (index === 0 && !postId) {
					r = <a>{name}</a>;
				} else {
					r = (
						<Fragment>
							<Sep />
							<span>{name}</span>
						</Fragment>
					);
				}
				return r;
			})}
		</div>
	);
}
