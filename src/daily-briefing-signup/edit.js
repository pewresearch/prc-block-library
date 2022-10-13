/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

const ALLOWED_BLOCKS = ['prc-block/promo', 'prc-block/story-item'];

const edit = () => {
	const [loaded, toggleLoaded] = useState(false);

	const [template, setTemplate] = useState([]);

	const blockProps = useBlockProps({});

	// Get the latest post from daily briefing and give me story item attributes.
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: 'all',
		template,
	});

	// Init the template.
	useEffect(() => {
		// Go get the latest post from daily briefing
		// Set the story item attributes
		// Set the loaded state to true
		apiFetch({
			path: `/prc-api/v2/blocks/daily-briefing-signup`,
			method: 'GET',
		}).then((p) => {
			setTemplate([
				[
					'prc-block/story-item',
					{
						postId: p.ID,
						title: p.post_title,
						excerpt: `<p>${p.post_content}</p>`,
						imageSlot: 'disabled',
						url: p.link,
						isPreview: true,
					},
				],
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
								interest: '1d2638430b',
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
		});
	}, []);

	// Set loaded to true when the template has data.
	useEffect(() => {
		// if template is not empty, set the loaded state to true
		if (0 < template.length) {
			toggleLoaded(true);
		}
	}, [template]);

	if (!loaded) {
		return (
			<div>
				Loading Daily Briefing Signup... <Spinner />
			</div>
		);
	}

	return <div {...innerBlocksProps} />;
};

export default edit;
