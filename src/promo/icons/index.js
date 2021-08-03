/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import {Icon, IconToolbar} from './icon-picker';

import AlexaSVG from './alexa.svg';
import GlobalSVG from './global.svg';
import InternetSVG from './internet.svg';
import PoliticSVG from './politics.svg';
import ReligionSVG from './religion.svg';
import WeeklySVG from './weekly.svg';

const ICONS = [
    { label: 'No Icon', value: '', svg: null, width: '47px', height: '40px', emoji: '⛔️' },
    { label: 'Alexa', value: 'alexa', svg: AlexaSVG, width: '106px', height: '40px', emoji: '🔉' },
    { label: 'Global', value: 'global', svg: GlobalSVG, width: '47px', height: '40px', emoji: '✉️' },
    { label: 'Internet', value: 'internet', svg: InternetSVG, width: '47px', height: '40px', emoji: '✉️' },
    { label: 'Politics', value: 'politics', svg: PoliticSVG, width: '47px', height: '40px', emoji: '✉️' },
    { label: 'Religion', value: 'religion', svg: ReligionSVG, width: '47px', height: '40px', emoji: '✉️' },
    { label: 'Weekly', value: 'weekly', svg: WeeklySVG, width: '47px', height: '40px', emoji: '✉️' },
];

const IconWrapper = ({ icon, setAttributes, className }) => {
    return (
        <Fragment>
                <IconToolbar
                    value={icon}
                    icons={ICONS}
                    setAttributes={setAttributes}
                />
                <Icon 
                    value={ icon }
                    icons={ICONS}
                    className={className}
                />
        </Fragment>
    );
};

export default IconWrapper;
