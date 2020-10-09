const save = ({ attributes, className }) => {
    const { name, jobTitle, image, link } = attributes;
    return (
        <a className={className} href={link}>
            {undefined !== image && (
                <div className="profile-image">
                    <img src={image} alt={`${name} profile`} />
                </div>
            )}
            <div>
                <h3 className="sans-serif">{name}</h3>
                <div className="meta">
                    <span>{jobTitle}</span>
                </div>
            </div>
        </a>
    );
};

export default save;
