/**
 * External Dependencies
 */
// import { dailyBriefing } from '@prc/newsletters/interestIds';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

const ALLOWED_BLOCKS = ['prc-block/promo', 'prc-block/story-item'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const { isPreview } = attributes;
	const [template, setTemplate] = useState([
		[
			'prc-block/promo',
			{
				heading: 'Get the Daily Briefing by email',
				headingLevel: 2,
				hasForm: true,
				icon: 'journalism',
			},
			[
				[
					'prc-block/mailchimp-form',
					{
						className: 'is-style-horizontal',
						interest: '1d2638430b', // Daily Briefing interest id @TODO: extract on open source
					},
					[
						[
							'prc-block/form-input-text',
							{
								type: 'email',
								placeholder: 'Enter your email address',
								label: 'Email Address',
							},
						],
						[
							'core/button',
							{
								text: 'Sign Up',
							},
						],
					],
				],
			],
		],
	]);

	const blockProps = useBlockProps();

	// Get the latest post from daily briefing and give me story item attributes.
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock: 'all',
			template,
		},
	);

	// Init the template
	useEffect(() => {
		if (false === isPreview) {
			// Go get the latest post from daily briefing
			// Set the story item attributes
			// Set the loaded state to true
			apiFetch({
				path: `/prc-api/v2/blocks/daily-briefing-signup`,
				method: 'GET',
			}).then((p) => {
				const itemToAddToTemplate = [
					'prc-block/story-item',
					{
						postId: p.ID,
						title: p.post_title,
						excerpt: `<p>${p.post_content}</p>`,
						imageSlot: 'disabled',
						url: p.link,
						isPreview: true,
					},
				];
				setTemplate([itemToAddToTemplate, ...template]);
			});
		} else {
			setTemplate([
				[
					'prc-block/story-item',
					{
						postId: 0,
						title: 'Daily Briefing for 2023-01-01',
						excerpt: `<p>Here's what you need to know today.</p>`,
						imageSlot: 'disabled',
						url: '',
						isPreview: true,
					},
				],
				...template,
			]);
		}
	}, [isPreview]);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
}
