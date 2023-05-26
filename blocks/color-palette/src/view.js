/**
 * WordPress Dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import Palette from './Palette';


domReady(() => {

	const palettes = document.querySelectorAll(
		'.wp-block-prc-block-color-palette',
	);
	palettes.forEach((elm) => {
		// Gather the classes and styles from the palette element.
		const classes = elm.getAttribute('class');
		const id = elm.getAttribute('id');

        // Get the second class name from the list of classes.
        const [colorClass] = classes.split(' ').slice(1);

        console.log('color class from view',colorClass);

        // const color = 'has-global-spectrum-light-three-background-color'
        // // trim off has- and -color
        const colorSlug = colorClass.slice(4, -17)
        // Get the color slug from the class name.
        // const colorSlug = className.split('-').slice(-1)[0];

		// Render the Palette component.
		render(
			<Palette 
            {...{
                className: classes,
                colorSlug,
                id,
            }}
            />,
			elm,
		);
	});
});