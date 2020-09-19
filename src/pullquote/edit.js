/**
 * External dependencies
 */
import classnames from 'classnames';
import { includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
    RichText,
    InspectorControls,
    withColors,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Figure } from './figure';
import { BlockQuote } from './blockquote';

/**
 * Internal dependencies
 */
import { SOLID_COLOR_CLASS } from './shared';

class PullQuoteEdit extends Component {
    constructor(props) {
        super(props);

        this.wasTextColorAutomaticallyComputed = false;
        this.pullQuoteMainColorSetter = this.pullQuoteMainColorSetter.bind(
            this,
        );
        this.pullQuoteTextColorSetter = this.pullQuoteTextColorSetter.bind(
            this,
        );
    }

    componentDidUpdate(prevProps) {
        const { attributes, className, mainColor, setAttributes } = this.props;
        // If the block includes a named color and we switched from the
        // solid color style to the default style.
        if (
            attributes.mainColor &&
            !includes(className, SOLID_COLOR_CLASS) &&
            includes(prevProps.className, SOLID_COLOR_CLASS)
        ) {
            // Remove the named color, and set the color as a custom color.
            // This is done because named colors use classes, in the default style we use a border color,
            // and themes don't set classes for border colors.
            setAttributes({
                mainColor: undefined,
                customMainColor: mainColor.color,
            });
        }
    }

    pullQuoteMainColorSetter(colorValue) {
        const {
            colorUtils,
            textColor,
            setAttributes,
            setTextColor,
            setMainColor,
            className,
        } = this.props;
        const isSolidColorStyle = includes(className, SOLID_COLOR_CLASS);
        const needTextColor =
            !textColor.color || this.wasTextColorAutomaticallyComputed;
        const shouldSetTextColor = isSolidColorStyle && needTextColor;

        if (isSolidColorStyle) {
            // If we use the solid color style, set the color using the normal mechanism.
            setMainColor(colorValue);
        } else {
            // If we use the default style, set the color as a custom color to force the usage of an inline style.
            // Default style uses a border color for which classes are not available.
            setAttributes({ customMainColor: colorValue });
        }

        if (shouldSetTextColor) {
            if (colorValue) {
                this.wasTextColorAutomaticallyComputed = true;
                setTextColor(colorUtils.getMostReadableColor(colorValue));
            } else if (this.wasTextColorAutomaticallyComputed) {
                // We have to unset our previously computed text color on unsetting the main color.
                this.wasTextColorAutomaticallyComputed = false;
                setTextColor();
            }
        }
    }

    pullQuoteTextColorSetter(colorValue) {
        const { setTextColor } = this.props;
        setTextColor(colorValue);
        this.wasTextColorAutomaticallyComputed = false;
    }

    render() {
        const {
            attributes,
            mainColor,
            textColor,
            setAttributes,
            isSelected,
            className,
            insertBlocksAfter,
        } = this.props;

        const { value, citation } = attributes;

        const figureStyles = { '--mark-color': mainColor.color };

        const figureClasses = classnames(className);

        const blockquoteStyles = {
            color: textColor.color,
        };

        const blockquoteClasses =
            textColor.color &&
            classnames('has-text-color', {
                [textColor.class]: textColor.class,
            });

        return (
            <>
                <Figure style={figureStyles} className={figureClasses}>
                    <BlockQuote
                        style={blockquoteStyles}
                        className={blockquoteClasses}
                    >
                        <RichText
                            identifier="value"
                            multiline
                            value={value}
                            onChange={nextValue =>
                                setAttributes({
                                    value: nextValue,
                                })
                            }
                            placeholder={
                                // translators: placeholder text used for the quote
                                __('Write quote…')
                            }
                            textAlign="center"
                        />
                        {(!RichText.isEmpty(citation) || isSelected) && (
                            <RichText
                                identifier="citation"
                                value={citation}
                                placeholder={
                                    // translators: placeholder text used for the citation
                                    __('Write citation…')
                                }
                                onChange={nextCitation =>
                                    setAttributes({
                                        citation: nextCitation,
                                    })
                                }
                                __unstableMobileNoFocusOnMount
                                textAlign="center"
                                __unstableOnSplitAtEnd={() =>
                                    insertBlocksAfter(
                                        createBlock('core/paragraph'),
                                    )
                                }
                            />
                        )}
                    </BlockQuote>
                </Figure>
                <InspectorControls>
                    <PanelColorSettings
                        title={__('Color settings')}
                        colorSettings={[
                            {
                                value: mainColor.color,
                                onChange: this.pullQuoteMainColorSetter,
                                label: __('Mark color'),
                            },
                            {
                                value: textColor.color,
                                onChange: this.pullQuoteTextColorSetter,
                                label: __('Text color'),
                            },
                        ]}
                    />
                </InspectorControls>
            </>
        );
    }
}

export default withColors({
    mainColor: '--mark-color',
    textColor: 'color',
})(PullQuoteEdit);
