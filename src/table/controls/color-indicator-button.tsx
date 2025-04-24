/**
 * External Dependencies
 */
import clsx from 'clsx';
import type { Property } from 'csstype';

/**
 * WordPress Dependencies
 */
import { Button, ColorIndicator } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

type Props = {
	label: string;
	value?: Property.Color;
	isNone: boolean;
	isTransparent: boolean;
	isMixed?: boolean;
	onClick: () => void;
};

export default function ColorIndicatorButton({
	label,
	value,
	isNone,
	isTransparent,
	isMixed = false,
	onClick,
}: Props) {
	return (
		<Button
			label={label}
			className={clsx('ftb-color-indicator-button', {
				'is-none': isNone,
				'is-mixed': isMixed,
				'is-transparent': isTransparent,
			})}
			onClick={onClick}
		>
			{isMixed ? (
				__('Mixed', 'flexible-table-block')
			) : (
				<ColorIndicator colorValue={value || ''} />
			)}
		</Button>
	);
}
