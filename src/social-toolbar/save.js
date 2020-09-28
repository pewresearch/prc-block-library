const save = ({ attributes: { socialIcons } }) => {
    const returnIcon = icon => {
        if ('facebook' === icon) {
            return (
                <div
                    className="item fb-pew-share"
                    fb-share-url="https://pewrsr.ch/3kOA1cN"
                    fb-share-description=""
                    style={{ cursor: 'pointer' }}
                >
                    <i className="facebook icon" />
                </div>
            );
        }

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
