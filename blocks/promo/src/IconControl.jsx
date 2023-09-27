/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, RawHTML, useEffect, useState } from '@wordpress/element';
import { ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import alexaUrl from '../assets/alexa.svg';
import globalUrl from '../assets/global.svg';
import internetUrl from '../assets/internet.svg';
import journalismUrl from '../assets/journalism.svg';
import politicsUrl from '../assets/politics.svg';
import religionUrl from '../assets/religion.svg';
import weeklyUrl from '../assets/weekly.svg';

const ICONS = [
	{
		label: 'No Icon',
		value: '',
		svg: null,
		width: '47px',
		height: '40px',
		emoji: '⛔️',
	},
	{
		label: 'Alexa',
		value: 'alexa',
		svg: alexaUrl,
		width: '106px',
		height: '40px',
		emoji: '🔉',
	},
	{
		label: 'Global',
		value: 'global',
		svg: globalUrl,
		width: '47px',
		height: '40px',
		emoji: '✉️',
	},
	{
		label: 'Internet',
		value: 'internet',
		svg: internetUrl,
		width: '47px',
		height: '40px',
		emoji: '✉️',
	},
	{
		label: 'Journalism',
		value: 'journalism',
		svg: journalismUrl,
		width: '47px',
		height: '40px',
		emoji: '✉️',
	},
	{
		label: 'Politics',
		value: 'politics',
		svg: politicsUrl,
		width: '47px',
		height: '40px',
		emoji: '✉️',
	},
	{
		label: 'Religion',
		value: 'religion',
		svg: religionUrl,
		width: '47px',
		height: '40px',
		emoji: '✉️',
	},
	{
		label: 'Weekly',
		value: 'weekly',
		svg: weeklyUrl,
		width: '47px',
		height: '40px',
		emoji: '✉️',
	},
];

function Icon({ value, icons, className }) {
	const selected = icons.filter((icon) => icon.value === value);

	// If selected does not have an svg value, return a fragment.
	if (!selected.length || !selected[0].svg) {
		return <Fragment />;
	}
	return (
		<div className={className}>
			<img
				src={selected[0].svg}
				alt={__(`Icon for ${value}`, 'prc-block-promo')}
			/>
		</div>
	);
}

function IconToolbar({ value, icons, setAttributes }) {
	const [selected, setSelection] = useState(value);
	const [selectedIcon, setSelectedIcon] = useState('⛔️');

	// Set variable called controls mapped of icons.
	const controls = icons.map((icon) => ({
		title: __(icon.label),
		icon: () => (
			<div style={{ paddingRight: '4px' }}>
				<RawHTML>{icon.emoji}</RawHTML>
			</div>
		),
		isActive: value === icon.value,
		onClick: () => setSelection(icon.value),
	}));

	useEffect(() => {
		const s = icons.filter((icon) => icon.value === selected);
		if (s.length && !!s[0].emoji) {
			setSelectedIcon(s[0].emoji);
		}
		setAttributes({
			icon: selected,
		});
	}, [selected]);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={() => <RawHTML>{selectedIcon}</RawHTML>}
					label="Select Icon"
					controls={controls}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function IconControl({ icon, setAttributes, className }) {
	return (
		<Fragment>
			<IconToolbar value={icon} icons={ICONS} setAttributes={setAttributes} />
			<Icon value={icon} icons={ICONS} className={className} />
		</Fragment>
	);
}
