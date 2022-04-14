/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

function Extra({ content, breakingNews, enabled, setAttributes }) {
	return (
		<Fragment>
			{true === enabled && (
				<RichText
					tagName="ul"
					value={content}
					onChange={(extra) => setAttributes({ extra })}
					placeholder={content}
					multiline="li"
					className="extra"
				/>
			)}
			{true === breakingNews && false !== window.prcBreakingNews && (
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
