import { SVG, Path } from '@wordpress/components';

export default function Icon() {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			width={21}
			preserveAspectRatio="xMidYMid meet"
		>
			<Path d="M203.3 331.3C197.1 337.6 186.9 337.6 180.7 331.3L116.7 267.3C110.4 261.1 110.4 250.9 116.7 244.7C122.9 238.4 133.1 238.4 139.3 244.7L192 297.4L308.7 180.7C314.9 174.4 325.1 174.4 331.3 180.7C337.6 186.9 337.6 197.1 331.3 203.3L203.3 331.3zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM32 96V416C32 433.7 46.33 448 64 448H384C401.7 448 416 433.7 416 416V96C416 78.33 401.7 64 384 64H64C46.33 64 32 78.33 32 96z" />
		</SVG>
	);
}
