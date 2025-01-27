/**
 * WordPress Dependencies
 */
import { useEffect, useMemo } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { ReactComponent as Logo } from './assets/primary.svg';
import { ReactComponent as LogoWhite } from './assets/primary-white.svg';
import { ReactComponent as LogoAlt } from './assets/alternate.svg';
import { ReactComponent as LogoAltWhite } from './assets/alternate-white.svg';
import { ReactComponent as DecodedLogo } from './assets/decoded.svg';
import { ReactComponent as DecodedLogoWhite } from './assets/decoded-white.svg';

export default function LogoInner({ onLoad, className, width }) {
	// we can know exactly which svg based on the classname is-style-x format.
	// from that we can also extract the height and width from the viewBox attribute
	// and use that to set the "natural" size of the image.

	// memoize the svgLoad function
	const memoizedSvgLoad = useMemo(() => {
		// check that onLoad is a function and that className is a string...
		if (typeof onLoad !== 'function') {
			return;
		}
		return (svg) => {
			const svgEl = svg();
			const [w, h] = svgEl.props.viewBox.split(' ').slice(2);
			onLoad(w, h);
		};
	}, [onLoad]);

	useEffect(() => {
		const selectedStyle = className.match(/is-style-([a-z0-9-]+)/);

		switch (selectedStyle[1]) {
			case 'primary-only':
				memoizedSvgLoad(Logo);
				break;
			case 'alt-only':
				memoizedSvgLoad(LogoAlt);
				break;
			case 'decoded':
				memoizedSvgLoad(DecodedLogo);
				break;
			default:
				memoizedSvgLoad(Logo);
				break;
		}
	}, [className, memoizedSvgLoad]);

	return (
		<div
			className="wp-block-prc-block-logo__inner"
			style={{ maxWidth: `${width}px` }}
		>
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
				<DecodedLogoWhite data-browser-theme="dark" />
			</div>
		</div>
	);
}
