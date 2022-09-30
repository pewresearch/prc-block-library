/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

const save = ({ attributes }) => {
	const { heading, subHeading, headingLevel } = attributes;
	return (
		<Fragment>
			<div className="wp-block-prc-block-promo__text">
				{heading && (
					<RichText.Content
						className="wp-block-prc-block-promo__heading"
						tagName={`h${headingLevel}`}
						value={heading}
					/>
				)}
				{subHeading && (
					<RichText.Content
						className="wp-block-prc-block-promo__sub_heading"
						tagName="div"
						value={subHeading}
					/>
				)}
			</div>
			<div className="wp-block-prc-block-promo__action">
				<InnerBlocks.Content />
			</div>
		</Fragment>
	);
};

export default save;
