import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { subheading, list, moreEnabled, moreList } = attributes;
    return (
        <Fragment>
            <ul className="ui list terms-list">
                {'' !== subheading && (
                    <Fragment>
                        <li className="item">
                            <RichText.Content
                                tagName="div"
                                className="header"
                                value={subheading}
                            />
                        </li>
                    </Fragment>
                )}
                <li className="item">
                    <RichText.Content
                        tagName="ul"
                        className="visible-list"
                        value={list}
                    />
                </li>
                {true === moreEnabled && (
                    <li className="item">
                        <a href="#" className="read-more">
                            View More
                        </a>
                        <RichText.Content
                            tagName="ul"
                            className="hidden-list"
                            value={moreList}
                            style={{ display: 'none' }}
                        />
                    </li>
                )}
            </ul>
        </Fragment>
    );
};

export default save;
