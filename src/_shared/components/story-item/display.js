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
    enableExtra,
    enableBreakingNews,
    className,
    inLoop = false,
}) => {
    console.log('<StoryItem Display>');

    let isStacked = true;
    if ('left' === imageSlot || 'right' === imageSlot) {
        isStacked = false;
    }

    const classes = classNames(className, 'story-item', {
        stacked: isStacked,
        bordered: enableEmphasis,
    });

    const isSmall = useMediaQuery('(max-width: 48rem)');

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
                    inLoop={inLoop}
                    isSmall={isSmall}
                    image={image}
                    imageSize={imageSize}
                    chartArt={isChartArt}
                />

                <DefaultSlot />

                <Description
                    enabled={enableExcerpt}
                    content={excerpt}
                    sansSerif={!enableHeader}
                />

                <Extra
                    enabled={enableExtra}
                    content={extra}
                    breakingNews={enableBreakingNews}
                />
            </Item.Content>

            <BottomAndRightSlot />
        </Item>
    );
};

export default StoryItem;
