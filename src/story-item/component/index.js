import classNames from 'classnames/bind';

import { Item } from 'semantic-ui-react';
import Description from './description';
import Extra from './extra';
import Header from './header';

import { Image } from 'shared';

const StoryItem = props => {
    console.info('What is in StoryItem');
    console.log(props);
    // If the block is not selected, it is not in edit mode, disable setAttributes.
    if (
        undefined === props.isSelected ||
        true !== props.isSelected
    ) {
        props.setAttributes = false;
    }

    props.attributes.taxonomy = 'Formats';
    if (true === props.attributes.enableProgramsTaxonomy) {
        props.attributes.taxonomy = 'Programs';
    }

    let isStacked = true;
    if (
        'left' === props.attributes.imageSlot ||
        'right' === props.attributes.imageSlot
    ) {
        isStacked = false;
    }

    let isBordered = false;
    if (true === props.attributes.emphasis) {
        isBordered = true;
    }

    props.attributes.classes = classNames(
        props.attributes.className,
        'story-item',
        { stacked: isStacked, bordered: isBordered },
    );

    const attrs = props.attributes;
    attrs.setAttributes = props.setAttributes;

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
                    breakingNews={attrs.enableBreakingNews}
                />
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
}

export default StoryItem;
