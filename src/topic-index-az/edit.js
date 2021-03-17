/* eslint-disable radix */
/**
 * WordPress Dependencies:
 */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { SelectControl, CheckboxControl, Notice } from '@wordpress/components';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import _ from 'lodash';

const getTermsByLetter = letter => {
    console.log('getTermsByLetter', letter);
    return new Promise(resolve => {
        apiFetch({
            path: `/prc-api/v2/blocks/helpers/get-topic-by-letter/?letter=${letter}`,
        }).then(terms => {
            console.log(terms);
            const newTerms = terms.map(t => {
                return {
                    name: t.name,
                    term_id: t.term_id,
                    excluded: false,
                };
            });
            console.log(newTerms);
            resolve(newTerms);
        });
    });
};

const edit = ({ attributes, className, setAttributes }) => {
    const { letter, exclude } = attributes;
    const [terms, setTerms] = useState(false);

    const blockProps = useBlockProps({
        className,
    });

    const loadTerms = () => {
        getTermsByLetter(letter).then(t => {
            const tmpExclude =
                undefined !== exclude
                    ? exclude.split(',').map(i => parseInt(i))
                    : [];
            const tmpT = t.map(s => {
                if (tmpExclude.includes(s.term_id)) {
                    s.excluded = true;
                }
                return s;
            });
            setTerms(tmpT);
        });
    };

    const onSelect = (b, termId) => {
        console.log(b, termId, exclude);
        const tmpTerms = terms;

        tmpTerms.map(t => {
            if (t.term_id === termId) {
                if (b) {
                    t.excluded = true;
                } else {
                    t.excluded = false;
                }
            }
            return t;
        });

        setTerms([...tmpTerms]);
    };

    useEffect(() => {
        console.log('trying to set the exclude map...', terms);
        if (false !== terms) {
            const tmpExclude = terms
                .filter(t => true === t.excluded)
                .map(s => s.term_id);
            console.log('tmpExclude', tmpExclude);
            setAttributes({ exclude: tmpExclude.join() });
        }
    }, [terms]);

    // Load terms for {letter} when {letter} changes.
    useEffect(() => {
        loadTerms();
    }, [letter]);

    return (
        <div {...blockProps}>
            {undefined === letter && (
                <SelectControl
                    label="Chose a letter"
                    value={letter}
                    options={[
                        { label: '(Click to select letter)', value: null },
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                        { label: 'C', value: 'C' },
                        { label: 'D', value: 'D' },
                        { label: 'E', value: 'E' },
                        { label: 'F', value: 'F' },
                        { label: 'G', value: 'G' },
                        { label: 'H', value: 'H' },
                        { label: 'I', value: 'I' },
                        { label: 'J', value: 'J' },
                        { label: 'K', value: 'K' },
                        { label: 'L', value: 'L' },
                        { label: 'M', value: 'M' },
                        { label: 'N', value: 'N' },
                        { label: 'O', value: 'O' },
                        { label: 'P', value: 'P' },
                        { label: 'Q', value: 'Q' },
                        { label: 'R', value: 'R' },
                        { label: 'S', value: 'S' },
                        { label: 'T', value: 'T' },
                        { label: 'U', value: 'U' },
                        { label: 'V', value: 'V' },
                        { label: 'W', value: 'W' },
                        { label: 'X', value: 'X' },
                        { label: 'Y', value: 'Y' },
                        { label: 'Z', value: 'Z' },
                    ]}
                    onChange={l => setAttributes({ letter: l })}
                />
            )}
            {undefined !== letter && (
                <Fragment>
                    <h2 className="sans-serif">{letter}</h2>
                    {false !== terms && (
                        <div className="ui list">
                            {terms.map(term => {
                                const checked = term.excluded;
                                const label =
                                    true !== checked
                                        ? decodeEntities(term.name)
                                        : `${decodeEntities(term.name)} (${
                                              term.term_id
                                          })`;
                                return (
                                    <div className="item">
                                        <CheckboxControl
                                            label={_(label)}
                                            checked={checked}
                                            onChange={b =>
                                                onSelect(b, term.term_id)
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default edit;
