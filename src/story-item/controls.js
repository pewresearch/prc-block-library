import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    PanelBody,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const setPostByURL = (url, setAttributes) => {
    if (undefined === setAttributes || undefined === url) {
        return;
    }

    const getSiteIDFromURL = u => {
        const { siteDomain } = window;
        let siteID = 1;
        if (u.includes(`${siteDomain}/global/`)) {
            siteID = 2;
        } else if (u.includes(`${siteDomain}/hispanic/`)) {
            siteID = 5;
        } else if (u.includes(`${siteDomain}/science/`)) {
            siteID = 16;
        } else if (u.includes(`${siteDomain}/methods/`)) {
            siteID = 10;
        } else if (u.includes(`${siteDomain}/internet/`)) {
            siteID = 9;
        } else if (u.includes('https://www.people-press.org/')) {
            siteID = 4;
        } else if (u.includes('https://www.pewforum.org/')) {
            siteID = 7;
        } else if (u.includes('https://www.journalism.org/')) {
            siteID = 8;
        } else if (u.includes('https://www.pewsocialtrends.org/')) {
            siteID = 3;
        } else if (
            u.includes('https://www.pewresearch.org/') ||
            u.includes(siteDomain)
        ) {
            siteID = 1;
        }
        return siteID;
    };

    apiFetch({
        path: `/prc-api/v2/blocks/helpers/get-post-by-url/?url=${url}&siteID=${getSiteIDFromURL(
            url,
        )}`,
    }).then(post => {
        if (false !== post) {
            const storyItem = {
                title: post.title,
                excerpt: post.excerpt,
                link: post.link,
                label: post.label,
                date: post.date,
                postID: post.id,
                extra: '', // We want to clear extra when pulling a new post
            };
            // If the post has art then let the image editor mounting effect handle setting it.
            if (!post.art) {
                storyItem.image = post.image;
            }
            setAttributes(storyItem);
        }
    });
};

const Controls = ({
    postID,
    link,
    enableHeader,
    enableExcerpt,
    enableExtra,
    enableBreakingNews,
    enableEmphasis,
    enableProgramsTaxonomy,
    setAttributes,
}) => {
    const [url, setUrl] = useState(link);
    return (
        <InspectorControls>
            <PanelBody title={__('Story Item Options')}>
                <div>
                    <TextControl label="Post ID" value={postID} disabled />
                </div>
                <div className="story-item-link">
                    <div>
                        <TextControl
                            label="Link"
                            value={url}
                            onChange={u => {
                                setUrl(u);
                                setAttributes({ link: u });
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() => setPostByURL(link, setAttributes)}
                            isPrimary
                            style={{
                                height: '30px',
                            }}
                        >
                            Fetch
                        </Button>
                    </div>
                </div>
                <p>
                    <strong>Content Options:</strong>
                </p>
                <div>
                    <ToggleControl
                        label={
                            enableHeader ? 'Header Enabled' : 'Header Disabled'
                        }
                        checked={enableHeader}
                        onChange={() => {
                            setAttributes({ enableHeader: !enableHeader });
                        }}
                    />
                </div>
                <div>
                    <ToggleControl
                        label={
                            enableExcerpt
                                ? 'Excerpt Enabled'
                                : 'Excerpt Disabled'
                        }
                        checked={enableExcerpt}
                        onChange={() => {
                            setAttributes({ enableExcerpt: !enableExcerpt });
                        }}
                    />
                </div>
                <div>
                    <ToggleControl
                        label={
                            enableExtra ? 'Extras Enabled' : 'Extras Disabled'
                        }
                        checked={enableExtra}
                        onChange={() => {
                            setAttributes({ enableExtra: !enableExtra });
                        }}
                    />
                </div>
                <div>
                    <ToggleControl
                        label={
                            enableBreakingNews
                                ? 'Breaking News Enabled'
                                : 'Breaking News Disabled'
                        }
                        checked={enableBreakingNews}
                        onChange={() => {
                            if (false !== window.prcBreakingNews) {
                                setAttributes({
                                    enableBreakingNews: !enableBreakingNews,
                                });
                            } else {
                                // eslint-disable-next-line no-alert
                                alert(
                                    'There are no currently active, authorized, breaking news events. The breaking news toggle will be set back to false.',
                                );
                                setAttributes({
                                    enableBreakingNews: false,
                                });
                            }
                        }}
                    />
                </div>
                <div>
                    <ToggleControl
                        label={
                            enableEmphasis
                                ? 'Emphasis Enabled'
                                : 'Emphasis Disabled'
                        }
                        checked={enableEmphasis}
                        onChange={() => {
                            setAttributes({ enableEmphasis: !enableEmphasis });
                        }}
                    />
                </div>
                <div>
                    <ToggleControl
                        label={enableProgramsTaxonomy ? 'Programs' : 'Formats'}
                        checked={enableProgramsTaxonomy}
                        onChange={() => {
                            setAttributes({
                                enableProgramsTaxonomy: !enableProgramsTaxonomy,
                            });
                        }}
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
};

export default Controls;
