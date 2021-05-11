/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    InspectorControls,
    __experimentalLinkControl as LinkControl,
    MediaUpload,
    MediaUploadCheck,
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { Button, Placeholder, PanelBody } from '@wordpress/components';

const SearchAndSelectObject = ({
    postType,
    route,
    value,
    setAttributes,
    isSelected = false,
}) => {
    const getExcerpt = postId => {
        return new Promise(resolve => {
            const request = {
                method: 'GET',
                path: `/wp/v2/${route}/${postId}`,
            };
            apiFetch(request).then(d => {
                resolve(d.excerpt.rendered);
            });
        });
    };

    return (
        <LinkControl
            label={__(`Select a ${postType}`)}
            value={value}
            showInitialSuggestions
            suggestionsQuery={{ type: 'post', subtype: postType }}
            forceIsEditingLink={isSelected}
            onChange={e => {
                if (undefined !== e.id) {
                    getExcerpt(e.id).then(excerpt => {
                        setAttributes({
                            postId: e.id,
                            title: e.title,
                            content: excerpt,
                            url: e.url,
                        });
                    });
                } else {
                    setAttributes({ url: e.url });
                }
            }}
            settings={[]}
        />
    );
};

const ObjectImage = ({ image, setAttributes, isSelected }) => {
    if (!isSelected && undefined !== image) {
        return (
            <div className="image">
                <img src={image} alt="Featured art for page" />
            </div>
        );
    }
    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={media => setAttributes({ image: media.url })}
                allowedTypes={['image']}
                render={({ open }) => {
                    return (
                        <Fragment>
                            {undefined !== image && (
                                <div className="image" onClick={open}>
                                    <img
                                        src={image}
                                        alt="Featured art for page"
                                    />
                                </div>
                            )}
                            {undefined === image && (
                                <div className="image">
                                    <Button isSecondary onClick={open}>
                                        Add Image
                                    </Button>
                                </div>
                            )}
                        </Fragment>
                    );
                }}
            />
        </MediaUploadCheck>
    );
};

const ObjectControls = ({
    attributes,
    controls = false,
    setAttributes,
    isSelected,
}) => {
    const { postId, title, url } = attributes;
    const postType = 'page';
    const route = 'pages';
    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Object Link')}>
                    <SearchAndSelectObject
                        postType={postType}
                        route={route}
                        value={{ title, url, id: postId }}
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                    />
                </PanelBody>
                {false !== controls && (
                    <PanelBody title={__('Object Settings')}>
                        <div>
                            <controls
                                attributes={attributes}
                                setAttributes={setAttributes}
                            />
                        </div>
                    </PanelBody>
                )}
            </InspectorControls>
        </Fragment>
    );
};

const ObjectPlaceholder = ({ label, attributes, setAttributes }) => {
    const { postId, title, url } = attributes;
    const postType = 'page';
    const route = 'pages';
    return (
        <Placeholder icon="wordpress-alt" label={label}>
            <SearchAndSelectObject
                postType={postType}
                route={route}
                value={{ title, url, id: postId }}
                setAttributes={setAttributes}
            />
        </Placeholder>
    );
};

const edit = ({ attributes, className, setAttributes, isSelected }) => {
    const { title, url, content, image } = attributes;

    // go fetch page information...

    const blockProps = useBlockProps({
        className: classnames(className, 'ui', 'page'),
    });

    return (
        <div {...blockProps}>
            <ObjectControls
                attributes={attributes}
                setAttributes={setAttributes}
                isSelected={isSelected}
            />
            {undefined === url && (
                <ObjectPlaceholder
                    label="Select a page"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            {undefined !== url && (
                <Fragment>
                    <ObjectImage
                        image={image}
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                    />
                    <div className="content">
                        {isSelected && (
                            <RichText
                                tagName="div"
                                value={title}
                                onChange={h => setAttributes({ title: h })}
                                placeholder={__(`Page Title`)}
                                keepPlaceholderOnFocus
                                allowedFormats={['italic']}
                                className="header"
                            />
                        )}
                        {!isSelected && (
                            <RichText.Content
                                tagName="div"
                                value={title}
                                className="header"
                            />
                        )}
                        {isSelected && (
                            <RichText
                                tagName="div"
                                value={content}
                                onChange={c => setAttributes({ content: c })}
                                placeholder={__(`Page excerpt...`)}
                                keepPlaceholderOnFocus
                                className="description sans-serif"
                            />
                        )}
                        {!isSelected && (
                            <RichText.Content
                                tagName="div"
                                value={content}
                                className="description sans-serif"
                            />
                        )}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default edit;
