// WordPress Core
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import classNames from 'classnames/bind';

const Extra = function({ enabled, content, setAttributes, breakingNews }) {
    const classes = classNames('extra');
    return (
        <Fragment>
            {false !== setAttributes && true === enabled && (
                <RichText
                    tagName="ul" // The tag here is the element output and editable in the admin
                    value={content} // Any existing content, either from the database or an attribute default
                    onChange={extra => setAttributes({ extra })} // Store updated content as a block attribute
                    placeholder={content} // Display this text before any content has been added by the user
                    multiline="li"
                    className={classes}
                />
            )}
            {false === setAttributes && true === enabled && (
                <RichText.Content
                    tagName="ul"
                    value={content}
                    className={classes}
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