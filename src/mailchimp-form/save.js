const save = ({ attributes, className }) => {
    const { interest } = attributes;
    return <div className={className} data-segment-id={interest} />;
};

export default save;
