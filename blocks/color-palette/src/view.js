/**
 * WordPress Dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import Palette from './palette';


domReady(() => {

	const palettes = document.querySelectorAll(
		'.wp-block-prc-block-color-palette',
	);
	palettes.forEach((elm) => {
		// Gather the classes and styles from the palette element.
		const classes = elm.getAttribute('class');

        // Get the second class name from the list of classes.
        const [colorClass] = classes.split(' ').slice(1);

        // Get the color slug from the class name.
        const colorSlug = colorClass.slice(4, -17)
    
		render(
			<Palette 
            {...{
                className: classes,
                colorSlug,
            }}
            />,
			elm,
		);
	});
});