import classNames from 'classnames/bind';
import { Fragment } from '@wordpress/element';
import { Item } from 'semantic-ui-react';

import Controls from './controls';
import Image from './image';
import Description from './description';
import Extra from './extra';
import Header from './header';

import WpQueryPinControls from '../../wpQueryPinControl'; // Supports pinning items to the wpQuery block using block context.

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
    enableExcerptBelow,
    enableExtra,
    enableBreakingNews,
    enableProgramsTaxonomy,
    className,
    isSelected,
    setAttributes,
    wpQueryContext = false,
    rootClientId,
}) => {
    const controlProps = {
        postID,
        link,
        imageSlot,
        enableHeader,
        enableExcerpt,
        enableExcerptBelow,
        enableExtra,
        enableBreakingNews,
        enableEmphasis,
        enableProgramsTaxonomy,
        setAttributes,
        inline: undefined === rootClientId,
    };

    let dataHandler = setAttributes;
    // If the story item is not currently in focus (! isSelected) then set the dataHandler (usually setAttributes but could be any state manager) to false to disable all editing and save on performance.
    if (!isSelected) {
        dataHandler = false;
    }

    let enableAltHeaderWeight = false;
    if (false === enableExcerpt) {
        enableAltHeaderWeight = true;
    }

    let taxonomy = 'Formats';
    if (true === enableProgramsTaxonomy) {
        taxonomy = 'Programs';
    }

    const classes = classNames(className, 'story', {
        stacked: ('left' === imageSlot || 'right' === imageSlot),
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
        <Fragment>
            {false !== wpQueryContext && (
                <WpQueryPinControls
                    wpQueryContext={wpQueryContext}
                    rootClientId={rootClientId}
                    postId={postID}
                />
            )}
            <Item as="article" className={classes}>
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
            {true === isSelected && <Controls {...controlProps} />}
        </Fragment>
    );
};

export default StoryItem;
