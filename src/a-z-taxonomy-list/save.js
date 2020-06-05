import { CollapsibleList } from 'shared';

const save = ({ attributes, className, setAttributes }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <CollapsibleList heading={heading} setAttributes={false}>
                <p>Test</p>
            </CollapsibleList>
        </div>
    );
};

export default save;
