/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
    RichText,
    InnerBlocks,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import Icon from './icons';

const ALLOWED_BLOCKS = [
    'prc-block/menu-link',
    'prc-block/mailchimp-form',
    'prc-blocks/pathways-ask-an-analyst',
];

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
    const {
        className,
        heading,
        headingLevel,
        subHeading,
        backgroundColor,
        borderColor,
        icon,
    } = attributes;

    const hasSubheading =
        undefined !== subHeading &&
        '' !== subHeading &&
        '<p></p>' !== subHeading;

    const hasIcon = undefined !== icon && '' !== icon;

    const hasChildBlocks = useSelect(
        select =>
            0 < select('core/block-editor').getBlockOrder(clientId).length,
        [clientId],
    );

    const style = { borderColor, backgroundColor };

    const blockProps = useBlockProps({
        className: classnames(className, { 
            'has-icon': hasIcon, 
            'has-dark-background' : '#000' === backgroundColor
        }),
        style,
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'action',
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: !hasChildBlocks
                ? InnerBlocks.ButtonBlockAppender
                : false,
        },
    );

    return (
        <Fragment>
            <Controls
                {...{
                    backgroundColor,
                    borderColor,
                    headingLevel,
                    icon,
                    setAttributes,
                }}
            />
            <div {...blockProps}>
                <div className="wp-block-prc-block-promo__inner-container">
                    {hasIcon && (
                        <div className="icon">
                            <Icon icon={icon} />
                        </div>
                    )}
                    <div className="text">
                        <RichText
                            tagName={`h${headingLevel}`}
                            value={heading}
                            onChange={h => setAttributes({ heading: h })}
                            placeholder={__(`Facts are more important than ever.`)}
                            keepPlaceholderOnFocus
                            className="heading"
                        />
                        {true === (isSelected || hasSubheading) && (
                            <RichText
                                tagName="div"
                                value={subHeading}
                                onChange={d => setAttributes({ subHeading: d })}
                                placeholder={__(
                                    `In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.`,
                                )}
                                multiline="p"
                                keepPlaceholderOnFocus
                                className="sub-heading"
                            />
                        )}
                    </div>
                    {true === (isSelected || hasChildBlocks) && (
                        <div {...innerBlocksProps} />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default edit;
