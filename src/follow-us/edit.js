import { RichText } from '@wordpress/block-editor';
import FollowUs from './component';

const edit = ({ attributes, isSelected, setAttributes }) => {
    const data = attributes;
    data.setAttributes = false;
    data.editMode = true;
    if (true === isSelected) {
        data.setAttributes = setAttributes;
    }
    return (
        <FollowUs {...data}>
            <RichText.Content
                className="ui link list"
                tagName="div"
                value={data.socialMedia}
            />
        </FollowUs>
    );
};

export default edit;
