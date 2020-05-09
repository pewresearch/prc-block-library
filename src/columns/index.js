import { registerBlockType } from '@wordpress/blocks';
import settings from './settings';

import './blocks/';

registerBlockType(...settings);
