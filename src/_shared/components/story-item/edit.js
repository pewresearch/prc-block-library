import classNames from 'classnames/bind';
import { Fragment } from '@wordpress/element';
import { Item } from 'semantic-ui-react';
import { Edit as Image } from './image';
import { Edit as Description } from './description';
import { Edit as Extra } from './extra';
import { Edit as Header } from './header';
import WpQueryPinControls from '../wpQueryPinControl';

import './edit.scss';

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
    enableExcerptBelow,
    enableExtra,
    enableBreakingNews,
    enableProgramsTaxonomy,
    className,
    isSelected,
    setAttributes,
    wpQueryContext,
    rootClientId,
}) => {
    let enableAltHeaderWeight = false;
    if (false === enableExcerpt) {
        enableAltHeaderWeight = true;
    }

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

    const classes = classNames(className, 'story', {
        stacked: isStacked,
        bordered: enableEmphasis,
        'alt-description': enableExcerptBelow,
    });

    const Img = () => {
        return (
            <Image
                img={image}
                size={imageSize}
                link={link}
                slot={imageSlot}
                chartArt={isChartArt}
                postId={postID}
                setAttributes={dataHandler}
            />
        );
    };

    const TopAndLeftSlot = () => {
        if ('top' !== imageSlot && 'left' !== imageSlot) {
            return <Fragment />;
        }

        return <Img />;
    };

    const DefaultSlot = () => {
        if ('default' !== imageSlot) {
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
        <Item as="article" className={classes}>
            {false !== wpQueryContext && (
                <WpQueryPinControls
                    wpQueryContext={wpQueryContext}
                    rootClientId={rootClientId}
                    postId={postID}
                />
            )}
            <TopAndLeftSlot />

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
                    altHeaderWeight={enableAltHeaderWeight}
                />

                <DefaultSlot />

                {true !== enableExcerptBelow && (
                    <Description
                        enabled={enableExcerpt}
                        content={excerpt}
                        sansSerif={!enableHeader}
                        setAttributes={dataHandler}
                    />
                )}

                <Extra
                    enabled={enableExtra}
                    content={extra}
                    breakingNews={enableBreakingNews}
                    setAttributes={dataHandler}
                />
            </Item.Content>

            <BottomAndRightSlot />

            {true === enableExcerptBelow && (
                <Description
                    enabled={enableExcerpt}
                    content={excerpt}
                    sansSerif={!enableHeader}
                    setAttributes={dataHandler}
                />
            )}
        </Item>
    );
};

export default StoryItem;
