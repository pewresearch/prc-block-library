import { render } from '@wordpress/element';

import FollowUs from './component';

// When DOM is fully loaded load the filters
document.addEventListener("DOMContentLoaded", function(){
	if ( document.querySelector('.js-react-follow-us') ) {
		const elms = document.querySelectorAll('.js-react-follow-us');
		for ( let elm of elms ) {
			const socialMediaMarkup = elm.innerHTML;
			const props = {
				newsletters: elm.getAttribute('data-newsletters'),
				setAttributes: false,
			}
			render( 
				<FollowUs {...props}>{socialMediaMarkup}</FollowUs>,
				elm
			);	
		}
	}
});
