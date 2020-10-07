import { dispatch } from '@wordpress/data';
import { Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

const WpQueryPinControls = ({ wpQueryContext, rootClientId, postId }) => {
    console.log('<ContextControls>', wpQueryContext, rootClientId, postId);
    const isActive = wpQueryContext.includes(postId);
    console.log('isActive?', isActive);
    return (
        <BlockControls>
            <Toolbar
                controls={[
                    {
                        icon: 'sticky',
                        title: 'Pin This',
                        isActive,
                        onClick: () => {
                            const newData = wpQueryContext;
                            // Check if already exists if not treat as new if so then remove.
                            const i = newData.findIndex(x => x === postId);
                            if (-1 === i) {
                                newData.push(postId);
                            } else {
                                newData.splice(i, 1);
                            }
                            console.log('dispatching...', postId);
                            console.log(newData);
                            dispatch('core/block-editor').updateBlockAttributes(
                                rootClientId,
                                {
                                    pinned: JSON.stringify(newData),
                                },
                            );
                        },
                    },
                ]}
            />
        </BlockControls>
    );
};

export default WpQueryPinControls;
