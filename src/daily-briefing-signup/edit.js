/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/promo', 'prc-block/story-item'];

const edit = ({ attributes, className, setAttributes }) => {
	const [loaded, toggleLoaded] = useState(false);

	const [template, setTemplate] = useState([]);

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	// Get the latest post from daily briefing and give me story item attributes.

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: 'all',
		template,
	});

	// Init the template.
	useEffect(() => {
		// Do something when the component mounts
		// Go get the latest post from daily briefing
		// Set the story item attributes
		// Set the loaded state to true
		apiFetch({
			path: `/prc-api/v2/blocks/daily-briefing-signup`,
			method: 'GET',
		}).then((p) => {
			console.log(p);
			setTemplate([
				[
					'prc-block/story-item',
					{
						postId: p.ID,
						title: p.post_title,
						excerpt: `<p>${p.post_content}</p>`,
						imageSlot: 'disabled',
						url: p.link,
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
									'prc-block/form-input-field',
									{
										type: 'email',
										placeholder: 'Enter your email address',
										required: true,
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
		return <Fragment />;
	}

	return <div {...innerBlocksProps} />;
};

export default edit;
