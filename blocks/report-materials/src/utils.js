/**
 * External Dependencies
 */
import { icons } from '@prc/icons';

export function getItemLabel(item) {
	if (item.hasOwnProperty('label') && item.label !== '') {
		return item.label;
	}
	switch (item.type) {
		case 'detailedTable':
			return 'Data Table';
		case 'link':
			return 'Link';
		case 'presentation':
			return 'Presentation';
		case 'pressRelease':
			return 'Press Release';
		case 'promo':
			return 'Promo';
		case 'qA':
			return 'Q & A';
		case 'questionnaire':
			return 'Questionnaire';
		case 'report':
			return 'Report PDF';
		case 'supplemental':
			return 'Supplemental';
		case 'topline':
			return 'Topline';
		default:
			return 'Unknown';
	}
}

export function getItemIcon(type) {
	switch (type) {
		case 'detailedTable':
			return 'table';
		case 'link':
			return 'link';
		case 'presentation':
			return 'presentation-screen';
		case 'pressRelease':
			return 'file';
		case 'promo':
			return 'file';
		case 'qA':
			return 'file';
		case 'questionnaire':
			return 'clipboard';
		case 'report':
			return 'file';
		case 'supplemental':
			return 'file';
		case 'topline':
			return 'clipboard';
		default:
			return 'file';
	}
}
