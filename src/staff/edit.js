/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    InspectorControls,
    __experimentalLinkControl as LinkControl,
    useBlockProps,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { Placeholder, PanelBody, ToggleControl } from '@wordpress/components';
import { isInteger } from 'lodash';

const SearchAndSelectObject = ({
    value,
    setAttributes,
    forceIsEditingLink,
}) => {
    return (
        <LinkControl
            label={__(`Select Staff Member`)}
            value={value}
            showInitialSuggestions
            suggestionsQuery={{ type: 'post', subtype: 'staff' }}
            forceIsEditingLink={forceIsEditingLink}
            onChange={e => {
                if (undefined !== e.id) {
                    setAttributes({
                        postId: e.id,
                        title: e.title,
                        url: e.url,
                    });
                }
            }}
            settings={[]}
        />
    );
};

const ObjectControls = ({ attributes, setAttributes, isSelected }) => {
    const {
        postId,
        title,
        url,
        enableJobTitle,
        enableFindAnExpert,
        enableTwitter,
        enableExpertiseLinks,
    } = attributes;
    return (
        <InspectorControls>
            <PanelBody title={__('Staff Link')}>
                <SearchAndSelectObject
                    value={{ title, url, id: postId }}
                    setAttributes={setAttributes}
                    forceIsEditingLink={isSelected}
                />
            </PanelBody>
            <PanelBody title={__('Staff Settings')}>
                <div>
                    <ToggleControl
                        label="Enable Job Title"
                        checked={enableJobTitle}
                        onChange={() =>
                            setAttributes({
                                enableJobTitle: !enableJobTitle,
                            })
                        }
                    />
                    <ToggleControl
                        label="Enable 'Find An Expert' Link"
                        checked={enableFindAnExpert}
                        onChange={() =>
                            setAttributes({
                                enableFindAnExpert: !enableFindAnExpert,
                            })
                        }
                    />
                    <ToggleControl
                        label="Enable Twitter"
                        checked={enableTwitter}
                        onChange={() =>
                            setAttributes({
                                enableTwitter: !enableTwitter,
                            })
                        }
                    />
                    <ToggleControl
                        label="Enable Expertise Links"
                        checked={enableExpertiseLinks}
                        onChange={() =>
                            setAttributes({
                                enableExpertiseLinks: !enableExpertiseLinks,
                            })
                        }
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
};

const ObjectPlaceholder = ({ label, attributes, setAttributes }) => {
    const { postId, title, url } = attributes;
    return (
        <Placeholder icon="wordpress-alt" label={label}>
            <SearchAndSelectObject
                value={{ title, url, id: postId }}
                setAttributes={setAttributes}
            />
        </Placeholder>
    );
};

const edit = ({ attributes, className, setAttributes, isSelected }) => {
    const {
        postId,
        title,
        enableJobTitle,
        enableFindAnExpert,
        enableTwitter,
        enableExpertiseLinks,
    } = attributes;

    const [image, setImage] = useState(false);
    const [jobTitle, setJobTitle] = useState(false);
    const [twitter, setTwitter] = useState(false);
    const [expertise, setExpertise] = useState(false);

    const blockProps = useBlockProps({
        className: classnames(className, 'ui', 'staff'),
    });

    const getStaffInfo = id => {
        return new Promise(resolve => {
            const request = {
                method: 'GET',
                path: `/wp/v2/staff/${id}`,
            };
            apiFetch(request).then(d => {
                resolve(d);
            });
        });
    };

    useEffect(() => {
        getStaffInfo(postId).then(d => {
            setImage(d.staffInfo.image);
            setJobTitle(d.staffInfo.jobTitle);
            setTwitter(d.staffInfo.twitter);
            setExpertise(d.staffInfo.expertise);
            console.log('expertise', d.staffInfo.expertise);
        });
    }, [postId]);

    const displayExtras =
        enableFindAnExpert || enableTwitter || enableExpertiseLinks;

    return (
        <div {...blockProps}>
            <ObjectControls
                attributes={attributes}
                setAttributes={setAttributes}
                isSelected={isSelected}
            />
            {isInteger(postId) && (
                <Fragment>
                    <div className="image">
                        <img src={image} alt={`Staff bio pic for ${title}`} />
                    </div>
                    <div className="content">
                        <div className="header">{title}</div>
                        {true === enableJobTitle && false !== jobTitle && (
                            <div className="job-title">
                                <span>{jobTitle}</span>
                            </div>
                        )}
                        {true === displayExtras && (
                            <div className="extra">
                                {true === enableTwitter && false !== twitter && (
                                    <div>
                                        <span className="blue-link">
                                            {__(`@${twitter}`)}
                                        </span>
                                    </div>
                                )}
                                {true === enableFindAnExpert && (
                                    <div>
                                        <span className="blue-link">
                                            {__(`Find an expert >`)}
                                        </span>
                                    </div>
                                )}
                                {true === enableExpertiseLinks &&
                                    false !== expertise && (
                                        <div>
                                            <strong>
                                                {enableTwitter
                                                    ? 'Tweeting about: '
                                                    : 'Areas of Expertise: '}
                                            </strong>
                                            {expertise.map((t, index) => {
                                                const i = index + 1;
                                                const l =
                                                    1 < expertise.length &&
                                                    i !== expertise.length
                                                        ? `${t.label}, `
                                                        : t.label;
                                                return (
                                                    <span className="blue-link">
                                                        {l}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                </Fragment>
            )}
            {undefined === postId && (
                <ObjectPlaceholder
                    label="Select Staff Member"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
        </div>
    );
};

export default edit;
