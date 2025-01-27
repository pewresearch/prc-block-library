import {
	BaseControl,
	Button,
	SearchControl,
	SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { IconLibraryIndex, Icon } from '@prc/icons';
import styled from '@emotion/styled';
import { insert, insertObject } from '@wordpress/rich-text';

const StyledIconGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 48px);
	grid-gap: 6px;
`;

const IconGrid = ({ icons, selectedIcon, onChange }) => {
	return (
		<StyledIconGrid className="icon-grid">
			{icons.map((icon) => (
				<button
					type="button"
					key={icon}
					// className={`icon-grid__icon ${
					// 	selectedIcon === icon ? 'is-selected' : ''
					// }`}
					// onClick={() => onChange(icon.name)}
				>
					{icon
						.replace(/-/g, ' ')
						.replace(/\b\w/g, (l) => l.toUpperCase())}
				</button>
			))}
		</StyledIconGrid>
	);
};

const IconPicker = (props) => {
	const { value, name, onChange, label = '', ...rest } = props;

	const instanceId = useInstanceId(IconPicker);
	const id = `icon-picker-${instanceId}`;
	const { brands, solid } = IconLibraryIndex;
	const [library, setLibrary] = useState('solid');
	const [icon, setIcon] = useState(value);
	return (
		<BaseControl
			label={label}
			id={id}
			className="component-icon-picker"
			{...rest}
		>
			<SelectControl
				label="Icon Library"
				value={library}
				options={[
					{
						label: 'Solid',
						value: 'solid',
					},
					{
						label: 'Regular',
						value: 'regular',
					},
					{
						label: 'Light',
						value: 'light',
					},
					{
						label: 'Duotone',
						value: 'duotone',
					},
					{
						label: 'Brands',
						value: 'brands',
					},
				]}
				onChange={(lib) => {
					console.log(lib);
					setLibrary(lib);
				}}
			/>
			{library === 'brands' ? (
				<SelectControl
					label="Icon"
					value={icon}
					options={brands.map((i) => ({
						label: i
							.replace(/-/g, ' ')
							.replace(/\b\w/g, (l) => l.toUpperCase()),
						value: i,
					}))}
					onChange={(i) => setIcon(i)}
				/>
			) : (
				<SelectControl
					label="Icon"
					value={icon}
					options={solid.map((i) => ({
						label: i
							.replace(/-/g, ' ')
							.replace(/\b\w/g, (l) => l.toUpperCase()),
						value: i,
					}))}
					onChange={(i) => {
						setIcon(i);
						value.name = i;
						value.library = library;
					}}
				/>
			)}
			<Button
				onClick={() => {
					console.log({ props });
					onChange(
						// insertObject(value, {
						// 	type: 'core/image',
						// 	attributes: {
						// 		className: `wp-image-fasfasf`,
						// 		style: `width: ${Math.min(100, 150)}px;`,
						// 		url: 'https://via.placeholder.com/150',
						// 		alt: 'Image alt text',
						// 	},
						// })
						insertObject(value, {
							type: 'prc-block/icon',
							attributes: {
								name: icon,
								library,
								size: 1,
							},
						})
					);
				}}
			>
				Insert Icon
			</Button>
		</BaseControl>
	);
};

export default IconPicker;
