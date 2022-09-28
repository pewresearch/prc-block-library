/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const randomPlaceholder = () => {
	const opts = [
		'Defense industry stocks fall on news of executive order recalling all U.S. military personnel as focus shifts to fighting climate change.',
		'U.S. President honors 10th anniversary of the loss of Miami to rising sea levels.',
		'Congress passes bill to offer relocation assistance to all Americans living in coastal areas.',
		'U.S. President signs executive order to end all fossil fuel extraction and use by 2030.',
		'Exxon executives indicted for fraud and conspiracy to commit fraud. Company to be liquidated.',
		'Shell oil executives to face United Nations war crimes tribunal.',
	];
	return opts[Math.floor(Math.random() * opts.length)];
};

function Excerpt({ attributes, setAttributes }) {
	const { excerpt, enableHeader, enableExcerpt } = attributes;

	if (!enableExcerpt) {
		return <Fragment />;
	}

	const classes = classNames('description', { 'sans-serif': !enableHeader });

	return (
		<RichText
			tagName="div"
			value={excerpt}
			onChange={(value) => setAttributes({ excerpt: value })}
			placeholder={randomPlaceholder()}
			multiline="p"
			className={classes}
		/>
	);
}

export default Excerpt;
