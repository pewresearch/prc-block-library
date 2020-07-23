import { RichText } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { newsletters, socialMedia } = attributes;
    return (
        <div className="js-react-follow-us" data-newsletters={newsletters}>
            <RichText.Content
                className="ui link list"
                tagName="div"
                value={socialMedia}
            />
        </div>
    );
};

export default save;
