import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { subheading, list, moreEnabled, moreList } = attributes;
    return (
        <Fragment>
            <ul className="ui relaxed tree list">
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
                        className="list visible-list"
                        value={list}
                    />
                </li>
                {true === moreEnabled && (
                    <li className="item">
                        <div className="read-more">View More</div>
                        <RichText.Content
                            tagName="ul"
                            className="list hidden-list"
                            value={moreList}
                        />
                    </li>
                )}
            </ul>
        </Fragment>
    );
};

export default save;
