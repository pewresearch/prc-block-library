/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { isInteger } from 'lodash';
import {
    InspectorControls,
    InspectorAdvancedControls,
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { Fragment, useState } from '@wordpress/element';
import {
    BaseControl,
    Button,
    CardDivider,
    PanelBody,
    Popover,
    SelectControl,
    ToggleControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { setPostByStubID } from '../helpers';

const Inspector = ({ attributes, setAttributes, context, rootClientId }) => {
    const [isRefreshing, refresh] = useState(false);
    const {
        postID,
        imageSize,
        imageSlot,
        enableHeader,
        enableDescription,
        enableDescriptionBelow,
        enableExtra,
        enableBreakingNews,
        enableEmphasis,
        enableMeta,
        metaTaxonomy,
    } = attributes;
    const postId = postID;

    const label = __('Story Item Options');

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={label}>
                    <BaseControl
                        help={__('Toggle specific features of a Story Item on or off, for example you can turn off the meta area (date and taxonomy).')}
                    >
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
                                enableDescription ? 'Description Enabled' : 'Description Disabled'
                            }
                            checked={enableDescription}
                            onChange={() => {
                                setAttributes({ enableDescription: !enableDescription });
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
                    </BaseControl>
                    
                    <CardDivider/>
                    
                    <SelectControl
                        label="Select Taxonomy To Display"
                        value={ metaTaxonomy }
                        options={ [
                            { label: 'Formats', value: 'formats' },
                            { label: 'Research Teams', value: 'research-teams' },
                            { label: 'Disabled', value: 'disabled' },
                        ] }
                        onChange={ ( newMetaTaxonomy ) => {
                            setAttributes({metaTaxonomy: newMetaTaxonomy});
                        } }
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorAdvancedControls>
                {true === enableExcerpt && ('right' === imageSlot || 'left' === imageSlot) && (
                    <Fragment>
                        <ToggleControl
                            label={
                                enableDescriptionBelow
                                    ? 'Description Will Appear Below Image'
                                    : 'Description Will Appear Normally'
                            }
                            help={__('If you have descriptions enabled and a right or left image slot you can force the description to appear below an image.')}
                            checked={enableDescriptionBelow}
                            onChange={() => {
                                setAttributes({
                                    enableDescriptionBelow: !enableDescriptionBelow,
                                });
                            }}
                        />
                        <CardDivider/>
                    </Fragment>
                )}
                

                {isInteger(postId) && 0 !== postId && (
                    <div>
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
                            text={__('Refresh Post')}
                        />
                    </div>
                )}
                <div>
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
                        text={__('Reset Story Item Block')}
                    />
                </div>
            </InspectorAdvancedControls>
        </Fragment>
    );
};

export default Inspector;