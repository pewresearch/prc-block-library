import { registerBlockType } from '@wordpress/blocks';
import standardSettings from './standard-settings';
import ledeSettings from './lede-settings';

import './blocks/';

// Register Standard Columns Block
registerBlockType(...standardSettings);
// Register "Child" Lede Columns Block
registerBlockType(...ledeSettings);
