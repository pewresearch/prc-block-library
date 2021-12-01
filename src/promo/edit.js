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
    useInnerBlocksProps,
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
    'core/paragraph',
];

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
    const {
        className,
        hasDarkBackground,
        heading,
        headingLevel,
        subHeading,
        backgroundColor,
        borderColor,
        icon,
        hasForm,
    } = attributes;

    const hasSubheading =
        undefined !== subHeading &&
        '' !== subHeading &&
        '<p></p>' !== subHeading;

    const hasIcon = undefined !== icon && '' !== icon;

    const {hasChildBlocks, hasMailchimpForm} = useSelect(
        select => {
            const innerBlocks = select( 'core/block-editor' ).getBlock( clientId ).innerBlocks;
            return {
                hasChildBlocks: 0 < select('core/block-editor').getBlockOrder(clientId).length,
                hasMailchimpForm: innerBlocks.filter( ( block ) => block.name === 'prc-block/mailchimp-form' ).length > 0
            }
        },
        [clientId],
    );

    useEffect(()=>{
        setAttributes({hasForm: hasMailchimpForm});
    }, [hasMailchimpForm]);

    const style = { borderColor, backgroundColor };

    const blockProps = useBlockProps({
        className: classnames(className, { 
            'has-icon': hasIcon,
            'has-form': hasForm,
            'has-large-icon': 'alexa' == icon,
            'has-dark-background' : hasDarkBackground
        }),
        style,
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'wp-block-prc-block-promo__action',
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: isSelected
                ? InnerBlocks.ButtonBlockerAppender
                : false,
        },
    );

    return (
        <Fragment>
            <Controls
                {...{
                    hasDarkBackground,
                    backgroundColor,
                    borderColor,
                    headingLevel,
                    icon,
                    setAttributes,
                }}
            />
            <div {...blockProps}>
                <div className="wp-block-prc-block-promo__inner-container">
                    {('is-style-asymmetrical' !== className) && (
                        <Icon icon={icon} isSelected={isSelected} setAttributes={setAttributes} className="wp-block-prc-block-promo__icon"/>
                    )}
                    <div className="wp-block-prc-block-promo__text">
                        <RichText
                            tagName={`h${headingLevel}`}
                            value={heading}
                            onChange={h => setAttributes({ heading: h })}
                            placeholder={__(`Promo title`)}
                            keepPlaceholderOnFocus
                            className="heading sans-serif"
                        />
                        {true === (isSelected || hasSubheading) && (
                            <RichText
                                tagName="div"
                                value={subHeading}
                                onChange={d => setAttributes({ subHeading: d })}
                                placeholder={__(
                                    `Promo description`,
                                )}
                                multiline="p"
                                keepPlaceholderOnFocus
                                className="sub-heading sans-serif"
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
