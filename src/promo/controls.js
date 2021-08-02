/**
 * External Dependencies
 */
import { HeadingLevelToolbar } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
    BlockControls,
    InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
    BaseControl,
    ColorPalette,
    PanelRow,
    PanelBody,
    SelectControl,
    ToggleControl,
} from '@wordpress/components';

const BG_COLORS = [
    { name: 'Black', color: '#000' },
    { name: 'Gray', color: '#F8F8F8' },
    { name: 'White', color: '#fff' },
];
const BORDER_COLORS = [
    { name: 'Black', color: '#000' },
    { name: 'Gray', color: '#F8F8F8' },
];
const ICONS = [
    { label: 'None', value: '' },
    { label: 'Audio', value: 'audio' },
    { label: 'Donate', value: 'donate' },
    { label: 'Election', value: 'election' },
    { label: 'Mail', value: 'mail' },
];

const Controls = ({
    backgroundColor,
    borderColor,
    headingLevel,
    icon,
    setAttributes,
}) => {
    return (
        <Fragment>
            <BlockControls>
                <HeadingLevelToolbar
                    selectedLevel={headingLevel}
                    onChange={newLevel =>
                        setAttributes({ headingLevel: newLevel })
                    }
                />
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Promo Design Options')}>
                    <div>
                        <BaseControl label="Background Color">
                            <ColorPalette
                                colors={BG_COLORS}
                                value={backgroundColor}
                                onChange={c =>
                                    setAttributes({ backgroundColor: c })
                                }
                                disableCustomColors
                            />
                        </BaseControl>
                        <BaseControl label="Border Color">
                            <ColorPalette
                                colors={BORDER_COLORS}
                                value={borderColor}
                                onChange={c => setAttributes({ borderColor: c })}
                            />
                        </BaseControl>
                        <SelectControl
                            label="Select Icon"
                            value={icon}
                            options={ICONS}
                            onChange={i => setAttributes({ icon: i })}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>
        </Fragment>
    );
};

export default Controls;