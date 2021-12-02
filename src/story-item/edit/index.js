/**
 * External Dependencies
 */
import classNames from 'classnames/bind';
import { Item } from 'semantic-ui-react';
import { ifMatchSetAttribute, StoryItem } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import {Controls, Placeholder} from './controls';
import Image from './image';
import Description from './description';
import Extra from './extra';
import Header from './header';
import { getAttributesFromURL } from './helpers';

const classDictionary = [
    'is-style-default',
    'is-style-left',
    'is-style-right',
    'is-style-top',
    'is-style-bottom',
    'is-style-disabled',
];

/**
 * To be removed at later date:
*/
const handleExcerptAndPostIdUpdate = (attributes, setAttributes = false) => {
    const payload = {};
    if (!attributes.postId && attributes.postID) {
        payload.postId = attributes.postID;
    }
    if (!attributes.description && attributes.excerpt && 0 !== attributes.excerpt.length) {
        payload.description = attributes.excerpt;
    }
    if ( 0 !== Object.keys(payload).length && false !== setAttributes ) {
        console.log('handleExcerptAndPostIdUpdate', attributes, payload);
        setAttributes({...payload});
    }
}

const edit = ({ attributes, setAttributes, isSelected, clientId, context }) => {
    const {
        title,
        description,
        extra,
        link,
        label,
        date,
        image,
        imageSlot,
        imageSize,
        isChartArt,
        postId,
        headerSize,
        enableEmphasis,
        enableHeader,
        enableExcerpt, // @TODO need to rename this to enableDescription
        enableExcerptBelow, // @TODO need to rename this to enableDescriptionBelow
        enableExtra,
        enableBreakingNews,
        enableMeta,
        metaTaxonomy,
        isTransformed, // Signal to run auto lookup, this is primarily for pasting a link into the editor blindly and it auto converting to a story item.
        className,
    } = attributes;

    useEffect(()=>{
        if ( true === isTransformed ) {
            getAttributesFromURL(link).then(attrs => {
                setAttributes({isTransformed: false, ...attrs});
            });
        }
    }, [isTransformed]);

    useEffect(()=> {
        handleExcerptAndPostIdUpdate(attributes, setAttributes);
    }, []);

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

    const blockProps = useBlockProps();

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

    //
    // Display Component
    //

    if ( undefined === postId ) {
        return <Placeholder attributes={attributes} setAttributes={setAttributes} blockProps={blockProps}/>
    }

    if ( true !== isSelected ) {
        return <div {...blockProps}><StoryItem {...attributes}/></div>
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
            <div {...blockProps}>
                <article className={classNames(className, 'item', 'story', `is-style-${imageSlot}`, {
                    stacked: 'top' === imageSlot || 'bottom' === imageSlot,
                    bordered: enableEmphasis,
                    'alt-description': enableExcerptBelow,
                })}>
                    <TopAndLeftSlot />

                    <Item.Content>
                        <Header
                            enabled={{enableHeader, enableMeta}}
                            title={title}
                            date={date}
                            label={label}
                            link={link}
                            size={headerSize}
                            taxonomy={metaTaxonomy}
                            setAttributes={setAttributes}
                            altHeaderWeight={enableAltHeaderWeight}
                        />

                        <DefaultSlot />

                        {true !== enableExcerptBelow && (
                            <Description
                                enabled={enableExcerpt}
                                content={description}
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
                            content={description}
                            sansSerif={!enableHeader}
                            setAttributes={setAttributes}
                        />
                    )}
                </article>
            </div>
        </Fragment>
    );
};

export default edit;
