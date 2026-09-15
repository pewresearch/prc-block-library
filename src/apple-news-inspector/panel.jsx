/**
 * Apple News inspector panel for image and group blocks.
 */

import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { doAction } from '@wordpress/hooks';
import { seen } from '@wordpress/icons';

import {
	OPEN_APPLE_NEWS_PREVIEW,
	getAppleNewsAlign,
	nextAppleNewsAlign,
} from './utils';

export default function AppleNewsInspectorPanel({ attributes, setAttributes }) {
	const align = getAppleNewsAlign(attributes);

	return (
		<InspectorControls>
			<PanelBody
				title={__('Apple News', 'prc-block-library')}
				initialOpen={false}
			>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Alignment', 'prc-block-library')}
					help={__(
						'Overrides this block’s web alignment in Apple News only.',
						'prc-block-library'
					)}
					value={align}
					options={[
						{
							label: __(
								'Inherit (use web alignment)',
								'prc-block-library'
							),
							value: 'inherit',
						},
						{
							label: __(
								'Wide on Apple News',
								'prc-block-library'
							),
							value: 'wide',
						},
						{
							label: __(
								'Center on Apple News',
								'prc-block-library'
							),
							value: 'center',
						},
						{
							label: __(
								'Left on Apple News',
								'prc-block-library'
							),
							value: 'left',
						},
						{
							label: __(
								'Right on Apple News',
								'prc-block-library'
							),
							value: 'right',
						},
					]}
					onChange={(next) =>
						setAttributes(nextAppleNewsAlign(attributes, next))
					}
				/>
				<Button
					style={{ width: '100%', justifyContent: 'center' }}
					variant="secondary"
					icon={seen}
					onClick={() => doAction(OPEN_APPLE_NEWS_PREVIEW)}
					__next40pxDefaultSize
				>
					{__('Preview in Apple News', 'prc-block-library')}
				</Button>
			</PanelBody>
		</InspectorControls>
	);
}
