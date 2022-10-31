/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	ToolbarGroup,
	ToggleControl,
	PanelBody,
	SVG,
	Path,
} from '@wordpress/components';
// import { cancelCircleFilled, plusCircleFilled } from '@wordpress/icons';
import { select, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const hiddenIcon = (
	<SVG
		xmlns="http://www.w3.org/2000/SVG"
		viewBox="60 0 512 512"
		preserveAspectRatio="xMidYMid meet"
		height={20}
		width={20}
	>
		<Path d="M633.9 483.4C640.9 488.9 642 498.1 636.6 505.9C631.1 512.9 621 514 614.1 508.6L6.086 28.56C-.8493 23.08-2.033 13.02 3.443 6.086C8.918-.8493 18.98-2.033 25.91 3.443L633.9 483.4zM605.5 268.3C595.3 292.9 577.2 325.3 551.6 357.3L526.5 337.5C550.1 307.1 566.8 278.1 576 256C562.7 223.1 533.9 175.1 490.8 136C447.7 95.99 390.4 64 320 64C280.2 64 244.6 74.21 213.4 90.31L186.1 68.78C224 46.8 268.8 31.1 320 31.1C400.8 31.1 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3L605.5 268.3zM88.39 154.7L113.5 174.5C89.86 204 73.23 233.9 63.1 255.1C77.33 288 106.1 336 149.2 376C192.3 416 249.6 448 319.1 448C359.8 448 395.4 437.8 426.6 421.7L453.9 443.2C415.1 465.2 371.2 480 319.1 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44.73 219.1 62.8 186.7 88.39 154.7L88.39 154.7zM191.1 255.1C191.1 249.7 192.5 243.6 193.3 237.5L224.2 261.9C227.2 312.2 268.1 352 319.1 352C325.6 352 331.2 351.5 336.5 350.6L367.4 374.9C352.7 380.8 336.7 384 319.1 384C249.3 384 191.1 326.7 191.1 255.1zM448 255.1C448 262.3 447.5 268.4 446.7 274.5L415.8 250.1C412.8 199.8 371 159.1 319.1 159.1C314.4 159.1 308.8 160.5 303.5 161.4L272.6 137.1C287.3 131.2 303.3 127.1 319.1 127.1C390.7 127.1 448 185.3 448 255.1V255.1z" />
	</SVG>
);

const visibleIcon = (
	<SVG
		xmlns="http://www.w3.org/2000/SVG"
		viewBox="60 0 512 512"
		preserveAspectRatio="xMidYMid meet"
		height={20}
		width={20}
	>
		<Path d="M416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256zM288 160C234.1 160 192 202.1 192 256C192 309 234.1 352 288 352C341 352 384 309 384 256C384 202.1 341 160 288 160zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM32 256C45.33 288 74.13 336 117.2 376C160.3 416 217.6 448 288 448C358.4 448 415.7 416 458.8 376C501.9 336 530.7 288 544 256C530.7 223.1 501.9 175.1 458.8 136C415.7 95.99 358.4 64 288 64C217.6 64 160.3 95.99 117.2 136C74.13 175.1 45.33 223.1 32 256V256z" />
	</SVG>
);

const edit = ({ attributes, setAttributes, clientId }) => {
	const { id } = attributes;

	useEffect(() => {
		if (!id) {
			setAttributes({ id: clientId });
		}
	}, []);

	const TEMPLATE = [
		[
			'core/table',
			{
				className: 'chart-builder-data-table',
				head: [
					{
						cells: [
							{ content: 'x', tag: 'th' },
							{ content: 'y', tag: 'th' },
						],
					},
				],
				body: [
					{
						cells: [
							{ content: '', tag: 'td' },
							{ content: '', tag: 'td' },
						],
					},
					{
						cells: [
							{ content: '', tag: 'td' },
							{ content: '', tag: 'td' },
						],
					},
				],
			},
		],
		[
			'prc-block/chart-builder',
			{
				isConvertedChart: attributes.isConvertedChart,
			},
		],
	];
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={__('Hide table')}
						help={
							attributes.hideTable
								? 'Table hidden in editor view.'
								: 'Table visible in editor view.'
						}
						checked={attributes.hideTable}
						onChange={() => {
							const tableBlock = select('core/block-editor')
								.getBlocks(clientId)
								.find((block) => 'core/table' === block.name);
							if (attributes.hideTable) {
								dispatch('core/editor').updateBlockAttributes(
									tableBlock.clientId,
									{
										className: 'chart-builder-data-table',
									},
								);
							} else {
								dispatch('core/editor').updateBlockAttributes(
									tableBlock.clientId,
									{
										className: 'chart-builder-data-table--hidden',
									},
								);
							}
							setAttributes({ hideTable: !attributes.hideTable });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="hide-table"
						icon={attributes.hideTable ? visibleIcon : hiddenIcon}
						title={
							attributes.hideTable
								? __('Show table in editor view')
								: __('Hide table in editor view')
						}
						onClick={() => {
							const tableBlock = select('core/block-editor')
								.getBlocks(clientId)
								.find((block) => 'core/table' === block.name);
							if (attributes.hideTable) {
								dispatch('core/editor').updateBlockAttributes(
									tableBlock.clientId,
									{
										className: 'chart-builder-data-table',
									},
								);
							} else {
								dispatch('core/editor').updateBlockAttributes(
									tableBlock.clientId,
									{
										className: 'chart-builder-data-table--hidden',
									},
								);
							}
							setAttributes({ hideTable: !attributes.hideTable });
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InnerBlocks template={TEMPLATE} templateLock="all" />
		</div>
	);
};

export default edit;
