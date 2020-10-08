const edit = ({ attributes, className }) => {
    const { name, jobTitle, image, link } = attributes;
    return (
        <div className={className}>
            <h2>{name}</h2>
            <p>{jobTitle}</p>
            <p>{image}</p>
            <p>{link}</p>
        </div>
    );
};

export default edit;
