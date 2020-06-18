import { Fragment, useState, useEffect } from '@wordpress/element';
import { SelectControl, Toolbar as WPComToolbar } from '@wordpress/components';
import {
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

import Display from './display';

const ALLOWED_MEDIA_TYPES = ['image'];

const Edit = ({ img, size, chartArt, postId, dataHandler }) => {
    const [art, setArt] = useState(false);

    useEffect(() => {
        if (0 !== postId) {
            apiFetch({
                path: `/prc-api/v2/get-art/?postId=${postId}`,
            }).then(data => {
                if (false !== data) {
                    setArt(data);
                    dataHandler({ image: data[size].rawUrl });
                } else {
                    // If no art on any subsequent art fetches set to false
                    setArt(false);
                }
            });
        }
    }, [postId]);

    useEffect(() => {
        if (false !== art && undefined !== art[size]) {
            console.log(
                'image size changed, go get correct art from art store!',
            );
            dataHandler({
                image: art[size].rawUrl,
                isChartArt: art[size].chartArt,
            });
        }
    }, [art, size]);

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={media => dataHandler({ image: media.url })}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                render={({ open }) => (
                    <Fragment>
                        <Display img={img} size={size} link="" onClick={open} />
                        <BlockControls>
                            <WPComToolbar
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
                                                    dataHandler({ imageSize })
                                                }
                                                style={{
                                                    margin: 0,
                                                    marginTop: '10px',
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
                                            dataHandler({
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

export default Edit;
