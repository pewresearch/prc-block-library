/**
 * WordPress Dependencies
 */
import { store, withScope, withSyncEvent, getElement, getContext } from '@wordpress/interactivity';

const { state, actions } = store( 'prc-block/form-input-radio-group', {
	state: {
		get isInputChecked() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.checked;
		},
		get inputValue() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.value;
		},
		get inputName() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.name;
		},
	},
	actions: {
		onInputCheckboxClick: withSyncEvent( ( event ) => {
			const context = getContext();
			const { targetNamespace, id: blockId, fields } = context;
			if ( !targetNamespace || !blockId ) {
				console.warn('No targetNamespace or blockId found in context, cannot process click event', context);
				return;
			}

			const { ref, attributes } = getElement();
			const input = ref.querySelector('input');
			if ( !input ) {
				console.warn('No input found in ref, cannot process click event', ref);
				return;
			}
			const id = input.getAttribute('id');
			const name = input.getAttribute('name');
			const value = input.value;
			if ( !id || !name || !value ) {
				console.warn('No ID, name, or value found in attributes, cannot process click event for radio group.', attributes);
				return;
			}

			// Find all radio fields with the same name
			const formFields = state.formFields || [];
			const updatedFields = formFields.map( field => {
				if ( !fields.includes( field.id ) ) {
					return field; // Not part of this radio group, leave unchanged
				}
				if ( field.id === id ) {
					context.value = value; // Update context value for hoisting
					return {
						...field,
						checked: true,
					};
				}
				return {
					...field,
					checked: false,
				};
			} );

			// Update state with new checked values
			state.formFields = updatedFields;
		} ),
	},
	callbacks: {
		*onValueChange() {
			const context = getContext();
			const { targetNamespace, id: blockId, value } = context;
			if ( !targetNamespace || !blockId ) {
				console.warn('No targetNamespace or blockId found in context, cannot process value change', context);
				return;
			}

			const targetStore = yield store( targetNamespace );
			const existingStoreState = targetStore.state;
			if ( !existingStoreState || !Array.isArray( existingStoreState.formFields ) ) {
				console.warn('Target store state is invalid or formFields is not an array', existingStoreState);
				return;
			}

			// Update the item in formFields that has an id matching blockId, setting its value to the hoisted value
			const updatedParentFields = existingStoreState.formFields.map( ( field ) => {
				if ( field && field.id === blockId ) {
					return {
						...field,
						value,
					};
				}
				return field;
			} );
			const snapshot = existingStoreState;

			existingStoreState.formFields = updatedParentFields;
		},
	},
} );
