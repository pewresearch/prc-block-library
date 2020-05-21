
import AccordionBlock from './component';

const edit = ({attributes, setAttributes}) => {
    const { title, className } = attributes;
    console.log(className);
    return( 
        <AccordionBlock title={title} className={className} defaultOpen={true} setAttributes={setAttributes}/>
    );
}

export default edit;