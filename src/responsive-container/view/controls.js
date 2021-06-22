/**
 * External Dependencies
 */
import classnames from 'classnames';

 /**
  * WordPress Dependencies
  */
import { __, sprintf } from '@wordpress/i18n';
import {
    BlockControls
} from '@wordpress/block-editor';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
    Flex,
    FlexItem,
    FlexBlock,
    Notice,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const Controls = ({attributes, setAttributes, clientId}) => {
    const { min, max } = attributes;

    const [label, setLabel] = useState(`${min}px to ${max}px`);

    useEffect(()=>{
        let l = `between ${min}px and ${max}px`;
        if ( !max ) {
            l = `minimum ${min}px`;
        }
        if ( !min ) {
            l = `maximum ${max}px`;
        }
        setLabel(l);
    }, [min, max]);

    // Determine maximum for numberControl component based on minimum of prior block.
    const newMax = useSelect(select=> {
        const previousBlockClientId = select('core/block-editor').getPreviousBlockClientId(clientId);
        const previousBlockAttrs = select('core/block-editor').getBlockAttributes(previousBlockClientId);
        if ( null == previousBlockAttrs ) {
            return 0;
        }
        return (previousBlockAttrs.min - 1);
    });

    return(
        <Fragment>
            <Notice isDismissible={false} spokenMessage={__(`Visible from ${min} pixels to ${max} pixels`)}>
                <span className="sans-serif"><strong>Viewport Range:</strong> {__(label)}</span>
            </Notice>
            <BlockControls>    
                <div style={{
                    minWidth: '200px',
                    maxWidth: '300px',
                    width: '100%',
                    paddingTop: '7px',
                    paddingLeft: '5px'
                }}>
                    <Flex align="center">
                        <FlexBlock>
                            <NumberControl value={min} min={0} max={max} onChange={(val) => {
                                setAttributes({
                                    min: parseInt(val),
                                });
                            }}/>
                        </FlexBlock>
                        <FlexItem>
                            <span><strong>~ to ~</strong></span>
                        </FlexItem>
                        <FlexBlock>
                            <NumberControl value={max} min={0} max={newMax} disabled={0 === newMax} onChange={(val) => {
                                setAttributes({
                                    max: parseInt(val),
                                });
                            }}/>
                        </FlexBlock>
                    </Flex>
                </div>
            </BlockControls>
        </Fragment>
    );
}

export default Controls;