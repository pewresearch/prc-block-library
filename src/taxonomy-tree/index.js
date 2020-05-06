import './style.scss';

import { registerBlockType } from '@wordpress/blocks';
import settings from './settings';

import './blocks/tree-list'; // Import child block

registerBlockType(...settings);
