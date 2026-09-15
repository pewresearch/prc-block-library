/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { Icon as WPIcon, sidebar } from '@wordpress/icons';

export default function () {
	return <WPIcon icon={sidebar} />;
}

export function panelUp() {
	return <Icon library="prc" icon="arrow-up-short-wide" size="1" />;
}

export function panelDown() {
	return <Icon library="prc" icon="arrow-down-short-wide" size="1" />;
}
export function newPanel() {
	return <Icon library="prc" icon="circle-plus" size="1" />;
}
export function deletePanel() {
	return <Icon icon="trash-can" size="1" />;
}
