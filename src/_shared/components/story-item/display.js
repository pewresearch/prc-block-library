import classNames from 'classnames/bind';
import { Fragment } from '@wordpress/element';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Item } from 'semantic-ui-react';
import { Display as Image } from './image';
import { Display as Description } from './description';
import { Display as Extra } from './extra';
import { Display as Header } from './header';

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
    enableExcerpt,
    enableExcerptBelow,
    enableExtra,
    enableBreakingNews,
    className,
    inLoop = false,
}) => {
    console.log('<StoryItem Display>');
    const isSmall = useMediaQuery('(max-width: 767px)');

    let isStacked = true;
    if ('left' === imageSlot || 'right' === imageSlot) {
        isStacked = false;
    }

    let isStyleMobileLoop = false;
    if (true === inLoop && true === isSmall) {
        isStyleMobileLoop = true;
    }

    if (false === inLoop && true === isSmall) {
        imageSlot = 'top';
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
                    enabled={enableHeader}
                    title={title}
                    date={date}
                    label={label}
                    link={link}
                    size={headerSize}
                    isStyleMobileLoop={isStyleMobileLoop}
                    image={image}
                    imageSize={imageSize}
                    chartArt={isChartArt}
                />

                <DefaultSlot />

                {true !== enableExcerptBelow && (
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
            </Item.Content>

            <BottomAndRightSlot />

            {true === enableExcerptBelow && (
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
