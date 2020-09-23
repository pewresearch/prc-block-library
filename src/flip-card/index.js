import { registerBlockType } from '@wordpress/blocks';

import parentSettings from './settings';
import frontSettings from './front/settings';
import backSettings from './back/settings';

registerBlockType(...parentSettings);
registerBlockType(...frontSettings);
registerBlockType(...backSettings);
