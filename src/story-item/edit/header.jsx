/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment, useMemo } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const randomTitlePlaceholder = () => {
	const opts = [
		'The Role of Alternative Social Media in the News and Information Environment',
		'How Global Public Opinion of China Has Shifted in the Xi Era',
		'Most Latinos Say Democrats Care About Them and Work Hard for Their Vote, Far Fewer Say So of GOP',
		'More Americans are joining the ‘cashless’ economy',
		'Americans Anxious about Climate Change',
	];
	return opts[Math.floor(Math.random() * opts.length)];
};

function Header({ attributes, setAttributes }) {
	const { title, headerSize, enableExcerpt, enableHeader } = attributes;

	if (!enableHeader) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const placeholder = useMemo(() => randomTitlePlaceholder(), []);

	const classes = classNames('header', {
		large: 1 === headerSize,
		medium: 2 === headerSize,
		small: 3 === headerSize,
		light: !enableExcerpt,
	});

	return (
		<RichText
			tagName={`h${headerSize}`}
			value={title}
			onChange={(t) => setAttributes({ title: t })}
			allowedFormats={['core/italic']}
			placeholder={placeholder}
			multiline="br"
			className={classes}
		/>
	);
}

export default Header;
