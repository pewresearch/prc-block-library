import { getTermsByLetter } from 'shared';
import { decodeEntities } from '@wordpress/html-entities';
import { CheckboxControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import { useDidMount } from '@daniakash/lifecycle-hooks';
import { Fragment } from '@wordpress/element';

const TaxonomySelectList = withState({
    termsData: [],
    excludeData: [],
    includeData: [],
})(
    ({
        termsData,
        excludeData,
        includeData,
        setState,
        exclude,
        include,
        letter,
        taxonomy,
        setAttributes,
        isSelected,
    }) => {
        const stateInit = terms => {
            const state = {};

            // Initialize exclude data from exclude prop
            if (0 !== terms.length && 0 !== exclude.length) {
                state.excludeData = JSON.parse(exclude);
            }

            // Initialize include data from scratch OR the include data from the include prop
            if (0 !== terms.length && 0 === include.length) {
                const includeArr = [];
                terms.map(term => {
                    includeArr.push({
                        id: term.term_id,
                        name: term.name,
                        slug: term.slug,
                    });
                });
                // We need to take this array and object and json stringify it, we will also need a function to convert back to an array of objects.
                setAttributes({ include: JSON.stringify(includeArr) });
                state.includeData = includeArr;
            } else if (0 !== terms.length && 0 !== include.length) {
                state.includeData = JSON.parse(include);
            }

            setState(state);
        };

        const staticInit = () => {
            if (0 !== include.length && false === setAttributes) {
                return JSON.parse(include);
            }
            return false;
        };

        const loadTerms = () => {
            getTermsByLetter(taxonomy, 100, letter).then(terms => {
                setState({ termsData: terms });
                stateInit(terms);
            });
        };

        // NO HOOKS ON SAVE
        if (false !== setAttributes) {
            useDidMount(() => {
                if (0 === termsData.length) {
                    loadTerms();
                }
            });
        }

        const processChange = (bool, termId, termName, termSlug) => {
            const excludeState = excludeData;
            const includeState = includeData;

            const removeFromInclude = () => {
                const index = includeState.findIndex(x => x.id === termId);
                if (-1 !== index) includeState.splice(index, 1);
            };

            const removeFromExclude = () => {
                const index = excludeState.indexOf(termId);
                if (-1 !== index) excludeState.splice(index, 1);
            };

            if (true === bool) {
                // Add term to exclude array
                excludeState.push(termId);
                // Remove term from includ earray
                removeFromInclude();
            } else {
                // Add term to include array
                includeState.push({
                    id: termId,
                    name: termName,
                    slug: termSlug,
                });
                // Remove term from exclude array
                removeFromExclude();
            }

            // Convert excludes array to comma sepparated string for storing in attributes.
            setAttributes({
                exclude: JSON.stringify(excludeState),
                include: JSON.stringify(includeState),
            });
        };

        const staticData = staticInit();
        return (
            <div className="ui link list">
                {false !== staticData && (
                    <Fragment>
                        {staticData.map(term => {
                            return (
                                <a
                                    className="item"
                                    href={`/${taxonomy.toLowerCase()}/${
                                        term.slug
                                    }`}
                                >
                                    {term.name}
                                </a>
                            );
                        })}
                    </Fragment>
                )}
                {false !== setAttributes && (
                    <Fragment>
                        {termsData.map(term => {
                            const checked = exclude.includes(term.term_id);

                            const onChange = b => {
                                processChange(
                                    b,
                                    term.term_id,
                                    term.name,
                                    term.slug,
                                );
                            };

                            return (
                                <div className="item">
                                    <CheckboxControl
                                        label={decodeEntities(term.name)}
                                        checked={checked}
                                        onChange={onChange}
                                        data-termid={term.term_id}
                                        data-term={term.name}
                                    />
                                    <div
                                        style={{
                                            height: '15px',
                                            marginTop: '-5px',
                                        }}
                                    >
                                        {true === isSelected && (
                                            <pre
                                                style={{
                                                    fontSize: '11px',
                                                    margin: 0,
                                                }}
                                            >
                                                ({term.slug})
                                            </pre>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </Fragment>
                )}
            </div>
        );
    },
);

export default TaxonomySelectList;
