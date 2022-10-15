/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { flipHorizontal as icon } from '@wordpress/icons';
import {
	Button,
	PanelBody,
	PanelRow,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/image',
	'core/quote',
	'core/separator',
	'core/spacer',
	'core/table',
	'core/verse',
	'core/preformatted',
	'core/pullquote',
	'core/button',
	'core/buttons',
	'core/more',
	'core/nextpage',
	'core/file',
	'core/media-text',
	'core/social-links',
	'core/social-link',
	'core/group',
];

function Controls({ clientId }) {
	const { controllerClientId, flipped } = useSelect(
		(select) => {
			const { getBlockName, getBlockRootClientId, getBlockAttributes } =
				select('core/block-editor');

			// eslint-disable-next-line no-underscore-dangle
			const _controllerClientId =
				'prc-block/flip-card' === getBlockName(clientId)
					? clientId
					: getBlockRootClientId(clientId);
			const controlsAttributes = getBlockAttributes(_controllerClientId);

			return {
				...controlsAttributes,
				controllerClientId: _controllerClientId,
			};
		},
		[clientId],
	);

	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const toggleFlip = () => {
		updateBlockAttributes(controllerClientId, {
			flipped: !flipped,
		});
	};

	const label = flipped ? __('Flip to Front') : __('Flip to Back');

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={icon}
						label={label}
						f
						onClick={() => {
							toggleFlip();
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={label}>
					<PanelRow>
						<Button
							variant="primary"
							onClick={() => {
								toggleFlip();
							}}
						>
							Flip to <strong>{flipped ? ` Front` : ` Back`}</strong>
						</Button>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export { ALLOWED_BLOCKS, Controls };
