/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

export default function NextPrevButton({
	post,
	label = 'Next Page',
	className = 'common-block-style__pagination__pagination-next',
}) {
	if (!post) {
		return null;
	}
	const { title, link } = post;
	return (
		<a href={link} className={className}>
			{decodeEntities(label)}
		</a>
	);
}
