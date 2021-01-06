import classNames from 'classnames/bind';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Item } from 'semantic-ui-react';
import { ifMatchSetAttribute } from 'shared';

import Controls from './controls';
import Image from './image';
import Description from './description';
import Extra from './extra';
import Header from './header';

// Sets the image slot based on the style classname selected.
const setImageSlotByClassName = (className, setAttributes) => {
    ifMatchSetAttribute(
        'is-style-top',
        className,
        'imageSlot',
        'top',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-bottom',
        className,
        'imageSlot',
        'bottom',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-left',
        className,
        'imageSlot',
        'left',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-right',
        className,
        'imageSlot',
        'right',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-disabled',
        className,
        'imageSlot',
        'disabled',
        setAttributes,
    );
    // Default
    ifMatchSetAttribute(
        'is-style-default',
        className,
        'imageSlot',
        'default',
        setAttributes,
    );
};

const edit = ({ attributes, setAttributes, isSelected, clientId, context }) => {
    const {
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
    } = attributes;

    const { rootClientId } = useSelect(
        select => {
            return {
                rootClientId: select('core/block-editor').getBlockRootClientId(
                    clientId,
                ),
            };
        },
        [clientId],
    );


    let dataHandler = setAttributes;
    let enableAltHeaderWeight = !enableExcerpt;
    let taxonomy = enableProgramsTaxonomy ? 'Programs' : 'Formats';

    const classes = classNames(className, 'story', {
        stacked: ('top' === imageSlot || 'bottom' === imageSlot),
        bordered: enableEmphasis,
        'alt-description': enableExcerptBelow,
    });

    setImageSlotByClassName(className, setAttributes);

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

    return(
        <Fragment>
            {true === isSelected && (
                <Controls {...{
                    attributes,
                    setAttributes,
                    context: context.hasOwnProperty('prc-block/wp-query') ? JSON.parse(context['prc-block/wp-query']) : false,
                    rootClientId,
                }}/>
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
        </Fragment>
    );
};

export default edit;