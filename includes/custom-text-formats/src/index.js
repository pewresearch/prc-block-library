/**
 * WordPress dependencies
 */

import { registerFormatType } from '@wordpress/rich-text';
import formats from './formats';

formats.forEach(({ name, ...settings }) => registerFormatType(name, settings));
