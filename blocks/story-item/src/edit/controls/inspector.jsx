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
import { refreshPostAttributes, stubEnabledSiteIds } from '../../helpers';

function Inspector({ attributes, setAttributes, context }) {
	const isUsingContext =
		undefined !== context.queryId &&
		undefined !== context.postId &&
		undefined !== context.postType &&
		0 !== context.postId &&
		Number.isInteger(context.postId);
	const [siteId] = useEntityProp('root', 'site', 'siteId');
	const [isRefreshing, refresh] = useState(false);
	const {
		postId,
		imageSize,
		imageSlot,
		enableHeader,
		enableExcerpt,
		enableExcerptBelow,
		enableExtra,
		enableBreakingNews,
		enableEmphasis,
		disableMobileStyles,
		enableMeta,
		metaTaxonomy,
	} = attributes;

	const label = __('Story Item Options');

	useEffect(() => {
		// If this is not a stub enabled site then automatically switch the metaTaxonomy to category.
		if (!stubEnabledSiteIds.includes(siteId) && 'formats' === metaTaxonomy) {
			console.log('Doing this', siteId, metaTaxonomy);
			setAttributes({ metaTaxonomy: 'category' });
		}
	}, [siteId]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={label}>
					<BaseControl
						help={__(
							'Toggle specific features of a Story Item on or off, for example you can turn off the meta area (date and taxonomy).',
						)}
					>
						<ToggleControl
							label={enableMeta ? 'Meta Enabled' : 'Meta Disabled'}
							checked={enableMeta}
							onChange={() => {
								setAttributes({ enableMeta: !enableMeta });
							}}
						/>
						<ToggleControl
							label={
								'disabled' !== imageSlot ? 'Image Enabled' : 'Image Disabled'
							}
							checked={'disabled' !== imageSlot}
							onChange={() => {
								setAttributes({
									imageSlot: 'disabled' === imageSlot ? 'top' : 'disabled',
								});
							}}
						/>
						<ToggleControl
							label={enableHeader ? 'Header Enabled' : 'Header Disabled'}
							checked={enableHeader}
							onChange={() => {
								setAttributes({ enableHeader: !enableHeader });
							}}
						/>
						<ToggleControl
							label={enableExcerpt ? 'Excerpt Enabled' : 'Excerpt Disabled'}
							checked={enableExcerpt}
							onChange={() => {
								setAttributes({ enableExcerpt: !enableExcerpt });
							}}
						/>
						{!isUsingContext && (
							<Fragment>
								<ToggleControl
									label={enableExtra ? 'Extras Enabled' : 'Extras Disabled'}
									checked={enableExtra}
									onChange={() => {
										setAttributes({ enableExtra: !enableExtra });
									}}
								/>
								<ToggleControl
									label={
										enableBreakingNews
											? 'Breaking News Enabled'
											: 'Breaking News Disabled'
									}
									checked={enableBreakingNews}
									onChange={() => {
										if (false !== window.prcBreakingNews) {
											setAttributes({
												enableBreakingNews: !enableBreakingNews,
											});
										} else {
											// eslint-disable-next-line no-alert
											alert(
												'There are no currently active authorized breaking news events. The breaking news toggle will be set back to false.',
											);
											setAttributes({
												enableBreakingNews: false,
											});
										}
									}}
								/>
								<ToggleControl
									label={
										enableEmphasis ? 'Emphasis Enabled' : 'Emphasis Disabled'
									}
									checked={enableEmphasis}
									onChange={() => {
										setAttributes({ enableEmphasis: !enableEmphasis });
									}}
								/>
							</Fragment>
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
						'If enabled your image slot will change to right aligned (if left aligned), and top aligned (if bottom aligned). Also, large headers will switch to medium headers on mobile.',
					)}
					checked={disableMobileStyles}
					onChange={() => {
						setAttributes({ disableMobileStyles: !disableMobileStyles });
					}}
				/>
				{true === enableExcerpt &&
					('right' === imageSlot || 'left' === imageSlot) && (
						<Fragment>
							<ToggleControl
								label={
									enableExcerptBelow
										? 'Excerpt Will Appear Below Image'
										: 'Excerpt Will Appear Normally'
								}
								help={__(
									'If you have excerpts enabled and a right or left image slot you can force the excerpt to appear below an image.',
								)}
								checked={enableExcerptBelow}
								onChange={() => {
									setAttributes({
										enableExcerptBelow: !enableExcerptBelow,
									});
								}}
							/>
							<CardDivider />
						</Fragment>
					)}

				{isInteger(postId) && 0 !== postId && (
					<div>
						<Button
							isSecondary
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
			</InspectorAdvancedControls>
		</Fragment>
	);
}

export default Inspector;
