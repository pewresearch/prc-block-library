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
import {
    Button,
    Placeholder,
    PanelBody,
    ToggleControl,
} from '@wordpress/components';

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

const ObjectControls = ({ attributes, setAttributes, isSelected }) => {
    const { postId, title, url, enableReadMore, enableExcerpt } = attributes;
    const postType = 'page';
    const route = 'pages';
    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Page Link')}>
                    <SearchAndSelectObject
                        postType={postType}
                        route={route}
                        value={{ title, url, id: postId }}
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                    />
                </PanelBody>
                <PanelBody title={__('Page Settings')}>
                    <div>
                        <ToggleControl
                            label={__(`Enable Excerpt`)}
                            checked={enableExcerpt}
                            onChange={() =>
                                setAttributes({
                                    enableExcerpt: !enableExcerpt,
                                })
                            }
                        />
                        <ToggleControl
                            label={__(`Enable Read More`)}
                            checked={enableReadMore}
                            onChange={() =>
                                setAttributes({
                                    enableReadMore: !enableReadMore,
                                })
                            }
                        />
                    </div>
                </PanelBody>
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
    const {
        title,
        url,
        content,
        image,
        enableReadMore,
        enableExcerpt,
        readMore,
    } = attributes;

    // go fetch page information...

    const blockProps = useBlockProps({
        className: classnames(className, 'ui', 'page', {
            'has-excerpt': enableExcerpt,
        }),
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
                            <Fragment>
                                <RichText
                                    tagName="div"
                                    value={title}
                                    onChange={h => setAttributes({ title: h })}
                                    placeholder={__(`Page Title`)}
                                    keepPlaceholderOnFocus
                                    allowedFormats={['italic']}
                                    className="header"
                                />
                                {true === enableExcerpt && (
                                    <RichText
                                        tagName="div"
                                        value={content}
                                        onChange={c =>
                                            setAttributes({ content: c })
                                        }
                                        placeholder={__(`Page excerpt...`)}
                                        keepPlaceholderOnFocus
                                        className="description sans-serif"
                                    />
                                )}
                                {true === enableReadMore && (
                                    <div className="extra">
                                        <RichText
                                            tagName="div"
                                            value={readMore}
                                            onChange={c =>
                                                setAttributes({ readMore: c })
                                            }
                                            placeholder={__(`Read More...`)}
                                            keepPlaceholderOnFocus
                                            className="read-more"
                                            allowedFormats={['link']}
                                        />
                                    </div>
                                )}
                            </Fragment>
                        )}
                        {!isSelected && (
                            <Fragment>
                                <RichText.Content
                                    tagName="div"
                                    value={title}
                                    className="header"
                                />
                                {true === enableExcerpt && (
                                    <RichText.Content
                                        tagName="div"
                                        value={content}
                                        className="description sans-serif"
                                    />
                                )}
                                {true === enableReadMore && (
                                    <div className="extra">
                                        <RichText.Content
                                            tagName="div"
                                            value={readMore}
                                            className="read-more"
                                        />
                                    </div>
                                )}
                            </Fragment>
                        )}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default edit;
