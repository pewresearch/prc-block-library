/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export default function Save({ attributes }) {
	const { url, caption } = attributes;

	if ('undefined' === typeof url) {
		return;
	}

	// eslint-disable-next-line consistent-return
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<Fragment>
			{!RichText.isEmpty(caption) && (
				<RichText.Content tagName="figcaption" value={caption} />
			)}
		</Fragment>
	);
}