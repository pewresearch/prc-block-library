/**
 * WordPress Dependencies
 */

const Preview = ({attributes}) => {
    const {
        title,
        excerpt,
        label,
        date,
        imageSlot,
        imageSize
    } = attributes;

    return (
        <div>
            <p>Is Preview?</p>
            <h1>{title}</h1>
        </div>
    );
}

export default Preview;