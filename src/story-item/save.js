// eslint-disable-next-line import/no-unresolved
import { StoryItem } from 'shared';

const save = ({ attributes }) => {
    const props = attributes;
    props.isSelected = false;
    return <StoryItem {...props} />;
};

export default save;
