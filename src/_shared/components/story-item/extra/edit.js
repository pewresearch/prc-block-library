// WordPress Core
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const Extra = ({ content, breakingNews, enabled, setAttributes }) => {
    return (
        <Fragment>
            {false !== setAttributes && true === enabled && (
                <RichText
                    tagName="ul"
                    value={content}
                    onChange={extra => setAttributes({ extra })}
                    placeholder={content}
                    multiline="li"
                    className="extra"
                />
            )}
            {false === setAttributes && true === enabled && (
                <RichText.Content
                    tagName="ul"
                    value={content}
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
};

export default Extra;
