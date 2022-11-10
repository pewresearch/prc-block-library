/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

function save({ attributes }) {
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

export default save;
