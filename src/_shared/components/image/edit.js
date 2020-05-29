import { Fragment } from '@wordpress/element';
import { Button, IconButton, SelectControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const ALLOWED_MEDIA_TYPES = ['image'];

const Edit = ({ img, size, slot, chartArt, dataHandler }) => {
    const mediaHandler = media => {
        if ('disabled' === slot) {
            dataHandler({ image: media.url, imageSlot: 'default' });
        } else {
            dataHandler({ image: media.url });
        }
    };

    const Toolbar = ({ handler, open }) => {
        return (
            <div className="image-editor-toolbar">
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <IconButton
                            icon="upload"
                            label="Select/Upload New Image"
                            onClick={open}
                        />
                        <IconButton
                            icon="trash"
                            label="Remove Image"
                            onClick={() => {
                                handler({
                                    image: '',
                                    imageSlot: 'disabled',
                                });
                            }}
                        />

                        <Fragment>
                            {null !== chartArt && (
                                <IconButton
                                    icon="art"
                                    label={
                                        true === chartArt
                                            ? 'Disable Chart Art'
                                            : 'Enable Chart Art'
                                    }
                                    onClick={() => {
                                        handler({
                                            isChartArt: !chartArt,
                                        });
                                    }}
                                />
                            )}
                        </Fragment>
                    </div>
                </div>
                {null !== slot && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SelectControl
                            label="Image Size"
                            value={size}
                            options={[
                                { value: 'XL', label: 'XL' },
                                { value: 'A1', label: 'A1' },
                                { value: 'A2', label: 'A2' },
                                { value: 'A3', label: 'A3' },
                                { value: 'A4', label: 'A4' },
                                {
                                    value: 'legacy-260',
                                    label: 'Legacy Homepage 260x260',
                                },
                                {
                                    value: 'legacy-260-173',
                                    label: 'Legacy Homepage 260x173',
                                },
                            ]}
                            onChange={imageSize => handler({ imageSize })}
                            style={{ marginBottom: '0px', maxWidth: '140px' }}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={mediaHandler}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                render={({ open }) => (
                    <Fragment>
                        {'' !== img && (
                            <Toolbar handler={dataHandler} open={open} />
                        )}
                        {'' === img && (
                            <p>
                                <Button isPrimary onClick={open}>
                                    Insert Image
                                </Button>
                            </p>
                        )}
                    </Fragment>
                )}
            />
        </MediaUploadCheck>
    );
};

export default Edit;
