/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { Popover } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import { StyledSlug } from './common';

export default function Palette({
	className,
    colorSlug,
	disallowCopy = false
}) {
	
    const [hex, setHex] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        apiFetch({
			path: `prc-api/v3/utils/get-theme-color?color=${colorSlug}`,
			method: 'GET'
		})
        .then(data => setHex(data.color))
        .catch(error => console.log('ERROR:', error));
    }, [colorSlug])

    function handleClick() {
		if ( false === disallowCopy ) {
			navigator.clipboard.writeText(hex);
			setClicked(true);
			setTimeout(() => {
				setClicked(false);
			}
			, 2000)
		}
    }
	
	return (
		<div className={className} onClick={handleClick} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
             <span className='color-text'>
                {hex && !clicked && hex.toUpperCase()}
                {hex && clicked && '\u2713 Copied!'}
                {!hex && 'Loading...'}
             </span>
            {visible && <Popover placement='right' noArrow={false}><StyledSlug>{colorSlug}</StyledSlug></Popover>}
            </div>
	);
}
