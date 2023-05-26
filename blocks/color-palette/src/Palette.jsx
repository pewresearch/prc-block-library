
/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useEffect, useState } from '@wordpress/element';

export default function Palette({
	className,
	id,
    colorSlug
}) {

    const [hex, setHex] = useState('');

    console.log('colorSlug', colorSlug);

    useEffect(() => {
        // make GET request to /wp-json/prc-api/v2/utils/get-theme-color, passing in the color slug
        fetch(`https://prc-local.vipdev.lndo.site/wp-json/prc-api/v2/utils/get-theme-color?color=${colorSlug}`)
            .then(response => response.json())
            .then(data => {
               setHex(data.color)
            }
        )

    }, [])

    // function that copies the hex value to the clipboard when element is clicked
    function copyToClipboard() {
        navigator.clipboard.writeText(hex);
    }
	
	return (
		<div className={className} onClick={copyToClipboard}>{hex}</div>
	);
}
