/* eslint-disable radix */
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
    InspectorControls,
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
    Button,
    HorizontalRule,
    PanelBody,
    Placeholder,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    Flex,
    FlexItem,
    FlexBlock,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import TaxQuery from './taxQuery';
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
        postsPerPage,
        labelTaxonomy,
        disableImage,
        taxQuery,
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
            <div>
                <h4 className="sans-serif">Story Item Settings</h4>
                <ToggleControl
                    label="Disable Images"
                    checked={disableImage}
                    onChange={() =>
                        setAttributes({ disableImage: !disableImage })
                    }
                />
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
                            label="Program"
                            value={programTermId}
                            options={programOptions}
                            onChange={termId => {
                                setAttributes({
                                    programTermId: parseInt(termId),
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
                </div>
            </div>

            <HorizontalRule />

            <div>
                <h4 className="sans-serif">Query Arguments</h4>
                <RangeControl
                    label={__('Number of posts')}
                    value={postsPerPage}
                    onChange={val => setAttributes({ postsPerPage: val })}
                    min={3}
                    max={10}
                    required
                />
            </div>

            <HorizontalRule />

            <div>
                <h4 className="sans-serif">Taxonomy Query Arguments</h4>
                <TaxQuery taxQuery={taxQuery} setAttributes={setAttributes} />
            </div>

            <HorizontalRule />
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
        fetchPosts(attributes).then(data => {
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
