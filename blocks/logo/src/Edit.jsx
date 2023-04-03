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
import JustificationControl from './JustificationControl';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as LogoAlt } from '../assets/logo-alt.svg';
import decodedSVGUrl, {
	ReactComponent as LogoDecoded,
} from '../assets/decoded.svg';

export default function Edit({ attributes, setAttributes, isSelected }) {
	const { width, justification, className } = attributes;
	const { currentTheme } = useSelect((select) => {
		return {
			currentTheme: select('core').getCurrentTheme().stylesheet,
		};
	});

	const blockProps = useBlockProps({
		className: classNames(className, {
			'items-justified-left': 'left' === justification,
			'items-justified-center': 'center' === justification,
			'items-justified-right': 'right' === justification,
		}),
	});

	return (
		<Fragment>
			<JustificationControl {...{ attributes, setAttributes }} />
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
						console.log(
							'delta',
							width,
							delta,
							parseInt(width + delta.width, 10)
						);
						setAttributes({
							width: parseInt(width + delta.width, 10),
						});
					}}
				>
					<div className="wp-block-prc-block-logo__inner">
						<div className="wp-block-prc-block-logo__inner__logo">
							{'decoded' === currentTheme && (
								<img src={decodedSVGUrl} alt="Decoded" />
							)}
							{'decoded' !== currentTheme && <Logo />}
						</div>
						<div className="wp-block-prc-block-logo__inner__logo-alt">
							{'decoded' === currentTheme && (
								<img src={decodedSVGUrl} alt="Decoded" />
							)}
							{'decoded' !== currentTheme && <LogoAlt />}
						</div>
					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
}
