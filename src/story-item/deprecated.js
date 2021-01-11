
import classNames from 'classnames/bind';
import { Fragment, RawHTML } from '@wordpress/element';
import metadata from './block.json';

const { supports } = metadata;

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
    // Migration from V1
    {
        // First you have to define all the old attributes as they were...
        attributes: {
            title: {
                type: 'string',
                default: 'Title',
            },
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
            link: {
                type: 'string',
                default: '',
            },
            label: {
                type: 'string',
                default: 'Report',
            },
            date: {
                type: 'string',
            },
            // Images
            image: {
                type: 'string',
                default: '',
            },
            imageSlot: {
                type: 'string',
                default: 'default',
            },
            imageSize: {
                type: 'string',
                default: 'A1',
            },
            isChartArt: {
                type: 'boolean',
                default: false,
            },
            // Post Meta Data:
            postID: {
                type: 'integer',
            },
            // Item Options
            headerSize: {
                type: 'string',
                default: 'large',
            },
            enableAltHeaderWeight: {
                type: 'boolean',
                default: false,
            },
            enableEmphasis: {
                type: 'boolean',
                default: false,
            },
            enableHeader: {
                type: 'boolean',
                default: true,
            },
            enableExcerpt: {
                type: 'boolean',
                default: true,
            },
            enableExcerptBelow: {
                type: 'boolean',
                default: false,
            },
            enableExtra: {
                type: 'boolean',
                default: false,
            },
            enableBreakingNews: {
                type: 'boolean',
                default: false,
            },
            enableProgramsTaxonomy: {
                type: 'boolean',
                default: false,
            },
        },
        // Define all the old supports (this hasnt changed so we'll just use whats defined in block.json)
        supports,
        migrate( props ) {
            console.log("MIGRATE", props);
            if ( 'large' === props.headerSize ) {
                props.headerSize = 1;
            }
            if ( 'normal' === props.headerSize ) {
                props.headerSize = 2;
            }
            if ( 'small' === props.headerSize ) {
                props.headerSize = 3;
            }
            return props
        },
        save( props ) {
            console.log("Migration Save...", props);
            const { attributes } = props;
            return <LegacyStoryItem {...attributes} />;        
        },
        isEligible( attributes ) {
            console.log('is eligible?', attributes);
            return true;
        }
    }
];

export default deprecated;
