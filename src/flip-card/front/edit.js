import { InnerBlocks } from '@wordpress/block-editor';
import { FlipControls } from '../flip-controls';

const edit = ({ className, clientId }) => {
    return (
        <div className={className}>
            <FlipControls label="Front of Card" clientId={clientId} />
            <InnerBlocks templateLock={false} template={[['core/paragraph',{}]]}/>
        </div>
    );
};

export default edit;
