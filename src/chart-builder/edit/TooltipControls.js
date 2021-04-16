import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const TooltipControls = ({ attributes, setAttributes }) => {
    const { tooltipFormat, tooltipActive } = attributes;
    return (
        <PanelBody title={__('Tooltip')} initialOpen={false}>
            <ToggleControl
                label={__('Show Tooltip')}
                checked={tooltipActive}
                onChange={() =>
                    setAttributes({ tooltipActive: !tooltipActive })
                }
            />
            <TextControl
                label={__('Tooltip Format')}
                help={__(
                    "Tooltip formatter is a string that takes two variables. The first variable(%1$s) corresponds with the x value of a node, and the second(%2$s), the y value. (eg. '%1$s: %2$s people' would return something like '2010: 500 people')",
                )}
                disabled={!tooltipActive}
                value={tooltipFormat}
                placeholder={'%1$s: %2$s'}
                onChange={(val) => setAttributes({ tooltipFormat: val })}
            />
        </PanelBody>
    );
};

export default TooltipControls;
