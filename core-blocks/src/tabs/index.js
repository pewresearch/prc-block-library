/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import edit from './edit';
import save from './save';
import icon from './icon';
import deprecated from './deprecated';

import metadata from './block.json';

import './style.scss';
import './editor.scss';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	edit,
	save,
	deprecated,
};

initBlock({ name, metadata, settings });
