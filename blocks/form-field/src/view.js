/**
* WordPress Dependencies
*/
import { store, getElement, getContext } from "@wordpress/interactivity";

store( 'prc-block/form-field', {
	actions: {
		// By default, clicking on the label will focus a text input.
		// If the type is a checkbox or radio then it will find the actual input element and toggle it's checked state.
		onLabelClick: () => {
			const { ref } = getElement();
			const inputElm = ref?.parentElement.querySelector('input');
			if (inputElm) {
				inputElm.focus();
			}
		}
	}
} );
