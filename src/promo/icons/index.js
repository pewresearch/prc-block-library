const Icon = ({ svg, sizeInPX }) => {
    // Go ahead and sanitize the output here instead of waiting for WP to do it, otherwise you'll get a diff error.
    return (
        <img src={svg} width={sizeInPX} height={sizeInPX} alt="Election 2020" />
    );
};

export default Icon;
