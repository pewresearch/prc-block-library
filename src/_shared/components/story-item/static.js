import classNames from 'classnames/bind';
import { RawHTML } from '@wordpress/element';

/**
 * Outputs static html data store for Story Item. Defaults to placeholder loading effect.
 * Mimics the layout of the final renderd component.
 * @param {*} param
 */
const StoryItem = ({
    postID,
    title,
    excerpt,
    extra,
    link,
    label,
    date,
    image,
    imageSlot,
    imageSize,
    isChartArt,
    headerSize,
    enableEmphasis,
    enableHeader,
    enableExcerpt,
    enableExtra,
    enableBreakingNews,
    className,
}) => {
    const classes = classNames(className, 'react-story-item');
    return (
        <div
            className={classes}
            data-label={label}
            data-date={date}
            data-link={link}
            data-image={image}
            data-imageSlot={imageSlot}
            data-imageSize={imageSize}
            data-headerSize={headerSize}
            data-className={className}
            data-emphasis={enableEmphasis}
            data-breakingNews={enableBreakingNews}
            data-chartArt={isChartArt}
        >
            <div
                id={`post-${postID}`}
                className={`ui item story-item is-style-${imageSlot}`}
            >
                <div className={`${imageSize} image`}>
                    <div className="ui fluid placeholder">
                        <div className="rectangular image" />
                    </div>
                </div>
                <div className="content">
                    <div className="ui fluid placeholder">
                        <div className="paragraph">
                            <div className="medium line" />
                        </div>
                        <div className="header">
                            <div className="line" />
                            <div className="line" />
                        </div>
                        <div className="paragraph">
                            <div className="line" />
                            <div className="line" />
                            <div className="line" />
                            <div className="line" />
                            <div className="line" />
                        </div>
                    </div>
                </div>
                <div className="hidden">
                    <div className="title">
                        <RawHTML>{title}</RawHTML>
                    </div>
                    <div className="description">
                        <RawHTML>{excerpt}</RawHTML>
                    </div>
                    {true === enableExtra && (
                        <ul className="extra">
                            <RawHTML>{extra}</RawHTML>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryItem;
