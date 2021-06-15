/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch, select } from '@wordpress/data';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import {
    Button,
    HorizontalRule,
    SelectControl,
    ToggleControl,
    Flex,
    FlexItem,
    FlexBlock,
} from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';

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
    const { relation, data } = taxQuery;
    const [options, setOptions] = useState([
        { label: 'Select a Taxonomy', value: false },
        { label: 'Topics', value: 'topic' },
        { label: 'Formats', value: 'formats' },
        { label: 'Research Areas', value: 'research-teams' },
    ]);

    const toggleRelation = () => {
        const tmpData = taxQuery;
        if ('OR' === tmpData.relation) {
            tmpData.relation = 'AND';
        } else {
            tmpData.relation = 'OR';
        }
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
        <Fragment>
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
                                'AND' === relation
                                    ? 'AND (restrictive: restricts content)'
                                    : 'OR (expansive: expands content)'
                            }
                            checked={'AND' === relation}
                            onChange={toggleRelation}
                        />
                    </div>
                )}
            </div>
            <Button
                isSecondary
                isSmall
                onClick={() => {
                    const tmpData = taxQuery;
                    tmpData.data.push({
                        taxonomy: false,
                        terms: null,
                        value: null,
                    });
                    setAttributes({ taxQuery: { ...taxQuery, ...tmpData } });
                }}
            >
                Add Taxonomy
            </Button>
        </Fragment>
    );
};

export default TaxQuery;
