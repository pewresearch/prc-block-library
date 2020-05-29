import './style.scss';
import { registerBlockType } from '@wordpress/blocks';
import settings from './settings';

registerBlockType(...settings);
