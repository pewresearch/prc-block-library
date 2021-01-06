import { __, sprintf } from '@wordpress/i18n';
import { isEmpty } from 'lodash';
import { dispatch } from '@wordpress/data';
import { InspectorControls, BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    BaseControl,
    Button,
    PanelBody,
    ToggleControl,
    TextControl,
    Dropdown, Toolbar, ToolbarButton, ToolbarGroup, Path, SVG,
    Popover,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { isURL, prependHTTP } from '@wordpress/url';
import WpQueryPinControls from '../../_shared/components/wpQueryPinControl'; // Supports pinning items to the wpQuery block using block context.

const setPostByURL = (url, setAttributes) => {
    if (undefined === setAttributes || undefined === url) {
        return;
    }

    apiFetch({
        path: '/prc-api/v2/blocks/helpers/get-post-by-url',
        method: 'POST',
        data: { url },
    }).then(post => {
        console.log('setPostbyURL', post);
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

const setPostByStubID = (postId, setAttributes) => {
    var post = new window.wp.api.models.Stub( { id: postId } );
    post.fetch((p) => {
        console.log('Fetched?',p);
        // Get post from postId.
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
        // Get art...
        if (!post.art) {
            storyItem.image = post.image;
        }
        setAttributes(storyItem);
    });
}

const URLControl = ({url, setAttributes}) => {
    const [ isLinkOpen, setIsLinkOpen ] = useState( false );
    return(
        <Fragment>
            <ToolbarButton
                aria-expanded={isLinkOpen}
                aria-haspopup="true"
                label={__('Set Link')}
                icon="admin-links"
                onClick={()=>setIsLinkOpen(!isLinkOpen)}
                showTooltip
            />
            {true === isLinkOpen && (
                <Popover
                    position="bottom center"
                    onClose={ () => setIsLinkOpen( false ) }
                >
                    <LinkControl
                        className="wp-block-navigation-link__inline-link-input"
                        value={{ url }}
                        showInitialSuggestions={ true }
                        suggestionsQuery={ { type: 'post', subtype: 'stub' } }
                        onChange={(p) => {
                            console.log(p);
                        }} // Does return the post id so we could just go set that shit
                        settings={[]}
                    />
                </Popover>
            )}
        </Fragment>
    );
}

const POPOVER_PROPS = {
    className: 'block-library-heading-level-dropdown',
    isAlternate: true,
};

const ToolbarDropdown = ({ selected, options, iconPaths, label, prefixLabel = '%s', onChange, iconWidth = '24', iconHeight = '24', iconViewBox = '0 0 24 24' }) => {
    const Icon = ({ selected, isPressed = false }) => {
        if (!iconPaths.hasOwnProperty(selected)) {
            return null;
        }
    
        return (
            <SVG
                width={iconWidth}
                height={iconHeight}
                viewBox={iconViewBox}
                xmlns="http://www.w3.org/2000/svg"
                isPressed={isPressed}
            >
                <Path d={iconPaths[selected]} />
            </SVG>
        );
    };

    return (
        <Dropdown
            popoverProps={POPOVER_PROPS}
            renderToggle={({ onToggle, isOpen }) => {
                return (
                    <ToolbarButton
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        icon={<Icon selected={selected} />}
                        label={label}
                        onClick={onToggle}
                        showTooltip
                    />
                );
            }}
            renderContent={() => (
                <Toolbar
                    className="block-library-heading-level-toolbar"
                    label={label}
                >
                    <ToolbarGroup
                        isCollapsed={false}
                        controls={options.map((size, index) => {
                            const isActive = selected === size;
                            return {
                                icon: (
                                    <Icon selected={size} isPressed={isActive}/>
                                ),
                                title: sprintf(
                                    // translators: %s: heading level e.g: "1", "2", "3"
                                    __(prefixLabel),
                                    size,
                                ),
                                isActive,
                                onClick() {
                                    onChange(size);
                                },
                            };
                        })}
                    />
                </Toolbar>
            )}
        />
    );
};


const ToolbarControls = ({
    attributes,
    setAttributes,
}) => {
    const { link, imageSize, imageSlot, headerSize, isChartArt } = attributes;
    return(
        <BlockControls>
            <ToolbarGroup>
                <URLControl url={link} setAttributes={setAttributes}/>
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarDropdown
                    label={__('Change Heading Level')}
                    selected={headerSize}
                    options={[1, 2, 3]}
                    onChange={newLevel => setAttributes({ headerSize: newLevel })}
                    iconPaths={{
                        1: 'M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z',
                        2: 'M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z',
                        3: 'M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z',
                    }}
                    iconHeight="24"
                    iconWidth="24"
                    prefixLabel="Heading %d"
                    iconViewBox="0 0 20 20"
                />
            </ToolbarGroup>
            {'disabled' !== imageSlot && (
                <ToolbarGroup>
                    <ToolbarDropdown
                        label={__('Change Image Size')}
                        selected={imageSize}
                        options={[ 'A1', 'A2', 'A3', 'A4', 'XL' ]}
                        onChange={newSize => setAttributes({ imageSize: newSize })}
                        iconPaths={{
                            'A1': 'M12.13,18.09h-3l-.74-2.46H4.49l-.75,2.46H1.27l3.84-12H8.36ZM7.72,13.41,6.44,9.2,5.16,13.41Z M13.31,8.35a7,7,0,0,0,4-2.44h2v10h3.33v2.19H13V15.9h3.63V9a23.54,23.54,0,0,1-3.33,1.78Z',
                            'A2': 'M12.5,18.09h-3l-.74-2.46H4.86l-.75,2.46H1.64l3.83-12H8.73ZM8.09,13.41,6.81,9.2,5.53,13.41Z M22.16,18.09h-9V15.75l.72-.52,1.46-1a31.07,31.07,0,0,0,3.1-2.6,2.74,2.74,0,0,0,.9-1.87,1.55,1.55,0,0,0-1.66-1.6c-1.19,0-1.86.76-2,2.3l-2.48-.55c.56-2.67,2.11-4,4.66-4a4.37,4.37,0,0,1,3,.91A3.5,3.5,0,0,1,22.2,9.69c0,1.51-.69,2.61-2.52,4a33.64,33.64,0,0,1-3.06,2h5.74Z',
                            'A3': 'M12.52,18h-3l-.74-2.47H4.89L4.13,18H1.67L5.5,6H8.76ZM8.11,13.32,6.83,9.11,5.56,13.32Z M17.38,10.75a1.87,1.87,0,0,0,1.46-.47,1.36,1.36,0,0,0,.38-.94A1.5,1.5,0,0,0,17.6,7.89c-1,0-1.51.45-1.84,1.53L13.28,9a3.62,3.62,0,0,1,1.1-2,4.58,4.58,0,0,1,3.33-1.24C20.24,5.82,22,7.13,22,9a2.69,2.69,0,0,1-2,2.68,3.09,3.09,0,0,1,1.51.74,2.73,2.73,0,0,1,.9,2.11c0,2.19-1.82,3.61-4.64,3.61A4.67,4.67,0,0,1,14.23,17a3.88,3.88,0,0,1-1.31-2.45l2.55-.36A2,2,0,0,0,17.63,16a1.64,1.64,0,0,0,1.84-1.62,1.55,1.55,0,0,0-.61-1.27,3,3,0,0,0-1.66-.27H16.1V10.75Z',
                            'A4': 'M12.31,18.09h-3l-.74-2.46H4.67l-.75,2.46H1.45l3.84-12H8.54ZM7.9,13.41,6.62,9.2,5.34,13.41Z M20.86,13.22h1.69v2.1H20.86v2.77H18.05V15.32H12.81v-2.1l4.84-7.31h3.21Zm-2.69,0V9.16c0-.09,0-.28,0-.57l0-.51-3.29,5.14Z',
                            'XL': 'M9.23,11.58,12.94,18H9.7L7.28,13.65,4.87,18H2.21l3.71-6.38L2.62,6H5.9L7.84,9.65,9.88,6h2.63Z M21.79,15.63V18H14.18V6H17v9.64Z'
                        }}
                        prefixLabel="%s Image Size"
                    />
                    <ToolbarButton
                        icon='chart-pie'
                        isPressed={isChartArt}
                        label={__('Enable Chart Art')}
                        onClick={() =>{
                            setAttributes({
                                isChartArt: !isChartArt,
                            });
                        }}
                    />
                </ToolbarGroup>
            )}
        </BlockControls>
    );
}

const Controls = ({attributes, setAttributes, context, rootClientId}) => {
    const {
        postID,
        link,
        imageSlot,
        enableHeader,
        enableExcerpt,
        enableExcerptBelow,
        enableExtra,
        enableBreakingNews,
        enableEmphasis,
        enableProgramsTaxonomy,
    } = attributes;

    const label = __('Story Item Options');

    useEffect(()=>{
        // On mount load the latest post details from the url.
        if (!isEmpty(link) && undefined === postID) {
            console.log('Story Item Controls Did Mount');
            console.log(link);
            console.log(postID);
            setPostByURL(link, setAttributes);
        }
    }, [link]);

    return (
        <Fragment>
            <ToolbarControls {...{attributes, setAttributes}}/>
            { false !== context && (
                <WpQueryPinControls
                    wpQueryContext={context}
                    rootClientId={rootClientId}
                    postId={postID}
                />
            )}
            <InspectorControls>
                <PanelBody title={label}>
                <div>
                    <TextControl label="Post ID" value={postID} disabled />
                </div>
                <div>
                    <BaseControl label="Content Options">
                        <ToggleControl
                            label={
                                enableHeader ? 'Header Enabled' : 'Header Disabled'
                            }
                            checked={enableHeader}
                            onChange={() => {
                                setAttributes({ enableHeader: !enableHeader });
                            }}
                        />
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
                        <ToggleControl
                            label={
                                enableExtra ? 'Extras Enabled' : 'Extras Disabled'
                            }
                            checked={enableExtra}
                            onChange={() => {
                                setAttributes({ enableExtra: !enableExtra });
                            }}
                        />
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
                        <ToggleControl
                            label={enableProgramsTaxonomy ? 'Programs' : 'Formats'}
                            checked={enableProgramsTaxonomy}
                            onChange={() => {
                                setAttributes({
                                    enableProgramsTaxonomy: !enableProgramsTaxonomy,
                                });
                            }}
                        />
                    </BaseControl>
                </div>
                <div>
                    <BaseControl label="Style Options">
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
                        {true === enableExcerpt && ('right' === imageSlot || 'left' === imageSlot) && (
                            <div>
                                <ToggleControl
                                    label={
                                        enableExcerptBelow
                                            ? 'Excerpt Will Appear Below'
                                            : 'Excerpt Will Appear Normally'
                                    }
                                    checked={enableExcerptBelow}
                                    onChange={() => {
                                        setAttributes({
                                            enableExcerptBelow: !enableExcerptBelow,
                                        });
                                    }}
                                />
                            </div>
                        )}
                    </BaseControl>
                </div>
                </PanelBody>
            </InspectorControls>
        </Fragment>
    );
};

export default Controls;
