// eslint-disable-next-line import/no-unresolved
import { StoryItemPlaceholder } from 'shared';

const save = ({ attributes }) => {
    const props = attributes;
    return <StoryItemPlaceholder {...props} />;
};

export default save;
