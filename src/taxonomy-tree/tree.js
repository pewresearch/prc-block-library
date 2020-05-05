import { useEffect, Fragment } from '@wordpress/element';
import { List, Checkbox } from 'semantic-ui-react';
import { getTermsAsOptions } from '../_shared/helpers';

// additional state: termsSelected (default), moreTermsSelected
// On first init its a list of checkboxes all filling out the "viewable" terms. They will be listed alphabetically. Then if you select view more that will add that term to a moreTermsSelected array or object. moreTermsSelected gets put into an accordion list of of "VIew MOre"import { Animate } from '@wordpress/components';
// Now how do we get the termsSelected and moreTermsSelected fed up to a total list of termsToExclude whenever we're calling this tree. SO after the key topics tree is built and we add additional sub headers those trees would be called with terms to exclude and when it received that it would pre-remove the terms to exclude that matched its termsSelected or moreTermsSelected...
// Maybe we could use the block context api so that this tree could become a block and provide context up higher? then in the main tree view we would have a master termsToExclude data attribute.

const TreeItem = ({ name, url, termID, editMode, termsSelected, setData }) => {
    let checked = false;
    if (undefined !== termsSelected && termsSelected.includes(termID)) {
        checked = true;
    }
    return (
        <Fragment>
            {true === editMode && (
                <Checkbox
                    label={name}
                    defaultChecked={checked}
                    onChange={e => {
                        console.log(`Clicked ${termID}`);
                        console.log('Existing Selected Terms:');
                        console.log(termsSelected);

                        let t = termsSelected;
                        if (undefined !== termsSelected) {
                            t.push(termID);
                        } else {
                            t = [termID];
                        }
                        setData({ termsSelected: t });
                    }}
                />
            )}
            {false === editMode && <a href={url}>{name}</a>}
        </Fragment>
    );
};

const Tree = ({ label, term, taxonomy, termsSelected, editMode, setData }) => {
    let maxHeight = '100%';
    let overflowY = 'auto';
    if (true === editMode) {
        maxHeight = '7.15em';
        overflowY = 'scroll';
    }

    useEffect(() => {
        console.log('Term Change');
        // getTermsAsOptions(taxonomy).then(options => console.log(options));
    }, [term]);

    // get
    return (
        <Fragment>
            <List>
                <List.Item>
                    <List.Header>{label}</List.Header>
                </List.Item>
                <List.Item>
                    <List style={{ maxHeight, overflowY }}>
                        <List.Item>
                            <TreeItem
                                name="Term 1"
                                url="#"
                                termID={1000}
                                editMode={editMode}
                                termsSelected={termsSelected}
                                setData={setData}
                            />
                        </List.Item>
                        <List.Item>
                            <TreeItem
                                name="Term 2"
                                url="#"
                                termID={10001}
                                editMode={editMode}
                                termsSelected={termsSelected}
                                setData={setData}
                            />
                        </List.Item>
                        <List.Item>
                            <TreeItem
                                name="Term 3"
                                url="#"
                                termID={1000}
                                editMode={editMode}
                            />
                        </List.Item>
                        <List.Item>
                            <TreeItem
                                name="Term 4"
                                url="#"
                                termID={1000}
                                editMode={editMode}
                            />
                        </List.Item>
                        <List.Item>
                            <TreeItem
                                name="Term 5"
                                url="#"
                                termID={1000}
                                editMode={editMode}
                            />
                        </List.Item>
                        <List.Item>
                            <TreeItem
                                name="Term 6"
                                url="#"
                                termID={1000}
                                editMode={editMode}
                            />
                        </List.Item>
                    </List>
                </List.Item>
            </List>
        </Fragment>
    );
};

export default Tree;

// We give you the taxonomy and term... if you also p ass in selected which would be an array of term ids already selected then we will show this list with those selected. When you update it we will remove it.
{
    /* <Tree taxonomy={} term={} termsToExclude={} termsSelected={} moreTermsSelected={} setAttribute/> */
}
