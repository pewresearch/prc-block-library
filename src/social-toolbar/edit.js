const edit = props => {
    const {
        attributes: { socialIcons },
        setAttributes,
        className,
    } = props;

    const icons = ['twitter', 'facebook', 'linkedin', 'print'];

    const findIcon = icon => {
        return -1 !== socialIcons.findIndex(element => element === icon);
    };

    const toggleIcon = (icon, action) => {
        if ('Add' === action) {
            setAttributes({
                socialIcons: socialIcons.concat(icon.toLowerCase()),
            });
        }
        if ('Delete' === action) {
            setAttributes({
                socialIcons: socialIcons.filter(el => {
                    return el !== icon;
                }),
            });
        }
    };

    return (
        <div className={className}>
            <div>
                {icons.map(icon => {
                    const action = findIcon(icon) ? 'Delete' : 'Add';
                    return (
                        <button
                            type="submit"
                            onClick={() => toggleIcon(icon, action)}
                            style={{
                                border: '2px solid black',
                                padding: '10px',
                                margin: '5px',
                                backgroundColor: 'white',
                            }}
                        >
                            {action} <i className={`icon ${icon}`} />
                        </button>
                    );
                })}
            </div>
            <div>
                {socialIcons.map(icon => (
                    <i
                        className={`icon ${icon}`}
                        style={{ padding: '10px', margin: '5px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default edit;
