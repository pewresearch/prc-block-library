import { registerBlockType } from '@wordpress/blocks';
import settings from './settings';
import './style.scss';

// Register Standard Columns Block
registerBlockType(...settings);
