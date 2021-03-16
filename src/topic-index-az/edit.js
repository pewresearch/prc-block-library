/**
 * WordPress Dependencies:
 */
import { SelectControl } from '@wordpress/components';

/**
 * Internal Dependencies:
 */
import { CollapsibleList } from 'shared';
import TaxonomySelectList from './taxonomy-select-list';

const edit = ({ attributes, className, setAttributes, isSelected }) => {
    const { heading, letter, exclude, include } = attributes;

    const SelectLetter = () => {
        return (
            <SelectControl
                label="Chose a letter"
                value={letter}
                options={[
                    { label: '(Click to select letter)', value: '' },
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
                onChange={l => {
                    setAttributes({
                        letter: l,
                        heading: l,
                        exclude: '',
                        include: '',
                    });
                }}
            />
        );
    };

    return (
        <div className={className}>
            <CollapsibleList
                heading={heading}
                placeholder="A"
                setAttributes={false}
            >
                {'' === letter && <SelectLetter />}
                {'' !== letter && (
                    <TaxonomySelectList
                        exclude={exclude}
                        include={include}
                        letter={letter}
                        taxonomy="Topic"
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                    />
                )}
            </CollapsibleList>
        </div>
    );
};

export default edit;
