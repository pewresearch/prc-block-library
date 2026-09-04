/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

export default function () {
	return <Icon library="solid" icon="sidebar" />;

}

export function panelUp() {
	return <Icon library="solid" icon="arrow-up-small-big" size='1' />;
}

export function panelDown() {
	return <Icon library="solid" icon="arrow-down-small-big" size='1' />;
}
export function newPanel() {
	return <Icon library="classic" icon="square-dashed-circle-plus" size='1' />;
}
export function deletePanel() {
	return <Icon library="solid" icon="trash-can" size='1' />;
}