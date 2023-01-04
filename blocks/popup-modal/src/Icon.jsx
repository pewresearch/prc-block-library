import { SVG, Path } from '@wordpress/components';

// Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License
// https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.

export default function Icon() {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			preserveAspectRatio="xMidYMid meet"
			height={20}
		>
			<Path d="M432 48H208C190.3 48 176 62.33 176 80V96H128V80C128 35.82 163.8 0 208 0H432C476.2 0 512 35.82 512 80V304C512 348.2 476.2 384 432 384H416V336H432C449.7 336 464 321.7 464 304V80C464 62.33 449.7 48 432 48zM320 128C355.3 128 384 156.7 384 192V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H320zM64 464H320C328.8 464 336 456.8 336 448V256H48V448C48 456.8 55.16 464 64 464z" />
		</SVG>
	);
}
