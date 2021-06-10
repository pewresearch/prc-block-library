import { Fragment, useState, useEffect } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import classNames from 'classnames/bind';

import { ImageDisplay } from '@pewresearch/app-components';

const ALLOWED_MEDIA_TYPES = ['image'];

const Edit = ({ img, size, postId, setAttributes }) => {
    const [art, setArt] = useState(false);

    // When the postId changes go fetch new art for this post and store it in state and also store the correct image url in attributes.
    useEffect(() => {
        if (0 !== postId && false !== setAttributes) {
            apiFetch({
                path: `/prc-api/v2/get-art/?postId=${postId}`,
            }).then(data => {
                if (false !== data) {
                    setArt(data);
                    setAttributes({ image: data[size].rawUrl });
                } else {
                    // If no art on any subsequent art fetches set to false
                    setArt(false);
                }
            });
        }
    }, [postId]);

    /**
     * If the art or size changes then go check the art object and set the approrpiate image and chart art given the arts options.
     */
    useEffect(() => {
        if (
            false !== art &&
            undefined !== art[size] &&
            false !== setAttributes
        ) {
            setAttributes({
                image: art[size].rawUrl,
                isChartArt: art[size].chartArt,
            });
        }
    }, [art, size]);

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={media => setAttributes({ image: media.url })}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                render={({ open }) => {
                    let openFn = open;
                    if (0 !== postId) {
                        openFn = () => alert("You are unable to edit this image as this story item is linked to a post. To edit, edit the post's art direction. postId:: " + postId);
                    }
                    return(
                        <Fragment>
                            {
                                // If we have an actual image here then display it otherwise give us the placeholder
                            }
                            {undefined !== img && 0 !== img.length && (
                                <ImageDisplay
                                    img={img}
                                    size={size}
                                    link=""
                                    onClick={openFn}
                                />
                            )}
                            {(undefined === img || 0 === img.length) && (
                                <ImageDisplay
                                    img={img}
                                    size={size}
                                    link=""
                                    onClick={openFn}
                                    placeholder
                                />
                            )}
                        </Fragment>
                    )
                }}
            />
        </MediaUploadCheck>
    );
};

/**
 * Props:
 * img: string url of image to display
 * size: string of image/slot size (A1,A2,A3,A4)
 * link: string of url to go to when image is clicked on front end
 * slot: if set to null then no image size chooser will be display
 * chartArt: if set to null then no chart art button will appear
 * setAttributes: defaults to false unless otherwise provided a function to pass data back up to a HOC state.
 *
 * <Img id={} img={} size={} slot={} chartArt={} postId={} setAttributes={}/>
 */

const Img = ({ img, size, slot, chartArt, postId, setAttributes }) => {
    console.log('<Img>', img);

    const classes = () => {
        let isXL = false;
        let isA1 = false;
        let isA2 = false;
        let isA3 = false;
        let isA4 = false;
        if (false !== slot) {
            if ('XL' === size) {
                isXL = true;
            } else if ('A1' === size) {
                isA1 = true;
            } else if ('A2' === size) {
                isA2 = true;
            } else if ('A3' === size) {
                isA3 = true;
            } else if ('A4' === size) {
                isA4 = true;
            }
        }

        return classNames({
            ui: true,
            XL: isXL,
            A1: isA1,
            A2: isA2,
            A3: isA3,
            A4: isA4,
            image: true,
            bordered: chartArt,
        });
    };

    return (
        <div className={classes()}>
            <Edit
                img={img}
                size={size}
                postId={postId}
                setAttributes={setAttributes}
            />
        </div>
    );
};

export default Img;
