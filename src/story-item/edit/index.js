/**
 * External Dependencies
 */
import { Item } from 'semantic-ui-react';
import { ifMatchSetAttribute, StoryItem } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import classNames from 'classnames/bind';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import Image from './image';
import Description from './description';
import Extra from './extra';
import Header from './header';
import Placeholder from './placeholder';

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
        postId = postID,
        headerSize,
        enableEmphasis,
        enableHeader,
        enableExcerpt,
        enableExcerptBelow,
        enableExtra,
        enableBreakingNews,
        enableProgramsTaxonomy,
        enableMeta,
        className,
    } = attributes;

    if ( null === postId ) {
        <Placeholder />
    }

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

    const dataHandler = setAttributes;
    const enableAltHeaderWeight = !enableExcerpt;
    const taxonomy = enableProgramsTaxonomy ? 'Programs' : 'Formats';

    const classes = classNames(className, 'story', {
        stacked: 'top' === imageSlot || 'bottom' === imageSlot,
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
                postId={postId}
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
            {true === isSelected && (
                <Fragment>
                <Controls
                {...{
                    attributes,
                    setAttributes,
                    context: context.hasOwnProperty('prc-block/wp-query')
                        ? JSON.parse(context['prc-block/wp-query'])
                        : false,
                    rootClientId,
                }}
                />
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
                            taxonomy={taxonomy}
                            setAttributes={dataHandler}
                            altHeaderWeight={enableAltHeaderWeight}
                        />

                        <DefaultSlot />

                        {true !== enableExcerptBelow && (
                            <Description
                                enabled={enableExcerpt}
                                content={excerpt}
                                sansSerif={!enableMeta || !enableHeader}
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
            )}
            {true !== isSelected && <StoryItem {...attributes}/>}
        </Fragment>
    );
};

export default edit;
