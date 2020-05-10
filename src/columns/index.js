import { registerBlockType } from '@wordpress/blocks';
import standardSettings from './settings/standard';
import ledeSettings from './settings/lede';

import './blocks/';

// Register Standard Columns Block
registerBlockType(...standardSettings);
// Register "Child" Lede Columns Block
registerBlockType(...ledeSettings);
