/**
 * WordPress Dependencies
 */
import { SVG, Path } from '@wordpress/components';

export default function Icon() {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			height={21}
			preserveAspectRatio="xMidYMid meet"
		>
			<Path d="M32 24c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H56C42.7 0 32 10.7 32 24zM48 160c-13.8 0-26.9 5.9-36 16.2S-1.3 200.3 .4 214l32 256c3 24 23.4 42 47.6 42H432c24.2 0 44.6-18 47.6-42l32-256c1.7-13.7-2.5-27.4-11.6-37.7s-22.2-16.2-36-16.2H48zM440 344c0 75.1-82.4 136-184 136S72 419.1 72 344s82.4-136 184-136s184 60.9 184 136zM256 376c17.7 0 32-10.7 32-24s-14.3-24-32-24s-32 10.7-32 24s14.3 24 32 24zM40 80c-13.3 0-24 10.7-24 24s10.7 24 24 24H472c13.3 0 24-10.7 24-24s-10.7-24-24-24H40z" />
		</SVG>
	);
}
