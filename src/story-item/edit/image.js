import { Fragment, useState, useEffect } from '@wordpress/element';
import { Button, SelectControl, Toolbar } from '@wordpress/components';
import {
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import classNames from 'classnames/bind';

import { ImageDisplay } from '../../_shared/components/story-item/_shared';

const ALLOWED_MEDIA_TYPES = ['image'];

const Edit = ({ img, size, chartArt, postId, setAttributes }) => {
    const [art, setArt] = useState(false);

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
    }, [postId, setAttributes]);

    /**
     * Check if post has `art` assets and if so set them.
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
                render={({ open }) => (
                    <Fragment>
                        {undefined !== img && 0 === img.length && (
                            <ImageDisplay
                                img={img}
                                size={size}
                                link=""
                                onClick={open}
                                placeholder
                            />
                        )}
                        {'' !== img && (
                            <ImageDisplay
                                img={img}
                                size={size}
                                link=""
                                onClick={open}
                            />
                        )}
                    </Fragment>
                )}
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
                chartArt={chartArt}
                postId={postId}
                setAttributes={setAttributes}
            />
        </div>
    );
};

export default Img;
