/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

export default function NextPrevButton({post, label = 'Next Page'}) {
	if (!post) {
		return null;
	}
	const { title, link } = post;

	const className = classNames('wp-block-prc-block-report-pagination__pagination-next-prev');

	return(
		<a href={link} className={className}>
			{decodeEntities(label)}
		</a>
	);
}
