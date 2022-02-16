/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    BaseControl,
    Button,
    CardDivider,
	DropZone,
    PanelBody,
	ResponsiveWrapper,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { uploadMedia } from '@wordpress/media-utils';

const ALLOWED_MEDIA_TYPES = ['video'];

const VideoDropZone = ({ attributes, setAttributes }) => {
	const {attachmentId, src} = attributes;
    const [isUploading, setIsUploading] = useState(false);

    const { media } = useSelect(select => {
        const { getMedia } = select('core');
        return {
            media: attachmentId ? getMedia(attachmentId) : null
        };
    }, [attachmentId]);

    const onUpdate = video => {
        console.log(
            'video update',
			video
        );
		setAttributes({
			attachmentId: video.id,
			src: '',
		});
    };

    const onDrop = filesList => {
        console.log('onDrop', filesList);
        uploadMedia({
            allowedTypes: ALLOWED_MEDIA_TYPES,
            filesList,
            onFileChange([video]) {
                console.log('onFileChange', video);
                if (!video.id) {
                    console.log('waiting');
                    setIsUploading(true);
                } else {
                    console.log('found!', video);
                    onUpdate(video);
                    setIsUploading(false);
                }
            },
            onError(message) {
                console.error(message);
            },
        });
    };

	useEffect(()=>{
		if (media) {
			console.log('hasMedia!', media, attachmentId);
		}
	}, [media]);

    return (
        <MediaUploadCheck>
			<MediaUpload
				title={__(`Video`)}
				onSelect={onUpdate}
				allowedTypes={ALLOWED_MEDIA_TYPES}
				value={attachmentId}
				render={({ open }) => (
					<div className="prc-video-popup-dropzone">
						<Button
							onClick={open}
						>
							{!!attachmentId && media && false === isUploading && (
								<ResponsiveWrapper
									naturalWidth={mediaWidth}
									naturalHeight={mediaHeight}
									isInline
								>
									The Video File
									<video src={videoSrc} controls />
								</ResponsiveWrapper>
							)}
							{((!!attachmentId && !media) || isUploading) && (
								<ResponsiveWrapper
									naturalWidth={240}
									naturalHeight={139}
									isInline
								>
									<div
										style={{
											backgroundColor: '#f0f0f0',
										}}
									>
										<Spinner /> Loading...
									</div>
								</ResponsiveWrapper>
							)}
							{!attachmentId && __(`Attach Video`)}
						</Button>
						<DropZone onFilesDrop={onDrop} />
					</div>
				)}
			/>
		</MediaUploadCheck>
    );
};

const edit = ({ attributes, className, setAttributes }) => {
    const { src, attachmentId, isYoutube, isVimeo, isVideoPress } = attributes;

    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        orientation: 'vertical',
        templateLock: false,
    });

    return(
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Video Settings')}>
					<VideoDropZone attachmentId={attachmentId} setAttributes={setAttributes}/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;
