/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

function Extra({ attributes, setAttributes }) {
	const { extra, enableExtra, enableBreakingNews } = attributes;
	return (
		<Fragment>
			{true === enableExtra && (
				<RichText
					tagName="ul"
					value={extra}
					onChange={(value) => setAttributes({ extra: value })}
					placeholder={extra}
					multiline="li"
					className="extra"
				/>
			)}
			{true === enableBreakingNews && false !== window.prcBreakingNews && (
				<ul className="extra-breaking-news">
					<li>
						<a
							href={window.prcBreakingNews.url}
							className="kicker-breaking-news"
						>
							{window.prcBreakingNews.label}
						</a>
					</li>
				</ul>
			)}
		</Fragment>
	);
}

export default Extra;
