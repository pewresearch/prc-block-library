import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    PanelBody,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import { StoryItem } from 'shared';

class EditSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
        this.setPostByURL = this.setPostByURL.bind(this);
    }

    componentDidMount = () => {
        this.setState({ url: this.props.attributes.link });
    };

    /**
     * Loading Posts
     */
    setPostByURL = () => {
        const { setAttributes } = this.props;
        const url = this.props.attributes.link;

        const getSiteIDFromURL = url => {
            let siteID = 1;
            if (url.includes(`${window.siteDomain}/global/`)) {
                siteID = 2;
            } else if (url.includes(`${window.siteDomain}/hispanic/`)) {
                siteID = 5;
            } else if (url.includes(`${window.siteDomain}/science/`)) {
                siteID = 16;
            } else if (url.includes(`${window.siteDomain}/methods/`)) {
                siteID = 10;
            } else if (url.includes(`${window.siteDomain}/internet/`)) {
                siteID = 9;
            } else if (url.includes('https://www.people-press.org/')) {
                siteID = 4;
            } else if (url.includes('https://www.pewforum.org/')) {
                siteID = 7;
            } else if (url.includes('https://www.journalism.org/')) {
                siteID = 8;
            } else if (url.includes('https://www.pewsocialtrends.org/')) {
                siteID = 3;
            } else if (
                url.includes('https://www.pewresearch.org/') ||
                url.includes(window.siteDomain)
            ) {
                siteID = 1;
            }
            return siteID;
        };

        if (undefined === setAttributes || undefined === url) {
            return;
        }

        apiFetch({
            path: `/prc-api/v2/blocks/helpers/get-post-by-url/?url=${url}&siteID=${getSiteIDFromURL(url,)}`,
        }).then(post => {
            if (false !== post) {
                setAttributes({
                    title: post.title,
                    image: post.image,
                    excerpt: post.excerpt,
                    link: post.link,
                    label: post.label,
                    date: post.date,
                    postID: post.id,
                    extra: '', // We want to clear extra when pulling a new post
                });
            }
        });
    };

    render = () => {
        const { setAttributes } = this.props;
        return (
            <InspectorControls>
                <PanelBody title={__('Story Item Options')}>
                    <div>
                        <TextControl
                            label="Post ID"
                            value={this.props.attributes.postID}
                            disabled
                        />
                    </div>
                    <div className="story-item-link">
                        <div>
                            <TextControl
                                label="Link"
                                value={this.props.attributes.link}
                                onChange={link => setAttributes({ link })}
                            />
                        </div>
                        <div>
                            <Button onClick={this.setPostByURL} isPrimary>
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
                                this.props.attributes.enableHeader
                                    ? 'Header Enabled'
                                    : 'Header Disabled'
                            }
                            checked={this.props.attributes.enableHeader}
                            onChange={value => {
                                setAttributes({ enableHeader: value });
                            }}
                        />
                    </div>
                    <div>
                        <ToggleControl
                            label={
                                this.props.attributes.enableExcerpt
                                    ? 'Excerpt Enabled'
                                    : 'Excerpt Disabled'
                            }
                            checked={this.props.attributes.enableExcerpt}
                            onChange={value => {
                                setAttributes({ enableExcerpt: value });
                            }}
                        />
                    </div>
                    <div>
                        <ToggleControl
                            label={
                                this.props.attributes.enableExtra
                                    ? 'Extras Enabled'
                                    : 'Extras Disabled'
                            }
                            checked={this.props.attributes.enableExtra}
                            onChange={value => {
                                setAttributes({ enableExtra: value });
                            }}
                        />
                    </div>
                    <div>
                        <ToggleControl
                            label={
                                this.props.attributes.enableBreakingNews
                                    ? 'Breaking News Enabled'
                                    : 'Breaking News Disabled'
                            }
                            checked={this.props.attributes.enableBreakingNews}
                            onChange={value => {
                                if (false !== window.prcBreakingNews) {
                                    setAttributes({
                                        enableBreakingNews: value,
                                    });
                                } else {
                                    alert('There are no currently active breaking news events, this will be set to false automatically.',);
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
                                this.props.attributes.emphasis
                                    ? 'Emphasis Enabled'
                                    : 'Emphasis Disabled'
                            }
                            checked={this.props.attributes.emphasis}
                            onChange={value => {
                                setAttributes({ emphasis: value });
                            }}
                        />
                    </div>
                    <div>
                        <ToggleControl
                            label={
                                this.props.attributes.enableProgramsTaxonomy
                                    ? 'Programs'
                                    : 'Formats'
                            }
                            checked={
                                this.props.attributes.enableProgramsTaxonomy
                            }
                            onChange={value => {
                                setAttributes({
                                    enableProgramsTaxonomy: value,
                                });
                            }}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>
        );
    };
}

const edit = props => {
    // Set Image Slot by Style
    // @TODO: This should be done on some hook not all the time live. // We should do this using useDispatch or something
    if ('is-style-default' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'default' });
    } else if ('is-style-top' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'top' });
    } else if ('is-style-bottom' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'bottom' });
    } else if ('is-style-left' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'left' });
    } else if ('is-style-right' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'right' });
    } else if ('is-style-disabled' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'disabled' });
    }
    return (
        <Fragment>
            {true === props.isSelected && <EditSidebar {...props} />}
            <StoryItem {...props} />
        </Fragment>
    );
}

export default edit;