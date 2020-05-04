import { registerBlockType } from '@wordpress/blocks';
import settings from './settings';

import './style.scss';

registerBlockType(...settings);
