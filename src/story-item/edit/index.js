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
import Excerpt from './excerpt';
import Extra from './extra';
import Header from './header';
import Meta from './meta';
import Preview from './preview';
import { setPostAttributes } from '../helpers';

/**
 * To be removed at later date:
*/
const handlePostIdCaseChange = (attributes, setAttributes = false) => {
    const payload = {};
    if (!attributes.postId && attributes.postID) {
        payload.postId = attributes.postID;
    }

    if ( 0 !== Object.keys(payload).length && false !== setAttributes ) {
        console.log('handlePostIdCaseChange', attributes, payload);
        setAttributes({...payload});
    }
}

window.termOptions = {formats: [], 'research-teams': []};

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

    const [termOptions, setTermOptions] = useState(window.termOptions[metaTaxonomy]);

    /**
     * When the taxonomy selection changes go update the term options. Setting this here prevents the constant pop in and re-polling for terms.
     */
    useEffect(() => {
        if ( 'disabled' !== metaTaxonomy ) {
			//@TODO change this to use local session, we can set it to expire for like 30 days because this almost never changes.
			if ( 0 !== window.termOptions[metaTaxonomy].length ) {
				setTermOptions(window.termOptions[metaTaxonomy]);
			} else {
				getTermsAsOptions(metaTaxonomy).then(options => {
					if ( !window.termOptions[metaTaxonomy].length ) {
						window.termOptions[metaTaxonomy] = options;
					}
					setTermOptions(options);
				});
			}
        }
    }, [metaTaxonomy]);

    //@TODO  If in loop we should get title, image, label, date, and excerpt from the postId on load.
    // Also if in loop we should disable setting any of the attributes and force the A3 left variant.
    // If we are in loop but have a grid display type then you can set the imageSlot, imageize, enableHeader, enableExcerpt,  enableMeta, metaTaxonomy attributes.
    useEffect(()=> {
        handlePostIdCaseChange(attributes, setAttributes);
    }, []);

	// For posts inside a query block if we have a post id then go fetch the post and set attributes.
	useEffect(() => {
		if ( context.hasOwnProperty('query') && context.hasOwnProperty('postId') && !Number.isInteger(postId) ) {
			// setPostAttributes({
			// 	postId: context.postId,
			// 	imageSize,
			// 	isRefresh: false,
			// 	setAttributes,
			// });
		}
	}, [context]);

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
