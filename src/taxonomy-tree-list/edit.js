/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const edit = ({ attributes, isSelected, setAttributes }) => {
    const { subheading, list, moreEnabled, moreList } = attributes;

    return (
        <Fragment>
            <ul className="ui relaxed tree list">
                <li className="item">
                    <RichText
                        tagName="div"
                        className="header"
                        value={subheading}
                        onChange={h => setAttributes({ subheading: h })}
                        placeholder="Key Topics"
                        keepPlaceholderOnFocus
                    />
                </li>
                <li className="item">
                    <RichText
                        tagName="ul"
                        className="list visible-list"
                        value={list}
                        onChange={l => setAttributes({ list: l })}
                        multiline="li"
                        placeholder="Item"
                        keepPlaceholderOnFocus
                    />
                </li>
                {true === isSelected && (
                    <li className="item">
                        <div
                            onClick={e => {
                                e.stopPropagation();
                                setAttributes({ moreEnabled: !moreEnabled });
                            }}
                            className="read-more"
                        >
                            View More{' '}
                            {true === moreEnabled && <span>(Enabled)</span>}{' '}
                            {false === moreEnabled && <span>(Disabled)</span>}
                        </div>
                        {true === moreEnabled && (
                            <RichText
                                tagName="ul"
                                className="list hidden-list"
                                value={moreList}
                                onChange={l => setAttributes({ moreList: l })}
                                multiline="li"
                                placeholder="Hidden Item"
                                keepPlaceholderOnFocus
                                style={{ display: 'block' }}
                            />
                        )}
                    </li>
                )}
                {/* Pseudo Save display mode when not actively editing. */}
                {false === isSelected && true === moreEnabled && (
                    <li className="item">
                        <div className="read-more">View More</div>
                    </li>
                )}
            </ul>
        </Fragment>
    );
};

export default edit;
