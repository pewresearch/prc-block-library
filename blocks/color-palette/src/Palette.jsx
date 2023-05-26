
/**
 * WordPress Dependencies
 */
import { useEffect, useState } from '@wordpress/element';

export default function Palette({
	className,
	id,
    colorSlug
}) {

    const [hex, setHex] = useState(null);
    const [clicked, setClicked] = useState(false);

    console.log('colorSlug', colorSlug);

    useEffect(() => {
        // make GET request to /wp-json/prc-api/v2/utils/get-theme-color, passing in the color slug
        fetch(`https://prc-local.vipdev.lndo.site/devdocs/wp-json/prc-api/v2/utils/get-theme-color?color=${colorSlug}`)
            .then(response => response.json())
            .then(data => {
               setHex(data.color)
            }
        )

    }, [])

    function handleClick() {
        navigator.clipboard.writeText(hex);
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }
        , 2000)
    }
	
	return (
		<div className={className} onClick={handleClick}>
             <p className='color-text'>
                {hex && !clicked && hex.toUpperCase()}
                {hex && clicked && 'Copied!'}
                {!hex && 'Loading...'}

             </p>
       
  
           
            </div>
	);
}
