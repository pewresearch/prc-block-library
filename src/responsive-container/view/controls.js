/**
 * External Dependencies
 */
import classnames from 'classnames';

 /**
  * WordPress Dependencies
  */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    Flex,
    FlexItem,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';

const Controls = ({attributes, setAttributes}) => {
    const { min, max } = attributes;

    return(
        <Flex>
            <FlexItem>
                <NumberControl
                    label={__('Min Width')}
                    value={min}
                    onChange={(val) => {
                        setAttributes({
                            min: parseInt(val),
                        });
                    }}
                />
            </FlexItem>
            <FlexItem>
                <NumberControl
                    label={__('Max Width')}
                    value={max}
                    onChange={(val) => {
                        setAttributes({
                            max: parseInt(val),
                        });
                    }}
                />
            </FlexItem>
        </Flex>
    );
}

export default Controls;