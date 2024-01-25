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
			return icons.faTable;
		case 'link':
			return icons.faLink;
		case 'presentation':
			return icons.faPresentationScreen;
		case 'pressRelease':
			return icons.faFile;
		case 'promo':
			return icons.faFile;
		case 'qA':
			return icons.faFile;
		case 'questionnaire':
			return icons.faClipboard;
		case 'report':
			return icons.faFile;
		case 'supplemental':
			return icons.faFile;
		case 'topline':
			return icons.faClipboard;
		default:
			return icons.faFile;
	}
}
