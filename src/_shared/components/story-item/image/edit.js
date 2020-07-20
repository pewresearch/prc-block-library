import { Fragment, useState, useEffect } from '@wordpress/element';
import { Button, SelectControl, Toolbar } from '@wordpress/components';
import {
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import classNames from 'classnames/bind';
import { Display } from './display';

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
                        {0 === img.length && (
                            <Display
                                img={img}
                                size={size}
                                link=""
                                onClick={open}
                                placeholder
                            />
                        )}
                        {'' !== img && (
                            <Display
                                img={img}
                                size={size}
                                link=""
                                onClick={open}
                            />
                        )}
                        <BlockControls>
                            <Toolbar
                                controls={[
                                    {
                                        icon: null,
                                        title: 'Size',
                                        isActive: false,
                                        children: (
                                            <SelectControl
                                                value={size}
                                                options={[
                                                    {
                                                        value: 'XL',
                                                        label: 'XL',
                                                    },
                                                    {
                                                        value: 'A1',
                                                        label: 'A1',
                                                    },
                                                    {
                                                        value: 'A2',
                                                        label: 'A2',
                                                    },
                                                    {
                                                        value: 'A3',
                                                        label: 'A3',
                                                    },
                                                    {
                                                        value: 'A4',
                                                        label: 'A4',
                                                    },
                                                    {
                                                        value: 'legacy-260',
                                                        label:
                                                            'Legacy Homepage 260x260',
                                                    },
                                                    {
                                                        value: 'legacy-260-173',
                                                        label:
                                                            'Legacy Homepage 260x173',
                                                    },
                                                ]}
                                                onChange={imageSize =>
                                                    setAttributes({ imageSize })
                                                }
                                                style={{
                                                    marginBottom: '-8px',
                                                }}
                                            />
                                        ),
                                        onClick: null,
                                    },
                                    {
                                        icon: 'chart-pie',
                                        title: 'Chartart',
                                        isActive: chartArt,
                                        onClick: () => {
                                            setAttributes({
                                                isChartArt: !chartArt,
                                            });
                                        },
                                    },
                                ]}
                            />
                        </BlockControls>
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
