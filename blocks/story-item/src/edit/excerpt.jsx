/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment, useMemo } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const randomExcerptPlaceholder = () => {
	const opts = [
		'In recent years, several new options have emerged in the social media universe, many of which explicitly present themselves as alternatives to more established social media platforms. Free speech ideals and heated political themes prevail on these sites, which draw praise from their users and skepticism from other Americans.',
		'Elections in Italy and Sweden have underscored the growing electoral strength that populist parties have displayed in Europe in recent years.',
		'In less than a decade, the share of Americans who go “cashless” in a typical week has increased by double digits.',
		'72% of U.S. adults say that, on the issues that matter to them, their side in politics has been losing more often than winning.',
		'56% of U.S. adults say that oil executives should be tried for crimes against humanity for their role in climate change.',
	];
	return opts[Math.floor(Math.random() * opts.length)];
};

export default function Excerpt({ attributes, setAttributes }) {
	const { excerpt, enableHeader, enableExcerpt } = attributes;

	if (!enableExcerpt) {
		return <Fragment />;
	}

	const placeholder = useMemo(() => randomExcerptPlaceholder(), []);

	const classes = classNames('description', { 'sans-serif': !enableHeader });

	return (
		<RichText
			tagName="div"
			value={excerpt}
			onChange={(value) => setAttributes({ excerpt: value })}
			placeholder={placeholder}
			multiline="p"
			className={classes}
		/>
	);
}
