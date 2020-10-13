import { registerBlockType } from '@wordpress/blocks';
import settings from './settings';

/** registerBlockType takes in two parameters
 * i.e name and settings
 */

registerBlockType(...settings);
