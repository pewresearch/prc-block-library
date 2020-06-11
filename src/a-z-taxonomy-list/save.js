/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-unresolved
import { CollapsibleList, TaxonomySelectList } from 'shared';

const save = ({ attributes, className }) => {
    const { heading, letter, include } = attributes;

    return (
        <div className={className}>
            <CollapsibleList
                heading={heading}
                placeholder="A"
                setAttributes={false}
            >
                <TaxonomySelectList
                    include={include}
                    letter={letter}
                    taxonomy="Topics"
                    setAttributes={false}
                />
            </CollapsibleList>
        </div>
    );
};

export default save;
