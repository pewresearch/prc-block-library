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
    const { postId, title, enableJobTitle, enableFindAnExpert } = attributes;

    const [image, setImage] = useState(false);
    const [jobTitle, setJobTitle] = useState(false);

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
        });
    }, [postId]);

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
                        {true === enableFindAnExpert && (
                            <div className="extra">
                                <a href="#" className="blue-link">
                                    {__(`Find an expert >`)}
                                </a>
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
