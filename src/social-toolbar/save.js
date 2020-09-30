const save = ({ attributes: { socialIcons } }) => {
    const returnIcon = icon => {
        return (
            <div className="item" style={{ cursor: 'pointer' }}>
                <i className={`icon ${icon}`} />
            </div>
        );
    };
    return (
        <div className="ui container">
            <div className="ui secondary menu share-tools">
                {socialIcons.map(icon => returnIcon(icon))}
            </div>
        </div>
    );
};

export default save;
