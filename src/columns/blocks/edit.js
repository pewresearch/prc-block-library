import { InnerBlocks } from '@wordpress/block-editor';
import numWords from 'num-words';

const edit = ({attributes, setAttributes}) => {
    const {width} = attributes;
    console.log(width);
    console.log(numWords(width));
    return(
        <div className='prc blocks column'>
            <InnerBlocks/>
        </div>
    );
}

export default edit;