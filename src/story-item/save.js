// eslint-disable-next-line import/no-unresolved
import { StoryItemStatic as StoryItem } from 'shared';

const save = ({ attributes }) => {
    const props = attributes;
    return <StoryItem {...props} />;
};

export default save;
