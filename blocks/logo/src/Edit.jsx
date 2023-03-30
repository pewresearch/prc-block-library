/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as LogoAlt } from '../assets/logo-alt.svg';
import { ReactComponent as LogoDecoded } from '../assets/decoded.svg';

export default function Edit({ attributes, setAttributes }) {
	const { currentTheme } = useSelect((select) => {
		return {
			currentTheme: select('core').getCurrentTheme().stylesheet,
		};
	});

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<div className="wp-block-prc-block-logo__inner">
				<div className="wp-block-prc-block-logo__inner__logo">
					{currentTheme === 'decoded' ? <LogoDecoded /> : <Logo />}
				</div>
				<div className="wp-block-prc-block-logo__inner__logo-alt">
					{currentTheme === 'decoded' ? <LogoDecoded /> : <LogoAlt />}
				</div>
			</div>
		</div>
	);
}
