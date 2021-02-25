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
    TextControl,
    ToggleControl,
    SelectControl,
    BaseControl,
} from '@wordpress/components';
import { Icon, closeSmall } from '@wordpress/icons';
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
    const onTermChange = ({ id, url }) => {
        const tmpData = taxQuery;
        tmpData.data[index].terms = id;
        tmpData.data[index].value = url;
        setAttributes({ taxQuery: { ...taxQuery, ...tmpData } });
    };
    return (
        <BaseControl label={label}>
            <Button
                isLink
                icon={closeSmall}
                onClick={onRemove}
                lable={__(`Remove taxonomy argument`)}
            />
            {false === taxonomy && (
                <SelectControl
                    label={__('Taxonomy')}
                    value={taxonomy}
                    options={options}
                    onChange={onTaxonomyChange}
                />
            )}
            {false !== taxonomy && (
                <LinkControl
                    value={value}
                    showInitialSuggestions
                    suggestionsQuery={{ type: 'term', subtype: taxonomy }}
                    onChange={onTermChange}
                    settings={[]}
                />
            )}
        </BaseControl>
    );
};

const TaxQuery = ({ taxQuery, setAttributes }) => {
    const { relation, data } = taxQuery;
    const [options, setOptions] = useState([
        { label: 'Select a Taxonomy', value: false },
        { label: 'Topic', value: 'topic' },
        { label: 'Format', value: 'format' },
        { label: 'Program', value: 'program' },
    ]);

    /**
     * Disable any taxonomy options that are already selected.
     */
    useEffect(() => {
        // Go gather up selected taxonomies from taxQuery.data,
        const selectedTaxonomies = data.map(({ taxonomy }) => taxonomy);
        const nextOptions = options.map(o => {
            if (selectedTaxonomies.includes(o.value)) {
                o.disabled = true;
            }
            return o;
        });
        setOptions(nextOptions);
    }, [taxQuery]);
    // Dont offer to change relation unless if data has more than one

    return (
        <div>
            {data.map((d, index) => {
                const { taxonomy, url } = d;
                return (
                    <TaxonomyField
                        index={index}
                        label={__(`Choose ${taxonomy} term`)}
                        taxonomy={taxonomy}
                        value={url}
                        options={options}
                        taxQuery={taxQuery}
                        setAttributes={setAttributes}
                    />
                );
            })}
            <Button
                isSecondary
                isSmall
                onClick={() => {
                    const mergedTaxQuery = {
                        relation: 'AND',
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
        </div>
    );
};

const Fields = ({ attributes, setAttributes }) => {
    const [processing, toggleProcessing] = useState(true);
    const { queryArgs, taxQuery } = attributes;
    return (
        <Fragment>
            <TaxQuery taxQuery={taxQuery} setAttributes={setAttributes} />
            <Button isBusy={processing} isPrimary>
                Query Posts
            </Button>
        </Fragment>
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
