import apiFetch from '@wordpress/api-fetch';
import { useEffect } from '@wordpress/element';

const setPostByURL = (url, setAttributes) => {
    if (undefined === setAttributes || undefined === url) {
        return;
    }
    console.log('setPostByURL', url);

    apiFetch({
        path: `/prc-api/v2/blocks/helpers/get-staff-by-url/?url=${url}`,
    }).then(post => {
        if (false !== post) {
            const staff = {
                name: post.title,
                jobTitle: post.label,
                image: post.image,
            };
            setAttributes(staff);
        }
    });
};

const edit = ({ attributes, className, setAttributes }) => {
    const { name, jobTitle, image, link } = attributes;
    useEffect(() => {
        setPostByURL(link, setAttributes);
    }, [link]);
    return (
        <div className={className}>
            {undefined !== image && (
                <div className="profile-image">
                    <img src={image} alt={`${name} profile`} />
                </div>
            )}
            <div>
                <h2 className="sans-serif">{name}</h2>
                <div className="meta">
                    <span>{jobTitle}</span>
                </div>
            </div>
        </div>
    );
};

export default edit;
