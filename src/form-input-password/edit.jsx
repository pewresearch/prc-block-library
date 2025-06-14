/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useMemo } from 'react';
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { getTemplate, doublePasswordTemplate } from './utils';

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
export default function Edit({ attributes, setAttributes, __unstableLayoutClassNames: layoutClassNames, clientId }) {
	const { includesConfirmation } = attributes;

	const blockProps = useBlockProps({
		className: clsx(
			layoutClassNames,
			{
				'has-confirmation': includesConfirmation,
			}
		),
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: false,
			template: includesConfirmation ? doublePasswordTemplate : getTemplate(attributes),
		}
	);

	return (
		<>
			<div {...blockProps}>
				{innerBlocksProps.children}
				{includesConfirmation && (
					<div className="prc-block-form-input-password__analyzer">
						<p>Password Must:</p>
						<ul>
							<li className="is-valid">
								<span className="fa fa-solid fa-check"></span>{' '}
								Includes one lowercase letter
							</li>
							<li>
								<span className="fa fa-regular fa-xmark"></span>{' '}
								Includes one uppercase letter
							</li>
							<li>
								<span className="fa fa-regular fa-xmark"></span>{' '}
								Includes one number
							</li>
							<li>
								<span className="fa fa-regular fa-xmark"></span>{' '}
								Includes one special character
							</li>
							<li>
								<span className="fa fa-regular fa-xmark"></span>{' '}
								Be at least 12 characters long
							</li>
							<li>
								<span className="fa fa-regular fa-xmark"></span>{' '}
								Not include invalid characters
							</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
