import { CollapsibleList, getTerms } from 'shared';
import { SelectControl, CheckboxControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const edit = withState( {
    terms: [],
} )( ( { attributes, className, terms, setAttributes, setState } ) => {
    const { heading, letter, selected } = attributes;
    console.log('Tax List');
    console.log(terms);
    console.log(attributes);

    return (
        <div className={className}>
            <CollapsibleList heading={heading} placeholder="A" setAttributes={false}>
                <SelectControl
                label="Chose a letter"
                value={ letter }
                options={ [
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
                ] }
                onChange={ ( l ) => { 
                    setAttributes( { letter: l, heading: l } );
                    getTerms('Topics', 100, l).then((t)=>{
                        console.log(t);
                        setState({terms: t});
                    });
                } }
            />
            <div className="ui link list">
                <label class="components-base-control">Select the terms you want to display</label>
                { terms.map( (term, index) => (
                    <div className="item">
                        <CheckboxControl
                            label={term.name}
                            checked={ selected.includes(term.term_id) }
                            onChange={ () => {
                                selected.push(term.term_id);
                                setAttributes({selected: selected});
                            } }
                        />
                    </div>
                ) ) }
            </div>
            </CollapsibleList>
        </div>
    );
} );

export default edit;
