/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

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
    // Convert old attributes to new attributes.
    payload.enableDescription = attributes.enableExcerpt;
    payload.url = attributes.link;

    if ( 0 !== Object.keys(payload).length && false !== setAttributes ) {
        console.log('handleExcerptAndPostIdUpdate', attributes, payload);
        setAttributes({...payload});
    }
}

const getBlockAttributes = (attributes, context) => {
    // Convert old enableExcerpt attribute to enableDescription.
    attributes.enableDescription = attributes.enableDescription !== attributes.enableExcerpt ? attributes.enableExcerpt : attributes.enableDescription;

    // Convert old enableExcerptBelow attribute to enableDescriptionBelow.
    attributes.enableDescriptionBelow = attributes.enableDescriptionBelow !== attributes.enableExcerptBelow ? attributes.enableExcerptBelow : attributes.enableDescriptionBelow;

    // Convert old link attribute to url attribnute.
    attributes.url = attributes.url !== attributes.link ? attributes.link : attributes.url;

    // Check if block context is in a query loop and if so set inLoop to true.
    attributes.inLoop = context.hasOwnProperty('queryId') && context.queryId > 0 ? true : attributes.inLoop;
    
    console.log('getBlockAttributes', attributes, context);

    return attributes;
}

const edit = ({ attributes, setAttributes, isSelected, clientId, context }) => {
    const {
        title,
        description,
        extra,
        url,
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
        enableDescription,
        enableDescriptionBelow,
        enableExtra,
        enableBreakingNews,
        enableMeta,
        metaTaxonomy,
        inLoop,
        isTransformed, // Signal to run auto lookup, this is primarily for pasting a link into the editor blindly and it auto converting to a story item.
        className,
    } = getBlockAttributes(attributes, context);

    /**
     * Handle transform from a pewresearch.[org|local] link into a story item.
     */
    useEffect(()=>{
        if ( true === isTransformed ) {
            getAttributesFromURL(url).then(attrs => {
                setAttributes({isTransformed: false, ...attrs});
            });
        }
    }, [isTransformed]);

    //@TODO  If in loop we should get title, image, label, date, and description from the postId. 
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

    const enableAltHeaderWeight = !enableDescription;

    const logicalClasses = {
        bordered: enableEmphasis,
        'alt-description': enableDescriptionBelow,
    };
    if ( 'disbaled' !== imageSlot ) {
        logicalClasses[imageSlot] = true;
        logicalClasses['aligned'] = true;
    }
    const blockPropsArgs = {
        className: classNames('story item', className, logicalClasses),
    }
    if ( 'disabled' !== imageSlot && imageSize.length > 0) {
        blockPropsArgs['data-image-size'] = imageSize;
    }
    const blockProps = useBlockProps(blockPropsArgs);

    if ( !inLoop && undefined === postId ) {
        return <Placeholder attributes={attributes} setAttributes={setAttributes} blockProps={blockProps}/>
    }

    return (
        <Fragment>
            <Controls
                {...{
                    attributes,
                    setAttributes,
                    context,
                    rootClientId,
                }}
            />
            <article {...blockProps}>
                <Image
                    img={image}
                    size={imageSize}
                    slot={imageSlot}
                    chartArt={isChartArt}
                    postId={postId}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                />

                <Header
                    enabled={{enableHeader, enableMeta}}
                    title={title}
                    date={date}
                    label={label}
                    size={headerSize}
                    taxonomy={metaTaxonomy}
                    setAttributes={setAttributes}
                    altHeaderWeight={enableAltHeaderWeight}
                    isSelected={isSelected}
                />

                <Description
                    enabled={enableDescription}
                    content={description}
                    sansSerif={!enableHeader}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                />

                <Extra
                    enabled={enableExtra}
                    content={extra}
                    breakingNews={enableBreakingNews}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                />
            </article>
        </Fragment>
    );
};

export default edit;
