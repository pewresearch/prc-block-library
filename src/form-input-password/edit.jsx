/**
 * External Dependencies
 */
import classnames from 'classnames';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { Fragment, useMemo } from 'react';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * Construct a simple form field template for the input text block.
 * @param {*} attributes
 * @param {*} label
 * @param {*} name
 * @returns
 */
const getTemplate = (attributes, label = 'Password', name = 'password') => {
	const {
		includesConfirmation,
	} = attributes;

	return [
		'prc-block/form-field',
		{
			label,
			required: true,
		},
		[[
			'prc-block/form-input-text',
			{
				type: 'password',
				placeholder: includesConfirmation ? 'Password...' : 'Confirm Password...',
				isInteractive: true,
				interactiveNamespace: 'prc-block/form-input-password',
				metadata: {
					name
				}
			},
		]]
	]
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		includesConfirmation,
	} = attributes;

	const template = useMemo(() => {
		return includesConfirmation ? [
			getTemplate(attributes),
			getTemplate(attributes, 'Confirm Password', 'confirmPassword'),
		] : [getTemplate(attributes)];
	}, [includesConfirmation]);

	const orientation = useMemo(() => {
		return includesConfirmation ? 'vertical' : 'horizontal';
	}, [includesConfirmation]);

	const blockProps = useBlockProps({
		className: classnames({
			'has-confirmation': includesConfirmation,
		}),
		style: {
			'--block-gap': getBlockGapSupportValue(attributes, 'horizontal'),
		}
	});
	const innerBlocksProps = useInnerBlocksProps({
		className: 'wp-block-prc-block-form-input-password__input',
	}, {
		allowedBlocks: [
			'prc-block/form-input-text',
			'prc-block/form-field',
		],
		templateLock: true,
		template,
		orientation,
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes }} />
			<div {...blockProps}>
				<div {...innerBlocksProps} />
				{includesConfirmation && (
					<div className="wp-block-prc-block-form-input-password__analyzer">
						<p>Password Must:</p>
						<ul>
							<li classname="is-valid"><span classname="fa fa-solid fa-check"></span> Includes one lowercase letter</li>
							<li><span classname="fa fa-regular fa-xmark"></span> Includes one uppercase letter</li>
							<li><span classname="fa fa-regular fa-xmark"></span> Includes one number</li>
							<li><span classname="fa fa-regular fa-xmark"></span> Includes one special character</li>
							<li><span classname="fa fa-regular fa-xmark"></span> Be at least 12 characters long</li>
							<li><span classname="fa fa-regular fa-xmark"></span> Not include invalid characters</li>
						</ul>
					</div>
				)}
			</div>
		</Fragment>
	);
}
