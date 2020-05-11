import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

const edit = ({ attributes, isSelected, setAttributes }) => {
    const { subheading, list, moreEnabled, moreList } = attributes;
    return (
        <Fragment>
            <ul className="ui relaxed tree list">
                <Fragment>
                    {true === isSelected && (
                        <li className="item">
                            <RichText
                                tagName="div"
                                className="header"
                                value={subheading}
                                onChange={h => setAttributes({ subheading: h })}
                                placeholder="Key Topics"
                                formattingControls={['link']}
                                keepPlaceholderOnFocus
                            />
                        </li>
                    )}
                    {false === isSelected && '' !== subheading && (
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
                    )}
                </Fragment>
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
                            onClick={(e) => {
                                e.stopPropagation();
                                setAttributes({ moreEnabled: !moreEnabled })
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
                            />
                        )}
                    </li>
                )}
                {/* Pseudo Save display mode when not actively editing. */}
                {false === isSelected && true === moreEnabled && (
                    <li className="item">
                        <div className="read-more">
                            View More
                        </div>
                        <RichText.Content
                            tagName="ul"
                            className="list hidden-list"
                            value={moreList}
                            style={{ display: 'none' }}
                        />
                    </li>
                )}
            </ul>
        </Fragment>
    );
};

export default edit;
