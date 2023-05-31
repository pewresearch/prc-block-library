
/**
 * WordPress Dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { Popover } from '@wordpress/components';

export default function Palette({
	className,
	id,
    colorSlug
}) {

    const [hex, setHex] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetch(`${window.siteDomain}/devdocs/wp-json/prc-api/v2/utils/get-theme-color?color=${colorSlug}`)
        .then(response => {
            if (!response.ok) {
              throw new Error('Something went wrong, try refreshing the page.');
            }
            return response.json();
          })
            .then(data => {
               setHex(data.color)
            }
        )
        .catch(error => {
            console.log('ERROR:', error);
          });
       

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
		<div className={className} onClick={handleClick} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
             <p className='color-text'>
                {hex && !clicked && hex.toUpperCase()}
                {hex && clicked && '\u2713 Copied!'}
                {!hex && 'Loading...'}
             </p>
            {visible && <Popover placement='right' >{colorSlug}</Popover>}
  
           
            </div>
	);
}
