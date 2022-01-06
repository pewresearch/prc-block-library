/**
 * External Dependencies
 */
import classNames from 'classnames/bind';
import { getTermsAsOptions } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import {Controls, Placeholder} from './controls';
import Image from './image';
import excerpt from './excerpt';
import Extra from './extra';
import Header from './header';
import Meta from './meta';
import Preview from './preview';

/**
 * To be removed at later date:
*/
const handleExcerptAndPostIdUpdate = (attributes, setAttributes = false) => {
    const payload = {};
    if (!attributes.postId && attributes.postID) {
        payload.postId = attributes.postID;
    }
    //@TODO change this to look for excerpt and clean it up and change back to excerpt.
    if (!attributes.excerpt && attributes.excerpt && 0 !== attributes.excerpt.length) {
        payload.excerpt = attributes.excerpt;
    }
    // Convert old attributes to new attributes.
    // payload.enableExcerpt = attributes.enableExcerpt;
    // payload.url = attributes.link;

    if ( 0 !== Object.keys(payload).length && false !== setAttributes ) {
        console.log('handleExcerptAndPostIdUpdate', attributes, payload);
        setAttributes({...payload});
    }
}

const edit = ({ attributes, setAttributes, isSelected, clientId, context }) => {
    const {
        title,
        excerpt,
        extra,
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
        enableExcerpt,
        enableExcerptBelow,
        enableExtra,
        enableBreakingNews,
        enableMeta,
        metaTaxonomy,
        inLoop,
        isPreview,
        className,
    } = attributes;

    const [termOptions, setTermOptions] = useState([]);

    /**
     * When the taxonomy selection changes go update the term options. Setting this here prevents the constant pop in and re-polling for terms.
     */
    useEffect(() => {
        if ( 'disabled' !== metaTaxonomy ) {
            getTermsAsOptions(metaTaxonomy).then(options => {
                setTermOptions(options);
            });
            console.log('termOptions', termOptions);
        }
    }, [metaTaxonomy]);

    //@TODO  If in loop we should get title, image, label, date, and excerpt from the postId on load.
    // Also if in loop we should disable setting any of the attributes and force the A3 left variant.
    // If we are in loop but have a grid display type then you can set the imageSlot, imageize, enableHeader, enableExcerpt,  enableMeta, metaTaxonomy attributes.
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

    const logicalClasses = {
        bordered: enableEmphasis,
        'alt-excerpt': enableExcerptBelow,
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

    if ( !isSelected || isPreview ) {
        return <Preview attributes={attributes} />;
    }

    if ( undefined === postId && !context.hasOwnProperty('query') ) {
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
                />

                <Meta
                    enabled={enableMeta && 'disabled' !== metaTaxonomy}
                    date={date}
                    label={label}
                    setAttributes={setAttributes}
                    termOptions={termOptions}
                />

                <Header
                    enabled={enableHeader}
                    title={title}
                    size={headerSize}
                    altHeaderWeight={enableAltHeaderWeight}
                    setAttributes={setAttributes}
                />

                <Excerpt
                    enabled={enableExcerpt}
                    content={excerpt}
                    sansSerif={!enableHeader}
                    setAttributes={setAttributes}
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
