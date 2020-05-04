import { useEffect, Fragment } from '@wordpress/element';
import { withState } from '@wordpress/compose';
// import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { getTermsAsOptions } from '../_shared/helpers';

const allowedBlocks = [
    'core/heading',
];

import Tree from './tree';

const edit = withState({
    terms: [],
})(({ attributes, setAttributes, isSelected, setState, terms }) => {
    const { taxonomy, term } = attributes;
    // On initial load & taxonomy change:

    // Watch for initial change on taxonomy... once that AND the term are set these should be locked, if you want to undo then you should delete and start over I say.
    useEffect(() => {
        console.log('Taxonomy Change');
        if (false !== taxonomy) {
            // eslint-disable-next-line prettier/prettier
            getTermsAsOptions(taxonomy).then(options =>
                    // eslint-disable-next-line function-paren-newline
                    setState({ terms: options }),
                // eslint-disable-next-line function-paren-newline
            );
        }
    }, [taxonomy]);

    const SelectTaxonomy = ({ tx }) => (
        <SelectControl
            value={tx}
            options={[
                { label: 'Topics', value: 'Topics' },
                { label: 'Topic', value: 'Topic' },
            ]}
            onChange={v => {
                setAttributes({ taxonomy: v });
            }}
        />
    );

    const SelectTerm = ({ tm }) => (
        <SelectControl
            value={tm}
            options={terms}
            onChange={v => {
                setAttributes({ term: v });
            }}
        />
    );

    console.log(taxonomy);

    return (
        <Fragment>
            {false === term && <SelectTaxonomy tx={taxonomy} />}
            {false !== taxonomy && false === term && <SelectTerm tm={term} />}
            {false !== term && <h2>{term}</h2>}
            {false !== taxonomy && false !== term && (
                <Fragment>
                    <Tree label="Key Topics" taxonomy={taxonomy} term={term} editMode={isSelected} />
                </Fragment>
            )}
            {false !== setAttributes && (
                // What we need here is a new block called inner-tree-list, it will contain a richtext label and then a tree in itself, passed down into the block attributes for this will be termsToExclude.
                <InnerBlocks allowedBlocks={allowedBlocks} />
                // State where isDisplay is false but alsoe set attribute is false. Internal save mode. But what we ultimately need is a flag "hasInnerBlocks
            )}
            {/* {false === setAttributes && false === isSelected && (
                <InnerBlocks.Content />
            )} */}
        </Fragment>
    );
});

export default edit;

// Select taxonomy
// Select parent term...
// A richtext area for you type in "Key Topics"
// A tree view of 2nd and 3rd and 4th level topics... what it should return however is a flat semantic list.
