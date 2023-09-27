/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useDispatch, select } from '@wordpress/data';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
/**
 * Internal Dependencies
 */
import store from './store';

const COPY_STYLES_LABEL = __('Copy layout');
const PASTE_STYLES_LABEL = __('Paste layout');

const CopyPasteStylesHandler = ({ children, attributes, setAttributes }) => {
	const {
		maxWidth,
		barColor,
		backgroundColor,
		categoryLabelColor,
		showAxisLabel,
		axisPadding,
		axisLabelMaxWidth,
		labelFormat,
		labelPositionDX,
		labelPositionDY,
	} = attributes;
	const layoutAttributes = {
		maxWidth,
		barColor,
		backgroundColor,
		categoryLabelColor,
		showAxisLabel,
		axisPadding,
		axisLabelMaxWidth,
		labelFormat,
		labelPositionDX,
		labelPositionDY,
	};

	const { copyLayoutStyles } = useDispatch(store);

	const hasCopiedLayoutStyles = select(store).getCopiedStylesStatus();
	const copyStyles = () => {
		copyLayoutStyles(layoutAttributes);
	};
	const pasteStyles = () => {
		const { getCopiedStyles } = select(store);
		const styles = getCopiedStyles();
		console.log({ styles });
		setAttributes({
			...attributes,
			...styles,
		});
	};

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="copy-styles"
						label={COPY_STYLES_LABEL}
						title={COPY_STYLES_LABEL}
						onClick={() => copyStyles()}
					>
						{COPY_STYLES_LABEL}
					</ToolbarButton>
				</ToolbarGroup>
				{hasCopiedLayoutStyles && (
					<ToolbarGroup>
						<ToolbarButton
							name="paste-styles"
							label={PASTE_STYLES_LABEL}
							title={PASTE_STYLES_LABEL}
							onClick={() => pasteStyles()}
						>
							{PASTE_STYLES_LABEL}
						</ToolbarButton>
					</ToolbarGroup>
				)}
			</BlockControls>
			{children}
		</Fragment>
	);
};

export default CopyPasteStylesHandler;
