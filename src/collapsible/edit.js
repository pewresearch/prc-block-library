import AccordionBlock from './component';

const edit = ({ attributes, setAttributes }) => {
    const { title, className } = attributes;
    return (
        <AccordionBlock
            title={title}
            className={className}
            defaultOpen
            setAttributes={setAttributes}
        />
    );
};

export default edit;
