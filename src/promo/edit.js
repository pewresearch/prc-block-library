/**
 * External Dependencies
 */
import classnames from 'classnames';
import { HeadingLevelToolbar } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
	BlockControls,
	RichText,
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Icon from './icons';

const ALLOWED_BLOCKS = [
	'core/buttons',
	'core/paragraph',
	// 'prc-block/menu-link',
	'prc-block/mailchimp-form',
];

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
	const { className, heading, headingLevel, subHeading, icon, hasForm } =
		attributes;

	const hasSubheading =
		undefined !== subHeading && '' !== subHeading && '<p></p>' !== subHeading;

	const hasIcon = undefined !== icon && '' !== icon;

	const { hasChildBlocks, hasMailchimpForm } = useSelect(
		(select) => {
			const { innerBlocks } = select('core/block-editor').getBlock(clientId);
			return {
				hasChildBlocks:
					0 < select('core/block-editor').getBlockOrder(clientId).length,
				hasMailchimpForm:
					0 <
					innerBlocks.filter(
						(block) => 'prc-block/mailchimp-form' === block.name,
					).length,
			};
		},
		[clientId],
	);

	useEffect(() => {
		setAttributes({ hasForm: hasMailchimpForm });
	}, [hasMailchimpForm]);

	// const style = { borderColor, backgroundColor };

	const blockProps = useBlockProps({
		className: classnames(className, {
			'has-icon': hasIcon,
			'has-form': hasForm,
			'has-large-icon': 'alexa' == icon,
			// 'has-dark-background': hasDarkBackground,
		}),
		// style,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-prc-block-promo__action',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'vertical',
			templateLock: false,
			renderAppender: isSelected ? InnerBlocks.ButtonBlockerAppender : false,
		},
	);

	return (
		<Fragment>
			<BlockControls>
				<HeadingLevelToolbar
					selectedLevel={headingLevel}
					onChange={(newLevel) => setAttributes({ headingLevel: newLevel })}
				/>
			</BlockControls>
			<div {...blockProps}>
				<div className="wp-block-prc-block-promo__inner-container">
					{'is-style-asymmetrical' !== className && (
						<Icon
							icon={icon}
							isSelected={isSelected}
							setAttributes={setAttributes}
							className="wp-block-prc-block-promo__icon"
						/>
					)}
					<div className="wp-block-prc-block-promo__text">
						<RichText
							tagName={`h${headingLevel}`}
							value={heading}
							onChange={(h) => setAttributes({ heading: h })}
							placeholder={__(`Promo title`)}
							keepPlaceholderOnFocus
							className="wp-block-prc-block-promo__heading"
						/>
						{true === (isSelected || hasSubheading) && (
							<RichText
								tagName="div"
								value={subHeading}
								onChange={(d) => setAttributes({ subHeading: d })}
								placeholder={__(`Promo description`)}
								multiline="p"
								keepPlaceholderOnFocus
								className="wp-block-prc-block-promo__sub_heading"
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
