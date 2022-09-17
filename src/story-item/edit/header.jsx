/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

function Header({ attributes, setAttributes }) {
	const { title, headerSize, enableExcerpt, enableHeader } = attributes;

	if (!enableHeader) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const classes = classNames('header', {
		large: 1 === headerSize,
		medium: 2 === headerSize,
		small: 3 === headerSize,
		light: !enableExcerpt,
	});

	return (
		<RichText
			tagName="header"
			value={title}
			onChange={(t) => setAttributes({ title: t })}
			allowedFormats={['italic']}
			placeholder="Title"
			multiline="br"
			className={classes}
		/>
	);
}

export default Header;
