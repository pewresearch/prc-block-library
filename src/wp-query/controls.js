/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch, select } from '@wordpress/data';
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
import { closeSmall } from '@wordpress/icons';

import { createBlock } from '@wordpress/blocks';
import { at } from 'lodash';

/**
 * Internal Dependencies
 */

const ALLOWED = ['prc-block/story-item'];

const TaxonomyField = ({
    index,
    label,
    taxonomy = false,
    value,
    options,
    taxQuery,
    setAttributes,
}) => {
    const onRemove = () => {
        const tmpData = taxQuery;
        tmpData.data.splice(index, 1);
        setAttributes({ taxQuery: { ...taxQuery, ...tmpData } });
    };
    const onTaxonomyChange = val => {
        const tmpData = taxQuery;
        tmpData.data[index].taxonomy = val;
        setAttributes({ taxQuery: { ...taxQuery, ...tmpData } });
    };
    const onTermChange = val => {
        const { id, title, url } = val;
        const tmpData = taxQuery;
        tmpData.data[index].terms = id;
        tmpData.data[index].title = title;
        tmpData.data[index].value = url;
        setAttributes({ taxQuery: { ...taxQuery, ...tmpData } });
    };
    return (
        <div>
            <Flex>
                <FlexBlock>
                    <strong>{label}</strong>
                </FlexBlock>
                <FlexItem>
                    <Button
                        isLink
                        icon={closeSmall}
                        onClick={onRemove}
                        lable={__(`Remove taxonomy argument`)}
                    />
                </FlexItem>
            </Flex>
            {false === taxonomy && (
                <div style={{ margin: '16px' }}>
                    <SelectControl
                        value={taxonomy}
                        options={options}
                        onChange={onTaxonomyChange}
                    />
                </div>
            )}
            {false !== taxonomy && null === value && (
                <LinkControl
                    label={__(`Term`)}
                    value={value}
                    showInitialSuggestions
                    suggestionsQuery={{ type: 'term', subtype: taxonomy }}
                    onChange={onTermChange}
                    settings={[]}
                />
            )}
            <HorizontalRule />
        </div>
    );
};

const TaxQuery = ({ taxQuery, setAttributes }) => {
    const { relationAnd, data } = taxQuery;
    const [options, setOptions] = useState([
        { label: 'Select a Taxonomy', value: false },
        { label: 'Topics', value: 'topic' },
        { label: 'Formats', value: 'formats' },
        { label: 'Programs', value: 'programs' },
    ]);

    const onRelationChange = val => {
        const tmpData = taxQuery;
        tmpData.relationAnd = val;
        setAttributes({ taxQuery: { ...taxQuery, ...tmpData } });
    };

    const getLabel = val => {
        const { taxonomy, title } = val;
        let label =
            false === taxonomy ? `Choose Taxonomy` : `Choose ${taxonomy} Term`;
        if (null !== title && false !== taxonomy) {
            label = `${taxonomy}: ${title}`;
        }
        return label
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    /**
     * Disable any taxonomy options that are already selected.
     */
    useEffect(() => {
        console.log('data.length?', data.length);
        // Go gather up selected taxonomies from taxQuery.data,
        const selectedTaxonomies = data.map(({ taxonomy }) => taxonomy);
        const nextOptions = options.map(o => {
            if (selectedTaxonomies.includes(o.value)) {
                o.disabled = true;
            } else {
                o.disabled = false;
            }
            return o;
        });
        setOptions(nextOptions);
    }, [taxQuery]);
    // Dont offer to change relation unless if data has more than one

    return (
        <div>
            <h4 className="sans-serif">Tax Query Arguments</h4>
            <div>
                {data.map((d, index) => {
                    const { taxonomy, value } = d;
                    const label = getLabel(d);
                    return (
                        <TaxonomyField
                            index={index}
                            label={__(label)}
                            taxonomy={taxonomy}
                            value={value}
                            options={options}
                            taxQuery={taxQuery}
                            setAttributes={setAttributes}
                        />
                    );
                })}
                {2 <= data.length && (
                    <div style={{ marginTop: '1em', marginBottom: '1em' }}>
                        <ToggleControl
                            label="Query Relation (OR|AND)"
                            help={
                                relationAnd
                                    ? 'AND (restrictive: restricts content)'
                                    : 'OR (expansive: expands content)'
                            }
                            checked={relationAnd}
                            onChange={() => onRelationChange(!relationAnd)}
                        />
                    </div>
                )}
            </div>
            <Button
                isSecondary
                isSmall
                onClick={() => {
                    const mergedTaxQuery = {
                        relationAnd: false,
                        data: [
                            ...taxQuery.data,
                            {
                                taxonomy: false,
                                terms: null,
                                value: null,
                            },
                        ],
                    };
                    setAttributes({ taxQuery: mergedTaxQuery });
                }}
            >
                Add Taxonomy
            </Button>
            <HorizontalRule />
        </div>
    );
};

// @TODO: More query args tk.

const QueryArgs = ({ postsPerPage, setAttributes }) => {
    return (
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
            <HorizontalRule />
        </div>
    );
};

//

const Fields = ({ attributes, setAttributes }) => {
    const [processing, toggleProcessing] = useState(false);
    const { postsPerPage, taxQuery } = attributes;
    const clickHandler = () => {
        toggleProcessing(true);

        const {
            postType,
            formatTermId,
            programTermId,
            perPage,
            labelTaxonomy,
            expertsOnly,
        } = attributes;

        fetchPosts(
            postType,
            perPage,
            formatTermId,
            programTermId,
            labelTaxonomy,
            expertsOnly,
        ).then(data => {
            setTimeout(() => {
                toggleProcessing(false);
                setPosts(data);
            }, 3600);
        });
    };
    return (
        <div>
            <QueryArgs
                postsPerPage={postsPerPage}
                setAttributes={setAttributes}
            />
            <TaxQuery taxQuery={taxQuery} setAttributes={setAttributes} />
            <Button
                isBusy={processing}
                isPrimary
                onClick={() => {
                    toggleProcessing(!processing);
                }}
            >
                Query Posts
            </Button>
        </div>
    );
};

const Controls = ({ attributes, setAttributes, clientId }) => {
    const { taxQuery } = attributes;

    const { hasInnerBlocks } = useSelect(
        select => {
            return {
                hasInnerBlocks:
                    0 < select('core/block-editor').getBlocks(clientId).length,
            };
        },
        [clientId],
    );

    useEffect(() => {
        console.log('taxQuery??', taxQuery);
    }, [taxQuery]);

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__(`Query Arguments`)} initialOpen={false}>
                    <Fields
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                </PanelBody>
            </InspectorControls>
            <Placeholder label={__(`Configure Query Args`)} isColumnLayout>
                <Fields attributes={attributes} setAttributes={setAttributes} />
            </Placeholder>
        </Fragment>
    );
};

export default Controls;
