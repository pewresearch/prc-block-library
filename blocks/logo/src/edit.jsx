/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { ResizableBox } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';

// Assets
import { ReactComponent as Logo } from '../assets/primary.svg';
import { ReactComponent as LogoWhite } from '../assets/primary-white.svg';
import { ReactComponent as LogoAlt } from '../assets/alternate.svg';
import { ReactComponent as LogoAltWhite } from '../assets/alternate-white.svg';
import { ReactComponent as Symbol } from '../assets/symbol.svg';
import { ReactComponent as SymbolWhite } from '../assets/symbol-white.svg';
import { ReactComponent as DecodedLogo } from '../assets/decoded.svg';

export default function Edit({ attributes, setAttributes, isSelected }) {
	const { width, justification, darkModeEnabled, className } = attributes;
	// disabling for now. not actually being used, and is causing block to break
	// const { currentTheme } = useSelect((select) => {
	// 	return {
	// 		currentTheme: select('core').getCurrentTheme().stylesheet,
	// 	};
	// });

	const blockProps = useBlockProps({
		className: classNames(className, {
			'items-justified-left': 'left' === justification,
			'items-justified-center': 'center' === justification,
			'items-justified-right': 'right' === justification,
			'has-dark-mode-support': darkModeEnabled,
		}),
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes }} />
			<div {...blockProps}>
				<ResizableBox
					className="wp-block-prc-block-logo__dimensions"
					size={{
						width,
					}}
					minWidth={100}
					maxWidth={360}
					enable={{
						top: false,
						right: isSelected,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					}}
					onResizeStop={(event, direction, elt, delta) => {
						setAttributes({
							width: parseInt(width + delta.width, 10),
						});
					}}
					bounds="parent"
					style={isSelected ? {} : { 'max-width': `${width}px` }}
				>
					<div className="wp-block-prc-block-logo__inner">
						<div className="wp-block-prc-block-logo__inner__logo">
							<Logo data-browser-theme="light" />
							<LogoWhite data-browser-theme="dark" />
						</div>
						<div className="wp-block-prc-block-logo__inner__logo-alt">
							<LogoAlt data-browser-theme="light" />
							<LogoAltWhite data-browser-theme="dark" />
						</div>
						<div className="wp-block-prc-block-logo__inner__decoded">
							<DecodedLogo data-browser-theme="light" />
						</div>
					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
}
