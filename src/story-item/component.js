// WordPress Core
import { Component, Fragment } from '@wordpress/element';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

// Utilities
import classNames from 'classnames/bind';

import { Item } from 'semantic-ui-react';
import { Image, Kicker, KickerEditor } from '../_shared';

const Description = function({ content, enabled, setAttributes, sansSerif }) {
    const classes = classNames('description', { 'sans-serif': sansSerif });
    return (
        <Fragment>
            {true === enabled && (
                <Fragment>
                    {false !== setAttributes && (
                        <RichText
                            tagName="div"
                            value={content}
                            onChange={excerpt => setAttributes({ excerpt })}
                            placeholder={content}
                            multiline="p"
                            className={classes}
                        />
                    )}
                    {false === setAttributes && (
                        <RichText.Content
                            tagName="div"
                            value={content}
                            className={classes}
                        />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

const Extra = function({ enabled, content, setAttributes }) {
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
        </Fragment>
    );
};

const BreakingNews = function({ enabled, label, url }) {
    return (
        <Fragment>
            {true === enabled && (
                <a href={url} className="kicker-breaking-news">
                    {label}
                </a>
            )}
        </Fragment>
    );
};

const Header = function({
    title,
    label,
    date,
    link,
    enabled,
    size,
    taxonomy,
    setAttributes,
}) {
    const currentSize = size;
    const PostTitle = ({ title, link, as = 'a' }) => {
        return <RichText.Content href={link} tagName={as} value={title} />;
    };
    const createSizeControls = function(size) {
        let active = false;
        if (size === currentSize) {
            active = true;
        }
        return {
            icon: 'editor-textcolor',
            title: `Size: ${size}`,
            isActive: active,
            onClick: () => {
                setAttributes({ headerSize: size });
            },
        };
    };
    return (
        <Fragment>
            {true === enabled && (
                <Fragment>
                    <Item.Meta>
                        {false !== setAttributes && (
                            <KickerEditor
                                date={date}
                                label={label}
                                taxonomy={taxonomy}
                                setAttributes={setAttributes}
                            />
                        )}
                        {false === setAttributes && (
                            <Kicker label={label} date={date} />
                        )}
                    </Item.Meta>
                    <Item.Header className={size}>
                        {false !== setAttributes && (
                            <Fragment>
                                <BlockControls>
                                    <Toolbar
                                        controls={[
                                            'small',
                                            'normal',
                                            'large',
                                        ].map(createSizeControls)}
                                    />
                                </BlockControls>
                                <RichText
                                    tagName="div" // The tag here is the element output and editable in the admin
                                    value={title} // Any existing content, either from the database or an attribute default
                                    onChange={title => setAttributes({ title })} // Store updated content as a block attribute
                                    placeholder="Title" // Display this text before any content has been added by the user
                                    multiline="br"
                                />
                            </Fragment>
                        )}
                        {false === setAttributes && (
                            <PostTitle
                                title={title}
                                link={link}
                                as="a"
                                size={size}
                            />
                        )}
                    </Item.Header>
                </Fragment>
            )}
        </Fragment>
    );
};

class StoryItem extends Component {
    constructor(props) {
        super(props);
        this.item = this.item.bind(this);
    }

    item = attrs => {
        return (
            <Item as="article" className={attrs.classes}>
                {('top' === attrs.imageSlot || 'left' === attrs.imageSlot) && (
                    <Image
                        img={attrs.image}
                        size={attrs.imageSize}
                        link={attrs.link}
                        slot={attrs.imageSlot}
                        chartArt={attrs.isChartArt}
                        dataHandler={attrs.setAttributes}
                    />
                )}

                <Item.Content>
                    <Header
                        title={attrs.title}
                        date={attrs.date}
                        label={attrs.label}
                        link={attrs.link}
                        setAttributes={attrs.setAttributes}
                        enabled={attrs.enableHeader}
                        size={attrs.headerSize}
                        taxonomy={attrs.taxonomy} // Where??
                    />

                    {'default' === attrs.imageSlot && (
                        <Image
                            img={attrs.image}
                            size={attrs.imageSize}
                            link={attrs.link}
                            slot={attrs.imageSlot}
                            chartArt={attrs.isChartArt}
                            dataHandler={attrs.setAttributes}
                        />
                    )}

                    <Description
                        content={attrs.excerpt}
                        enabled={attrs.enableExcerpt}
                        setAttributes={attrs.setAttributes}
                        sansSerif={!attrs.enableHeader}
                    />

                    <Extra
                        enabled={attrs.enableExtra}
                        content={attrs.extra}
                        setAttributes={attrs.setAttributes}
                    />

                    {false !== window.prcBreakingNews && (
                        <BreakingNews
                            enabled={attrs.enableBreakingNews}
                            label={window.prcBreakingNews.label}
                            url={window.prcBreakingNews.url}
                        />
                    )}
                </Item.Content>

                {('bottom' === attrs.imageSlot ||
                    'right' === attrs.imageSlot) && (
                    <Image
                        img={attrs.image}
                        size={attrs.imageSize}
                        link={attrs.link}
                        slot={attrs.imageSlot}
                        chartArt={attrs.isChartArt}
                        dataHandler={attrs.setAttributes}
                    />
                )}
            </Item>
        );
    };

    render() {
        // If the block is not selected, it is not in edit mode, disable setAttributes.
        if (
            undefined === this.props.isSelected ||
            true !== this.props.isSelected
        ) {
            this.props.setAttributes = false;
        }

        this.props.attributes.taxonomy = 'Formats';
        if (true === this.props.attributes.enableProgramsTaxonomy) {
            this.props.attributes.taxonomy = 'Programs';
        }

        let isStacked = true;
        if (
            'left' === this.props.attributes.imageSlot ||
            'right' === this.props.attributes.imageSlot
        ) {
            isStacked = false;
        }

        let isBordered = false;
        if (true === this.props.attributes.emphasis) {
            isBordered = true;
        }

        this.props.attributes.classes = classNames(
            this.props.attributes.className,
            'story-item',
            { stacked: isStacked, bordered: isBordered },
        );

        const attrs = this.props.attributes;
        attrs.setAttributes = this.props.setAttributes;

        return (
            <Fragment>
                <this.item {...attrs} />
            </Fragment>
        );
    }
}

export default StoryItem;
