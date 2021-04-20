import classNames from 'classnames/bind';
import { Fragment, RawHTML } from '@wordpress/element';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Item } from 'semantic-ui-react';

import Image from './image';
import Description from './description';
import Extra from './extra';
import Header from './header';

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
    headerSize,
    enableEmphasis,
    enableHeader,
    enableMeta,
    enableExcerpt,
    enableExcerptBelow,
    enableExtra,
    enableBreakingNews,
    extraContent = false,
    className,
    inLoop = false,
}) => {
    const isSmall = useMediaQuery('(max-width: 990px)');

    let enableAltHeaderWeight = false;
    if (false === enableExcerpt) {
        enableAltHeaderWeight = true;
    }

    let isStacked = true;
    if ('left' === imageSlot || 'right' === imageSlot) {
        isStacked = false;
    }

    let isStyleMobileLoop = false;
    if (true === inLoop && true === isSmall) {
        isStyleMobileLoop = true;
    }
    // On mobile, outside the loop, force image alignment top.
    if (false === inLoop && true === isSmall && 'disabled' !== imageSlot) {
        imageSlot = 'top';
    }

    if ( isStyleMobileLoop ) {
        imageSlot = 'left';
        imageSize = 'A3';
    }

    const classes = classNames(className, 'story', {
        stacked: isStacked,
        bordered: enableEmphasis,
        'alt-description': enableExcerptBelow,
        'is-style-mobile-loop': isStyleMobileLoop,
    });

    const Img = () => {
        return (
            <Image
                img={image}
                size={imageSize}
                link={link}
                slot={imageSlot}
                chartArt={isChartArt}
                onClick={() => {
                    window.location = link;
                }}
            />
        );
    };

    const TopAndLeftSlot = () => {
        if ('top' !== imageSlot && 'left' !== imageSlot) {
            return <Fragment />;
        }

        if (true === inLoop && true === isSmall) {
            return <Fragment />;
        }

        return <Img />;
    };

    const DefaultSlot = () => {
        if ('default' !== imageSlot) {
            return <Fragment />;
        }

        if (true === inLoop && true === isSmall) {
            return <Fragment />;
        }

        return <Img />;
    };

    const BottomAndRightSlot = () => {
        if ('bottom' !== imageSlot && 'right' !== imageSlot) {
            return <Fragment />;
        }

        if (true === inLoop && true === isSmall) {
            return <Fragment />;
        }

        return <Img />;
    };

    return (
        <Item as="article" className={classes}>
            <TopAndLeftSlot />

            <Item.Content>
                <Header
                    enabled={{enableHeader, enableMeta}}
                    title={title}
                    date={date}
                    label={label}
                    link={link}
                    size={headerSize}
                    isStyleMobileLoop={isStyleMobileLoop}
                    image={image}
                    imageSize={imageSize}
                    chartArt={isChartArt}
                    altHeaderWeight={enableAltHeaderWeight}
                />

                <DefaultSlot />

                {true !== enableExcerptBelow && (
                    <Description
                        enabled={enableExcerpt}
                        content={excerpt}
                        sansSerif={!enableHeader || !enableMeta}
                    />
                )}

                {true === enableExcerptBelow && true === isSmall && (
                    <Description
                        enabled={enableExcerpt}
                        content={excerpt}
                        sansSerif={!enableHeader}
                    />
                )}

                <Extra
                    enabled={enableExtra}
                    content={extra}
                    breakingNews={enableBreakingNews}
                />

                {false !== extraContent && <RawHTML>{extraContent}</RawHTML>}
            </Item.Content>

            <BottomAndRightSlot />

            {true === enableExcerptBelow && false === isSmall && (
                <Description
                    enabled={enableExcerpt}
                    content={excerpt}
                    sansSerif={!enableHeader}
                />
            )}
        </Item>
    );
};

export default StoryItem;
