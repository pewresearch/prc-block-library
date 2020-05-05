const save = ({ attributes }) => {
    const { interest } = attributes;
    return (
        <div
            className="js-react-mailchimp-form"
            data-segment-id={interest}
        />
    );
};

export default save;
