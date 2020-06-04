import { CollapsibleList } from 'shared';

const save = ({ attributes, className, setAttributes }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <CollapsibleList heading={heading} setAttributes={setAttributes}>
                <p>Test</p>
            </CollapsibleList>
        </div>
    );
};

export default save;
