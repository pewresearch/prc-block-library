/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    SelectControl,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

const NodeControls = ({ attributes, setAttributes }) => {
    const { nodeSize, nodeStroke, nodeFill } = attributes;
    return (
        <PanelBody title={__('Node Styles')} initialOpen={false}>
            <NumberControl
                min={1}
                label={__('Node Size')}
                value={nodeSize}
                onChange={(value) =>
                    setAttributes({ nodeSize: formatNum(value, 'integer') })
                }
            />
            <NumberControl
                min={1}
                label={__('Node Stroke')}
                value={nodeStroke}
                onChange={(value) =>
                    setAttributes({
                        nodeStroke: formatNum(value, 'integer'),
                    })
                }
            />
            <SelectControl
                label={__('Node Fill')}
                options={[
                    { label: 'Inherit', value: 'inherit' },
                    { label: 'White', value: 'white' },
                ]}
                value={nodeFill}
                onChange={(value) => setAttributes({ nodeFill: value })}
            />
        </PanelBody>
    );
};

export default NodeControls;
