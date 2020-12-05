// WordPress Core
import { Fragment, RawHTML } from '@wordpress/element';
import { Item } from 'semantic-ui-react';

const Extra = ({ content, breakingNews, enabled }) => {
    return (
        <Fragment>
            {true === enabled && (
                <Item.Extra as="ul">
                    <RawHTML>{content}</RawHTML>
                </Item.Extra>
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
