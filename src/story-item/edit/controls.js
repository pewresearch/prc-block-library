/**
 * External Dependencies
 */
import { WPObjectSearchField } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { isInteger } from 'lodash';
import {
    InspectorControls,
    InspectorAdvancedControls,
    BlockControls,
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { Fragment, useState } from '@wordpress/element';
import {
    Button,
    PanelBody,
    ToggleControl,
    SelectControl,
    ToolbarButton,
    ToolbarDropdownMenu,
    ToolbarGroup,
    Path,
    Placeholder as WPComPlaceholder,
    SVG,
    Popover,
} from '@wordpress/components';
import {
    close,
	more,
	arrowLeft,
	arrowRight,
	arrowUp,
	arrowDown,
} from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import { setPostByStubID, setArtBySize } from './helpers';

const URLControl = ({ title, type, id, url, imageSize = 'A1', setAttributes }) => {
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    return (
        <Fragment>
            <ToolbarButton
                aria-expanded={isLinkOpen}
                aria-haspopup="true"
                label={__('Set Link')}
                icon="admin-links"
                onClick={() => setIsLinkOpen(!isLinkOpen)}
                showTooltip
            />
            {true === isLinkOpen && (
                <Popover
                    position="bottom center"
                    onClose={() => setIsLinkOpen(false)}
                >
                    <div style={{
                        padding: '12px'
                    }}>
                        <WPObjectSearchField
                            value={{
                                url,
                                title,
                                type,
                                id,
                            }}
                            type='post'
                            subType='stub'
                            onChange={obj => {
                                if (obj.hasOwnProperty('id')) {
                                    setPostByStubID(obj.id, imageSize, false, setAttributes);
                                }
                                if (!obj.hasOwnProperty('id') && obj.hasOwnProperty('url')) {
                                    setAttributes({link: obj.url});
                                }
                            }}
                        />
                    </div>
                </Popover>
            )}
        </Fragment>
    );
};

const changeImageSlot = (selected, classNames, setAttributes) => {
    const classDictionary = [
        'is-style-default',
        'is-style-left',
        'is-style-right',
        'is-style-top',
        'is-style-bottom',
        'is-style-disabled',
    ];
    // look at classnames, make into an array, check array for if is-style-X, if so remove it.
    // merge the classNames with the selected from the class dictionary?
    // set the imageSLot in attributes and also the classname?
}

const ToolbarControls = ({ attributes, setAttributes }) => {
    const { link, imageSize, imageSlot, headerSize, isChartArt, postID, title } = attributes;
    const postId = postID;

    const Icon = ({ svgPath = false, isPressed = false }) => {
        if (false === svgPath) {
            return null;
        }
        return (
            <SVG
                width={24}
                height={24}
                viewBox='0 0 24 24'
                xmlns="http://www.w3.org/2000/svg"
                isPressed={isPressed}
            >
                <Path d={svgPath} />
            </SVG>
        );
    };

    const ImageSlotIcon = ({selected}) => {
        if ( 'right' === selected ) {
            return arrowRight;
        }
        if ( 'left' === selected ) {
            return arrowLeft;
        }
        if ( 'top' === selected ) {
            return arrowUp;
        }
        if ( 'bottom' === selected ) {
            return arrowDown;
        }
        if ( 'disabled' === selected ) {
            return close;
        }
        return more;
    }

    const ImageSizeIcon = ({selected, currentlyActive}) => {
        const iconPaths = {
            A1: 'M12.13,18.09h-3l-.74-2.46H4.49l-.75,2.46H1.27l3.84-12H8.36ZM7.72,13.41,6.44,9.2,5.16,13.41Z M13.31,8.35a7,7,0,0,0,4-2.44h2v10h3.33v2.19H13V15.9h3.63V9a23.54,23.54,0,0,1-3.33,1.78Z',
            A2: 'M12.5,18.09h-3l-.74-2.46H4.86l-.75,2.46H1.64l3.83-12H8.73ZM8.09,13.41,6.81,9.2,5.53,13.41Z M22.16,18.09h-9V15.75l.72-.52,1.46-1a31.07,31.07,0,0,0,3.1-2.6,2.74,2.74,0,0,0,.9-1.87,1.55,1.55,0,0,0-1.66-1.6c-1.19,0-1.86.76-2,2.3l-2.48-.55c.56-2.67,2.11-4,4.66-4a4.37,4.37,0,0,1,3,.91A3.5,3.5,0,0,1,22.2,9.69c0,1.51-.69,2.61-2.52,4a33.64,33.64,0,0,1-3.06,2h5.74Z',
            A3: 'M12.52,18h-3l-.74-2.47H4.89L4.13,18H1.67L5.5,6H8.76ZM8.11,13.32,6.83,9.11,5.56,13.32Z M17.38,10.75a1.87,1.87,0,0,0,1.46-.47,1.36,1.36,0,0,0,.38-.94A1.5,1.5,0,0,0,17.6,7.89c-1,0-1.51.45-1.84,1.53L13.28,9a3.62,3.62,0,0,1,1.1-2,4.58,4.58,0,0,1,3.33-1.24C20.24,5.82,22,7.13,22,9a2.69,2.69,0,0,1-2,2.68,3.09,3.09,0,0,1,1.51.74,2.73,2.73,0,0,1,.9,2.11c0,2.19-1.82,3.61-4.64,3.61A4.67,4.67,0,0,1,14.23,17a3.88,3.88,0,0,1-1.31-2.45l2.55-.36A2,2,0,0,0,17.63,16a1.64,1.64,0,0,0,1.84-1.62,1.55,1.55,0,0,0-.61-1.27,3,3,0,0,0-1.66-.27H16.1V10.75Z',
            A4: 'M12.31,18.09h-3l-.74-2.46H4.67l-.75,2.46H1.45l3.84-12H8.54ZM7.9,13.41,6.62,9.2,5.34,13.41Z M20.86,13.22h1.69v2.1H20.86v2.77H18.05V15.32H12.81v-2.1l4.84-7.31h3.21Zm-2.69,0V9.16c0-.09,0-.28,0-.57l0-.51-3.29,5.14Z',
            XL: 'M9.23,11.58,12.94,18H9.7L7.28,13.65,4.87,18H2.21l3.71-6.38L2.62,6H5.9L7.84,9.65,9.88,6h2.63Z M21.79,15.63V18H14.18V6H17v9.64Z',
        };
        return (
            <Icon
                svgPath={iconPaths[selected]}
                isPressed={selected === currentlyActive}
            />
        )
    }

    const HeadingLevelIcon = ({selected, currentlyActive}) => {
        const iconPaths = {
            1: 'M15.81,15.63V18H8.19V6H11v9.63Z', // Large
            2: 'M7.81,8.21V18H5.46V6H9.83l2.11,7.18L14.17,6h4.37V18H15.72V8.21l-3,9.79H10.77Z', // Medium
            3: 'M14.21,9.43A1.9,1.9,0,0,0,12.12,8c-1,0-1.64.4-1.64,1.06s.43,1,1.73,1.26a8.68,8.68,0,0,1,3.15,1,3.35,3.35,0,0,1,1.55,2.85,3.89,3.89,0,0,1-1.77,3.2,6,6,0,0,1-3.17.77,5.53,5.53,0,0,1-3.44-1,4,4,0,0,1-1.44-2.31l2.6-.59a2.2,2.2,0,0,0,2.43,1.67c1.19,0,1.92-.48,1.92-1.26s-.48-1-2.09-1.36a8.16,8.16,0,0,1-2.77-.94A3.08,3.08,0,0,1,7.72,9.63,3.58,3.58,0,0,1,9,6.86a4.44,4.44,0,0,1,3.15-1,5.08,5.08,0,0,1,3.15.91,3.74,3.74,0,0,1,1.33,1.91Z' // Small
        };
        return (
            <Icon
                svgPath={iconPaths[selected]}
                isPressed={selected === currentlyActive}
            />
        )
    }

    const handleImageSizeChange = (newSize) => {
        setAttributes({ imageSize: newSize });
        setArtBySize(newSize, postId, setAttributes);
    }

    return (
        <BlockControls>
            <ToolbarGroup>
                <URLControl title={title} id={postId} url={link} type="stub" setAttributes={setAttributes} />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarDropdownMenu
                    icon={()=> <HeadingLevelIcon selected={headerSize} currentlyActive={headerSize}/>}
                    label="Select Heading Size"
                    controls={ [
                        {
                            title: 'Large',
                            icon: (
                                <HeadingLevelIcon selected={1} currentlyActive={headerSize}/>
                            ),
                            isActive: 1 === headerSize,
                            onClick: () => setAttributes({ headerSize: 1 }),
                        },
                        {
                            title: 'Medium',
                            icon: (
                                <HeadingLevelIcon selected={2} currentlyActive={headerSize}/>
                            ),
                            isActive: 2 === headerSize,
                            onClick: () => setAttributes({ headerSize: 2 }),
                        },
                        {
                            title: 'Small',
                            icon: (
                                <HeadingLevelIcon selected={3} currentlyActive={headerSize}/>
                            ),
                            isActive: 3 === headerSize,
                            onClick: () => setAttributes({ headerSize: 3 }),
                        },
                    ] }
                />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarDropdownMenu
                    icon={()=><ImageSlotIcon selected={imageSlot}/>}
                    label="Select Image Slot"
                    controls={ [
                        {
                            title: 'Default',
                            icon: (
                                <ImageSlotIcon selected='default'/>
                            ),
                            isActive: 'default' === imageSlot,
                            onClick: () => {
                                const newSlot = 'default';
                                setAttributes({imageSlot: newSlot, className: `is-style-${newSlot}`});
                            },
                        },
                        {
                            title: 'Right',
                            icon: (
                                <ImageSlotIcon selected='right'/>
                            ),
                            isActive: 'right' === imageSlot,
                            onClick: () => {
                                const newSlot = 'right';
                                setAttributes({imageSlot: newSlot, className: `is-style-${newSlot}`});
                            },
                        },
                        {
                            title: 'Left',
                            icon: (
                                <ImageSlotIcon selected='left'/>
                            ),
                            isActive: 'left' === imageSlot,
                            onClick: () => {
                                const newSlot = 'left';
                                setAttributes({imageSlot: newSlot, className: `is-style-${newSlot}`});
                            },
                        },
                        {
                            title: 'Top',
                            icon: (
                                <ImageSlotIcon selected='top'/>
                            ),
                            isActive: 'top' === imageSlot,
                            onClick: () => {
                                const newSlot = 'top';
                                setAttributes({imageSlot: newSlot, className: `is-style-${newSlot}`});
                            },
                        },
                        {
                            title: 'Bottom',
                            icon: (
                                <ImageSlotIcon selected='bottom'/>
                            ),
                            isActive: 'bottom' === imageSlot,
                            onClick: () => {
                                const newSlot = 'bottom';
                                setAttributes({imageSlot: newSlot, className: `is-style-${newSlot}`});
                            },
                        },
                        {
                            title: 'Disabled',
                            icon: (
                                <ImageSlotIcon selected='disabled'/>
                            ),
                            isActive: 'disabled' === imageSlot,
                            onClick: () => {
                                const newSlot = 'disabled';
                                setAttributes({imageSlot: newSlot, className: `is-style-${newSlot}`});
                            },
                        },
                    ] }
                />
                {'disabled' !== imageSlot && (
                    <Fragment>
                    <ToolbarDropdownMenu
                        icon={()=> <ImageSizeIcon selected={imageSize} currentlyActive={imageSize}/>}
                        label="Select Image Size"
                        controls={ [
                            {
                                title: 'A1',
                                icon: (
                                    <ImageSizeIcon selected='A1' currentlyActive={imageSize}/>
                                ),
                                isActive: 'A1' === imageSize,
                                onClick: () => handleImageSizeChange('A1'),
                            },
                            {
                                title: 'A2',
                                icon: (
                                    <ImageSizeIcon selected='A2' currentlyActive={imageSize}/>
                                ),
                                isActive: 'A2' === imageSize,
                                onClick: () => handleImageSizeChange('A2'),
                            },
                            {
                                title: 'A3',
                                icon: (
                                    <ImageSizeIcon selected='A3' currentlyActive={imageSize}/>
                                ),
                                isActive: 'A3' === imageSize,
                                onClick: () => handleImageSizeChange('A3'),
                            },
                            {
                                title: 'A4',
                                icon: (
                                    <ImageSizeIcon selected='A4' currentlyActive={imageSize}/>
                                ),
                                isActive: 'A4' === imageSize,
                                onClick: () => handleImageSizeChange('A4'),
                            },
                            {
                                title: 'XL',
                                icon: (
                                    <ImageSizeIcon selected='XL' currentlyActive={imageSize}/>
                                ),
                                isActive: 'XL' === imageSize,
                                onClick: () => handleImageSizeChange('XL'),
                            }
                        ] }
                    />
                    <ToolbarButton
                        icon="chart-pie"
                        isPressed={isChartArt}
                        label={__('Enable Chart Art')}
                        onClick={() => {
                            setAttributes({
                                isChartArt: !isChartArt,
                            });
                        }}
                    />
                    </Fragment>
                )}
            </ToolbarGroup>
        </BlockControls>
    );
};

const Controls = ({ attributes, setAttributes, context, rootClientId }) => {
    const [isRefreshing, refresh] = useState(false);
    const {
        postID,
        link,
        imageSize,
        imageSlot,
        enableHeader,
        enableExcerpt,
        enableExcerptBelow,
        enableExtra,
        enableBreakingNews,
        enableEmphasis,
        enableAltTaxonomy,
        enableMeta,
        inLoop,
    } = attributes;
    const postId = postID;

    const label = __('Story Item Options');

    return (
        <Fragment>
            <ToolbarControls {...{ attributes, setAttributes }} />
            <InspectorControls>
                <PanelBody title={label}>
                    <SelectControl
                        label="Image Slot"
                        value={ imageSlot }
                        options={ [
                            { label: 'Default', value: 'default' },
                            { label: 'Left', value: 'left' },
                            { label: 'Right', value: 'right' },
                            { label: 'Top', value: 'top' },
                            { label: 'Bottom', value: 'bottom' },
                            { label: 'Disabled', value: 'disabled' },
                        ] }
                        onChange={ ( newSlot ) => {
                            setAttributes({imageSlot: newSlot, className: `is-style-${newSlot}`});
                        } }
                    />
                     <ToggleControl
                        label={
                            enableMeta
                                ? 'Meta Enabled'
                                : 'Meta Disabled'
                        }
                        checked={enableMeta}
                        onChange={() => {
                            setAttributes({ enableMeta: !enableMeta });
                        }}
                    />
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
                            enableExcerpt ? 'Excerpt Enabled' : 'Excerpt Disabled'
                        }
                        checked={enableExcerpt}
                        onChange={() => {
                            setAttributes({ enableExcerpt: !enableExcerpt });
                        }}
                    />
                    {true === enableExcerpt &&
                        ('right' === imageSlot || 'left' === imageSlot) && (
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
                        )}
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
                        label={enableAltTaxonomy ? 'Research Areas' : 'Formats'}
                        checked={enableAltTaxonomy}
                        onChange={() => {
                            setAttributes({
                                enableAltTaxonomy: !enableAltTaxonomy,
                            });
                        }}
                    />
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
                    <ToggleControl
                        label={
                            inLoop
                                ? 'Pub Listing Style On Mobile'
                                : 'Normal Styling On Mobile'
                        }
                        checked={inLoop}
                        onChange={() => {
                            setAttributes({ inLoop: !inLoop });
                        }}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorAdvancedControls>
                {isInteger(postId) && 0 !== postId && (
                    <Button
                        isSecondary
                        isBusy={isRefreshing}
                        onClick={() =>{
                            refresh(true);
                            setTimeout(() => {
                                setPostByStubID(postId, imageSize, true, setAttributes);
                                refresh(false);
                            }, 500);
                        }}
                        style={{ marginBottom: '1em' }}
                    >
                        Refresh Post
                    </Button>
                )}
                <Button
                    isDestructive
                    isBusy={isRefreshing}
                    onClick={() =>
                        setAttributes({
                            title: '',
                            excerpt: '',
                            extra: '',
                            link: '',
                            label: '',
                            date: '',
                            image: '',
                            postID: 0,
                        })
                    }
                    style={{ marginBottom: '1em' }}
                >
                    Reset Story Item Block
                </Button>
            </InspectorAdvancedControls>
        </Fragment>
    );
};

const Placeholder = ({attributes, setAttributes}) => {
    const {imageSize} = attributes;
    return (
        <WPComPlaceholder
            icon="format-aside"
            label={__(` Search for a Story Item`)}
            isColumnLayout
        >
            <WPObjectSearchField
                type='post'
                subType='stub'
                onChange={obj => {
                    if (obj.hasOwnProperty('id')) {
                        setPostByStubID(obj.id, imageSize, false, setAttributes);
                    }
                }}
                showInitialSuggestions
            />
            <Button isLink onClick={()=>{
                // Create a blank Story Item
                setAttributes({postId: 0});
            }}>Skip</Button>
        </WPComPlaceholder>
    )
};

export {
    Placeholder,
    Controls
}
