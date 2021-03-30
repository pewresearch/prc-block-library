/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const VerticalControls = ({ vertical, controllerClientId }) => {
    const { updateBlockAttributes } = useDispatch('core/block-editor');
    return (
        <InspectorControls>
            <PanelBody title={__('Tab Controller Settings')}>
                <ToggleControl
                    label="Vertical Orientation"
                    checked={vertical}
                    onChange={() => {
                        updateBlockAttributes(controllerClientId, {
                            vertical: !vertical,
                        });
                    }}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default VerticalControls;
