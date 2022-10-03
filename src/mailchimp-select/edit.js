/**
 * External dependencies
 */
import classnames from 'classnames';
import { mailChimpInterests } from '@prc-app/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	HorizontalRule,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
// import FormList from './form';

const ALLOWED_BLOCKS = ['prc-block/form-input-checkbox', 'core/button'];

const edit = ({ attributes, setAttributes }) => {
	const { interests, className } = attributes;
	const [selected, setSelected] = useState(interests);

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	const updateSelection = (s) => {
		const tmp = selected;
		if (tmp.includes(s)) {
			const index = tmp.indexOf(s);
			if (-1 !== index) {
				tmp.splice(index, 1);
			}
		} else {
			tmp.push(s);
		}
		setAttributes({ interests: tmp });
		setSelected([...tmp]);
	};

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: [
			['prc-block/form-input-checkbox', {}],
			[
				'core/button',
				{
					text: 'Sign Up',
				},
			],
		],
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Mailchimp Interests')}>
					<PanelRow>
						<div>
							{mailChimpInterests.map((i) =>
								false !== i.value ? (
									<ToggleControl
										label={i.label}
										checked={selected.includes(i.value)}
										onChange={() => updateSelection(i.value)}
									/>
								) : (
									<HorizontalRule />
								))}
						</div>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
			{/* <FormList interests={mailChimpInterests} selected={selected} /> */}
		</Fragment>
	);
};

export default edit;
