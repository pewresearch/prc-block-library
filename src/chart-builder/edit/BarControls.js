/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

const BarControls = ({ attributes, setAttributes }) => {
    const { barWidth, barGroupOffset } = attributes;
    return (
        <PanelBody title={__('Bar Chart Configuration')} initialOpen={false}>
            <NumberControl
                label={__('Bar Width')}
                value={barWidth}
                onChange={(value) =>
                    setAttributes({ barWidth: formatNum(value, 'integer') })
                }
            />
            <NumberControl
                label={__('Grouped Bar Offset')}
                help={__('Determines space between bars in a group.')}
                value={barGroupOffset}
                onChange={(value) =>
                    setAttributes({
                        barGroupOffset: formatNum(value, 'integer'),
                    })
                }
            />
        </PanelBody>
    );
};

export default BarControls;
