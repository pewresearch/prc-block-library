/**
 * External Dependencies
 */
import { HeadingLevelToolbar } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
    BlockControls,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    BaseControl,
    ColorPalette,
    PanelBody,
    SelectControl,
    ToggleControl,
} from '@wordpress/components';

const BG_COLORS = [
    { name: 'Black', color: '#333132' },
    { name: 'Gray', color: '#F8F8F8' },
    { name: 'White', color: '#FFF' },
];
const BORDER_COLORS = [
    { name: 'Black', color: '#000' },
    { name: 'Gray', color: '#E4E4E4' },
];

/**
 * Credit: https://awik.io/determine-color-bright-dark-using-javascript/
 */
function lightOrDark(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {
        return 'light';
    }
    else {

        return 'dark';
    }
}

const Controls = ({
    hasDarkBackground,
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
                        <BaseControl label="Background Color" help={hasDarkBackground ? __('The background color selected can make it hard to read dark text. This is an accessibility contrast issue that when enabled will default to lighter text.') : null}>
                            <ColorPalette
                                colors={BG_COLORS}
                                value={backgroundColor}
                                onChange={c =>{
                                    const attrs = {
                                        backgroundColor: c,
                                        hasDarkBackground: false,
                                    };
                                    if ( lightOrDark(c) === 'dark' ) {
                                        attrs.hasDarkBackground = true;
                                    }
                                    setAttributes(attrs);
                                }}
                            />
                            { hasDarkBackground && (
                                <ToggleControl
                                    label={__('Dark Background')}
                                    checked={hasDarkBackground}
                                    onChange={() =>
                                        setAttributes({hasDarkBackground: !hasDarkBackground})
                                    }
                                />
                            )}
                        </BaseControl>
                        <BaseControl label="Border Color">
                            <ColorPalette
                                colors={BORDER_COLORS}
                                value={borderColor}
                                onChange={c => setAttributes({ borderColor: c })}
                            />
                        </BaseControl>
                    </div>
                </PanelBody>
            </InspectorControls>
        </Fragment>
    );
};

export default Controls;
