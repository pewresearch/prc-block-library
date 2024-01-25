/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { getColorClassName } from '@wordpress/block-editor';

export default function NextPostButton({nextPost, backgroundColor, textColor, boxShadowColor}) {
	if (!nextPost) {
		return null;
	}
	const { title, link } = nextPost;

	const className = classNames('wp-block-prc-block-report-pagination__next-post-button', {
		'has-text-color': !!textColor.color || !!textColor?.class,
		[getColorClassName('color', textColor?.slug)]: !!textColor?.slug,
		'has-background': !!backgroundColor.color || backgroundColor.class,
		[getColorClassName('background-color', backgroundColor?.slug)]:
			!!backgroundColor?.slug,
	});

	return(
		<a href={link} className={className} alt={__(`Go to the next post in this report package: ${title}`)} style={{'box-shadow': `inset 0 3px 4px -2px var(--wp--preset--color--${boxShadowColor?.slug})`}}>
			{title}
		</a>
	);
}
