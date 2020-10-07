/* eslint-disable radix */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    PanelBody,
    Placeholder,
    TextControl,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';

import { getTerms } from '../_shared';

import fetchPosts from './fetch';

const Fields = ({
    attributes,
    setAttributes,
    wide = false,
    disabled = false,
}) => {
    const {
        formatTermId,
        programTermId,
        perPage,
        postType,
        labelTaxonomy,
    } = attributes;

    const [formatOptions, setFormatOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);

    const initTerms = (taxonomy, initData) => {
        console.log('initTerms', attributes);
        getTerms(taxonomy).then(data => {
            const termIds = Object.keys(data);
            const tmp = [{ value: 'any', label: 'Any' }];
            termIds.forEach(termId => {
                tmp.push({
                    value: termId,
                    label: data[termId].name,
                });
            });
            initData(tmp);
        });
    };

    useEffect(() => {
        if (0 === formatOptions.length) {
            initTerms('Formats', setFormatOptions);
        }
        if (0 === programOptions.length) {
            initTerms('Programs', setProgramOptions);
        }
    }, []);

    return (
        <Fragment>
            <SelectControl
                label="Post Type"
                value={postType}
                options={[
                    {
                        value: 'stub',
                        label: 'Stub',
                    },
                    {
                        value: 'staff',
                        label: 'Staff',
                    },
                ]}
                onChange={type => {
                    setAttributes({ postType: type });
                }}
                disabled={disabled}
            />
            {'stub' === postType && (
                <div
                    style={
                        true === wide
                            ? {
                                  display: 'flex',
                                  flexDirection: 'row',
                              }
                            : {}
                    }
                >
                    <div
                        style={
                            true === wide
                                ? {
                                      flexGrow: '1',
                                      paddingRight: '1em',
                                  }
                                : {}
                        }
                    >
                        <SelectControl
                            label="Format"
                            value={formatTermId}
                            options={formatOptions}
                            onChange={termId => {
                                setAttributes({
                                    formatTermId: parseInt(termId),
                                });
                            }}
                            disabled={disabled}
                        />
                    </div>
                    <div
                        style={
                            true === wide
                                ? {
                                      display: 'flex',
                                      alignItems: 'flex-end',
                                      paddingBottom: '0.2em',
                                  }
                                : {}
                        }
                    >
                        <ToggleControl
                            label="Use as Label"
                            checked={'formats' === labelTaxonomy}
                            onChange={() =>
                                setAttributes({
                                    labelTaxonomy:
                                        'formats' === labelTaxonomy
                                            ? 'programs'
                                            : 'formats',
                                })
                            }
                        />
                    </div>
                </div>
            )}
            <div
                style={
                    true === wide
                        ? {
                              display: 'flex',
                              flexDirection: 'row',
                          }
                        : {}
                }
            >
                <div
                    style={
                        true === wide && 'stub' === postType
                            ? {
                                  flexGrow: '1',
                                  paddingRight: '1em',
                              }
                            : {}
                    }
                >
                    <SelectControl
                        label="Program"
                        value={programTermId}
                        options={programOptions}
                        onChange={termId => {
                            setAttributes({ programTermId: parseInt(termId) });
                        }}
                        disabled={disabled}
                    />
                </div>
                {'stub' === postType && (
                    <div
                        style={
                            true === wide
                                ? {
                                      display: 'flex',
                                      alignItems: 'flex-end',
                                      paddingBottom: '0.2em',
                                  }
                                : {}
                        }
                    >
                        <ToggleControl
                            label="Use as Label"
                            checked={'programs' === labelTaxonomy}
                            onChange={() =>
                                setAttributes({
                                    labelTaxonomy:
                                        'programs' === labelTaxonomy
                                            ? 'formats'
                                            : 'programs',
                                })
                            }
                        />
                    </div>
                )}
            </div>

            <TextControl
                label={
                    'stub' === postType ? 'Number of Posts' : 'Number of Staff'
                }
                value={perPage}
                onChange={num => setAttributes({ perPage: parseInt(num) })}
                disabled={disabled}
            />
        </Fragment>
    );
};

const Controls = ({ attributes, setAttributes, setPosts, clientId }) => {
    const [busy, toggleBusy] = useState(false);
    const { hasInnerBlocks } = useSelect(
        select => {
            return {
                hasInnerBlocks:
                    0 < select('core/block-editor').getBlocks(clientId).length,
            };
        },
        [clientId],
    );

    const clickHandler = () => {
        toggleBusy(true);
        const {
            formatTermId,
            programTermId,
            perPage,
            labelTaxonomy,
        } = attributes;
        fetchPosts(
            perPage,
            formatTermId,
            programTermId,
            labelTaxonomy,
            true,
        ).then(data => {
            setTimeout(() => {
                toggleBusy(false);
                setPosts(data);
            }, 3600);
        });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Query Arguments')}>
                    <Fields
                        attributes={attributes}
                        setAttributes={setAttributes}
                        disabled={busy}
                    />
                    <Button
                        isBusy={busy}
                        isPrimary
                        onClick={() => clickHandler()}
                    >
                        Update
                    </Button>
                </PanelBody>
            </InspectorControls>
            {false === hasInnerBlocks && (
                <Placeholder label="Configure Query Args" isColumnLayout>
                    <div>
                        <Fields
                            attributes={attributes}
                            setAttributes={setAttributes}
                            disabled={busy}
                            wide
                        />
                        <Button
                            isBusy={busy}
                            isPrimary
                            onClick={() => clickHandler()}
                        >
                            Query Posts
                        </Button>
                    </div>
                </Placeholder>
            )}
        </Fragment>
    );
};

export default Controls;
