/**
 * External Dependencies
 */
import { Item } from 'semantic-ui-react';
import { ifMatchSetAttribute, StoryItem } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import classNames from 'classnames/bind';
import { Fragment, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import {Controls, Placeholder} from './controls';
import Image from './image';
import Description from './description';
import Extra from './extra';
import Header from './header';
import Preview from './preview';
import {getAttributesFromURL} from './helpers';

const setOptionsFromStyle = (className, setAttributes) => {
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
        enableAltTaxonomy,
        enableMeta,
        isTransformed,
        className,
    } = attributes;

    useEffect(()=>{
        if ( true === isTransformed ) {
            getAttributesFromURL(link).then(attrs => {
                setAttributes({isTransformed: false, ...attrs});
            });
        }
    }, [isTransformed]);

    const postId = postID;

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

    const enableAltHeaderWeight = !enableExcerpt;
    const taxonomy = enableAltTaxonomy ? 'research-teams' : 'Formats';

    const classes = classNames(className, 'story', {
        stacked: 'top' === imageSlot || 'bottom' === imageSlot,
        bordered: enableEmphasis,
        'alt-description': enableExcerptBelow,
    });

    // setImageSlotByClassName(className, setAttributes);

    const Img = () => {
        return (
            <Image
                img={image}
                size={imageSize}
                link={link}
                slot={imageSlot}
                chartArt={isChartArt}
                postId={postId}
                setAttributes={setAttributes}
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

    if ( undefined === postId ) {
        return <Placeholder attributes={attributes} setAttributes={setAttributes}/>
    }

    if ( true !== isSelected ) {
        return <StoryItem {...attributes}/>
    }

    return (
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
                        setAttributes={setAttributes}
                        altHeaderWeight={enableAltHeaderWeight}
                    />

                    <DefaultSlot />

                    {true !== enableExcerptBelow && (
                        <Description
                            enabled={enableExcerpt}
                            content={excerpt}
                            sansSerif={!enableMeta || !enableHeader}
                            setAttributes={setAttributes}
                        />
                    )}

                    <Extra
                        enabled={enableExtra}
                        content={extra}
                        breakingNews={enableBreakingNews}
                        setAttributes={setAttributes}
                    />
                </Item.Content>

                <BottomAndRightSlot />

                {true === enableExcerptBelow && (
                    <Description
                        enabled={enableExcerpt}
                        content={excerpt}
                        sansSerif={!enableHeader}
                        setAttributes={setAttributes}
                    />
                )}
            </Item>
        </Fragment>
    );
};

export default edit;
