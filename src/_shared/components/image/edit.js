import { Fragment } from '@wordpress/element';
import { Button, IconButton, SelectControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const ALLOWED_MEDIA_TYPES = ['image'];

const Edit = ({
    img,
    size,
    slot,
    chartArt,
    dataHandler,
    display,
    className,
}) => {
    // Expect the display tag to be passed through props, whatever you pass here needs to support img, size, and link props as well
    const Display = display;

    const mediaHandler = media => {
        if ('disabled' === slot) {
            dataHandler({ image: media.url, imageSlot: 'default' });
        } else {
            dataHandler({ image: media.url });
        }
    };

    const Toolbar = ({ handler, open }) => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    backgroundColor: '#f0f2f3',
                }}
            >
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
                            style={{ marginBottom: '0px' }}
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
                            <Fragment>
                                <div className={className}>
                                    <Display img={img} size={size} link="" />
                                    <Toolbar
                                        handler={dataHandler}
                                        open={open}
                                    />
                                </div>
                            </Fragment>
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