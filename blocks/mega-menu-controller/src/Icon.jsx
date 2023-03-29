/**
 * WordPress Dependencies
 */
import { SVG, Path } from '@wordpress/components';

export default function Icon() {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 576 512"
			width={20}
			preserveAspectRatio="xMidYMid meet"
		>
			<Path d="M32 64H480V176H32V64zM512 208V176 64 32H480 32 0V64 448v32H32 480h32V448 208zM32 208H480V448H32V208zm96 48H112v32h16H384h16V256H384 128zm0 96H112v32h16H384h16V352H384 128zM400 144l48-48H352l48 48z" />
		</SVG>
	);
}
