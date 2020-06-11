/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-unresolved
import { CollapsibleList, TaxonomySelectList } from 'shared';

const save = ({ attributes, className }) => {
    const { heading, letter, include } = attributes;

    console.log('save mode::');

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
                    setAttributes={false}
                />
            </CollapsibleList>
        </div>
    );
};

export default save;
