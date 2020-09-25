const save = ({ attributes, className }) => {
    const { date } = attributes;

    return <div className={`${className} meta`}>{date}</div>;
};

export default save;
