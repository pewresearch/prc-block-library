import classNames from 'classnames/bind';
import { Item } from 'semantic-ui-react';

import Image from './image';
import Description from './description';
import Extra from './extra';
import Header from './header';

import './style.scss';

const StoryItem = ({
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
    postID,
    headerSize,
    enableEmphasis,
    enableHeader,
    enableExcerpt,
    enableExtra,
    enableBreakingNews,
    enableProgramsTaxonomy,
    className,
    isSelected,
    setAttributes,
}) => {
    let taxonomy = 'Formats';
    if (true === enableProgramsTaxonomy) {
        taxonomy = 'Programs';
    }
    let isStacked = true;
    if ('left' === imageSlot || 'right' === imageSlot) {
        isStacked = false;
    }

    let dataHandler = setAttributes;
    // If the story item is not currently in focus, !isSelected, then set the dataHandler (usually setAttributes but could be any state manager) to false to disable all editing and save on hook performance.
    if (!isSelected) {
        dataHandler = false;
    }

    const classes = classNames(className, 'story-item', {
        stacked: isStacked,
        bordered: enableEmphasis,
    });

    return (
        <Item as="article" className={classes}>
            {('top' === imageSlot || 'left' === imageSlot) && (
                <Image
                    img={image}
                    size={imageSize}
                    link={link}
                    slot={imageSlot}
                    chartArt={isChartArt}
                    postId={postID}
                    setAttributes={dataHandler}
                />
            )}

            <Item.Content>
                <Header
                    enabled={enableHeader}
                    title={title}
                    date={date}
                    label={label}
                    link={link}
                    size={headerSize}
                    taxonomy={taxonomy}
                    setAttributes={dataHandler}
                />

                {'default' === imageSlot && (
                    <Image
                        img={image}
                        size={imageSize}
                        link={link}
                        slot={imageSlot}
                        chartArt={isChartArt}
                        postId={postID}
                        setAttributes={dataHandler}
                    />
                )}

                <Description
                    enabled={enableExcerpt}
                    content={excerpt}
                    sansSerif={!enableHeader}
                    setAttributes={dataHandler}
                />

                <Extra
                    enabled={enableExtra}
                    content={extra}
                    breakingNews={enableBreakingNews}
                    setAttributes={dataHandler}
                />
            </Item.Content>

            {('bottom' === imageSlot || 'right' === imageSlot) && (
                <Image
                    img={image}
                    size={imageSize}
                    link={link}
                    slot={imageSlot}
                    chartArt={isChartArt}
                    postId={postID}
                    setAttributes={dataHandler}
                />
            )}
        </Item>
    );
};

export default StoryItem;
