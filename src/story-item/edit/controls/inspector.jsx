/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import { TaxonomySelect } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { isInteger } from 'lodash';
import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */
import { refreshPostAttributes } from '../../helpers';

function Inspector({ attributes, setAttributes, context }) {
	const isUsingContext =
		undefined !== context.queryId &&
		undefined !== context.postId &&
		undefined !== context.postType &&
		0 !== context.postId &&
		Number.isInteger(context.postId);
	const [isRefreshing, refresh] = useState(false);
	const {
		imageSize,
		imageSlot,
		enableHeader,
		enableExcerpt,
		enableExcerptBelow,
		enableExtra,
		enableLinkList,
		disableMobileStyles,
		enableMeta,
		metaTaxonomy,
	} = attributes;
	const postId = context?.postId || attributes?.postId;
	const postType = context?.postType || attributes?.postType;

	const label = __('Story Item Options');

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={label}>
					<BaseControl
						help={__(
							'Toggle specific features of a Story Item on or off, for example you can turn off the meta area (date and taxonomy).'
						)}
					>
						<ToggleControl
							label={
								enableMeta ? 'Meta Enabled' : 'Meta Disabled'
							}
							checked={enableMeta}
							onChange={() => {
								setAttributes({ enableMeta: !enableMeta });
							}}
						/>
						<ToggleControl
							label={
								'disabled' !== imageSlot
									? 'Image Enabled'
									: 'Image Disabled'
							}
							checked={'disabled' !== imageSlot}
							onChange={() => {
								setAttributes({
									imageSlot:
										'disabled' === imageSlot
											? 'top'
											: 'disabled',
								});
							}}
						/>
						<ToggleControl
							label={
								enableHeader
									? 'Header Enabled'
									: 'Header Disabled'
							}
							checked={enableHeader}
							onChange={() => {
								setAttributes({ enableHeader: !enableHeader });
							}}
						/>
						<ToggleControl
							label={
								enableExcerpt
									? 'Excerpt Enabled'
									: 'Excerpt Disabled'
							}
							checked={enableExcerpt}
							onChange={() => {
								setAttributes({
									enableExcerpt: !enableExcerpt,
								});
							}}
						/>
						{!isUsingContext && (
							<ToggleControl
								label={
									enableExtra
										? 'Extras Enabled'
										: 'Extras Disabled'
								}
								checked={enableExtra}
								onChange={() => {
									setAttributes({
										enableExtra: !enableExtra,
									});
								}}
							/>
						)}
					</BaseControl>

					<CardDivider />

					<TaxonomySelect
						value={metaTaxonomy}
						onChange={(newTaxonomy) => {
							setAttributes({ metaTaxonomy: newTaxonomy });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={
						!disableMobileStyles
							? 'Mobile Styling Enabled'
							: 'Mobile Styling Disabled'
					}
					help={__(
						'On mobile left aligned images are right aligned and bottom aligned images are top aligned. Additionally, headers max out at medium on mobile style.'
					)}
					checked={disableMobileStyles}
					onChange={() => {
						setAttributes({
							disableMobileStyles: !disableMobileStyles,
						});
					}}
				/>
				{!isUsingContext && (
					<Fragment>
						{isInteger(postId) && 0 !== postId && (
							<div>
								<Button
									variant="secondary"
									isBusy={isRefreshing}
									onClick={() => {
										refresh(true);
										setTimeout(() => {
											refreshPostAttributes({
												postId,
												imageSize,
												isRefresh: true,
												setAttributes,
											});
											refresh(false);
										}, 500);
									}}
									style={{ marginBottom: '1em' }}
									text={__('Refresh Post Data')}
								/>
							</div>
						)}
						<div>
							<Button
								isDestructive
								variant="secondary"
								isBusy={isRefreshing}
								onClick={() => {
									refresh(true);
									setTimeout(() => {
										setAttributes({
											title: '',
											excerpt: '',
											extra: '',
											url: '',
											label: '',
											date: '',
											image: '',
											postId: 0,
										});
										refresh(false);
									}, 500);
								}}
								style={{ marginBottom: '1em' }}
								text={__('Reset Story Item Block')}
							/>
						</div>
					</Fragment>
				)}
			</InspectorAdvancedControls>
		</Fragment>
	);
}

export default Inspector;
