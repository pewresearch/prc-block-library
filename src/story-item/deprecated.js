
import classNames from 'classnames/bind';
import { Fragment, RawHTML } from '@wordpress/element';
import metadata from './block.json';

const { attributes } = metadata;

/**
 * Outputs static html data store for Story Item. Defaults to placeholder loading effect.
 * Mimics the layout of the final renderd component.
 * @param {*} param
 */
const LegacyStoryItem = ({
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
    enableExcerptBelow,
    enableExtra,
    enableBreakingNews,
    className,
}) => {
    let stacked = 'stacked';
    if ('left' === imageSlot || 'right' === imageSlot) {
        stacked = null;
    }
    const classes = classNames(className, 'react-story-item');

    const Img = () => {
        return (
            <div className={`${imageSize} image`}>
                <div className="ui fluid placeholder">
                    <div className="image" />
                </div>
            </div>
        );
    };

    const TopAndLeftSlot = () => {
        if ('top' !== imageSlot && 'left' !== imageSlot) {
            return <Fragment />;
        }

        return <Img />;
    };

    const BottomAndRightSlot = () => {
        if ('bottom' !== imageSlot && 'right' !== imageSlot) {
            return <Fragment />;
        }

        return <Img />;
    };

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
            data-excerptbelow={enableExcerptBelow}
            data-chartArt={isChartArt}
        >
            <div
                id={`post-${postID}`}
                className={`ui item story is-style-${imageSlot} ${stacked}`}
            >
                <TopAndLeftSlot />
                <div className="content">
                    <div className="ui fluid placeholder">
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
                <BottomAndRightSlot />
                <div className="hidden">
                    {true === enableHeader && (
                        <div className="title">
                            <RawHTML>{title}</RawHTML>
                        </div>
                    )}
                    {true === enableExcerpt && (
                        <div className="description">
                            <RawHTML>{excerpt}</RawHTML>
                        </div>
                    )}
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

const deprecated = [
    {
        attributes: {
            excerpt: {
                type: 'string',
                source: 'html',
                multiline: 'p',
                selector: '.description',
                default: '<p>Excerpt</p>',
            },
            extra: {
                type: 'string',
                source: 'html',
                multiline: 'li',
                selector: '.extra',
                default: '',
            },
            // headerSize: {
            //     type: 'string',
            //     default: 'normal',
            // },
            ...attributes
        },

        migrate( { excerpt, extra, headerSize } ) {
            return {
                excerpt,
                extra,
            };
        },

        save( props ) {
            const { attributes } = props;
            return <LegacyStoryItem {...attributes} />;        
        },
    }
];

export default deprecated;
