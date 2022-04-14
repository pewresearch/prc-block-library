/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

function Header({ title, size, enabled, setAttributes, altHeaderWeight }) {
	if (true !== enabled) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const classes = classNames('header', {
		large: 1 === size,
		medium: 2 === size,
		small: 3 === size,
		light: altHeaderWeight,
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
