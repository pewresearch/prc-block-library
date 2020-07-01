const save = ({ attributes }) => {
    const { interest, className } = attributes;
    return (
        <div
            className="js-react-mailchimp-form"
            data-segment-id={interest}
            data-style={className}
        />
    );
};

export default save;
