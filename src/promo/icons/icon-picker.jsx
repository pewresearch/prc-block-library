import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, RawHTML, useEffect, useState } from '@wordpress/element';
import { ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

const SAMPLE_ICONs_STRUCTURE = [
    { label: 'Newsletter', value: 'newsletter', svg: () => {
        return(
            <svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"/>
                <path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"/>
                <path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"/>
                <path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"/>
                <path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#BB7A2A"/>
                <path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"/>
                <path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"/>
                <path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"/>
                <path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"/>
                <path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"/>
            </svg>
        );
    }, width: '47px', height: '40px', emoji: '✉️' },
];

const Icon = ({ value, icons, className }) => {
    const selected = icons.filter(icon => icon.value === value);
    // If selected does not have an svg value, return a fragment.
    if (!selected.length || !selected[0].svg) {
        return <Fragment/>
    }
    return (
        <div className={className} style={{width: selected[0].width}}>
            <RawHTML>
                {selected[0].svg}
            </RawHTML>
        </div>
    );
};

const IconToolbar = ({value, icons, setAttributes}) => {
    const [selected, setSelection] = useState(value);
    const [selectedIcon, setSelectedIcon] = useState('⛔️');

    // Set variable called controls mapped of icons.
    const controls = icons.map(icon => {
        return {
            title: __(icon.label),
            icon: () => <div style={{paddingRight: '4px'}}><RawHTML>{icon.emoji}</RawHTML></div>,
            isActive: (value === icon.value),
            onClick: () => setSelection(icon.value),
        }
    });

    useEffect(() => {
        const s = icons.filter(icon => icon.value === selected);
        if (s.length && !!s[0].emoji) {
            setSelectedIcon(s[0].emoji);
        }
        setAttributes({
            icon: selected
        });
    }, [selected]);

    return(
        <BlockControls>
            <ToolbarGroup>
                <ToolbarDropdownMenu
                    icon={() => <RawHTML>{selectedIcon}</RawHTML>}
                    label="Select Icon"
                    controls={controls}
                />
            </ToolbarGroup>
        </BlockControls>
    );
}

export { Icon, IconToolbar };

export default Icon;