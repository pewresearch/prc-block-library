/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

import { FormResponse } from './form-response';
import { FormField } from './interfaces';

/**
 * LocalStorage utilities for form persistence
 */
const FormPersistence = {
	STORAGE_KEY_PREFIX: 'prc_form_data_',
	EXPIRY_HOURS: 24, // Data expires after 24 hours

	/**
	 * Generate a storage key for a specific form
	 */
	getStorageKey(formId) {
		return `${this.STORAGE_KEY_PREFIX}${formId}`;
	},

	/**
	 * Save form data to localStorage
	 */
	saveFormData(formId, formFields) {
		try {
			// Only save fields that have values and aren't sensitive
			const dataToSave = {
				timestamp: Date.now(),
				fields: formFields
					.filter((field) => {
						// Don't save password fields or hidden fields for security
						const sensitiveTypes = ['password', 'hidden'];
						return (
							field.value && !sensitiveTypes.includes(field.type)
						);
					})
					.map((field) => ({
						id: field.id,
						name: field.name,
						value: field.value,
						checked: field?.checked || null,
					})),
			};

			localStorage.setItem(
				this.getStorageKey(formId),
				JSON.stringify(dataToSave)
			);
		} catch (error) {
			console.warn('Failed to save form data to localStorage:', error);
		}
	},

	/**
	 * Load form data from localStorage
	 */
	loadFormData(formId) {
		try {
			const stored = localStorage.getItem(this.getStorageKey(formId));
			if (!stored) return null;

			const data = JSON.parse(stored);

			// Check if data has expired
			const now = Date.now();
			const expiryTime =
				data.timestamp + this.EXPIRY_HOURS * 60 * 60 * 1000;

			if (now > expiryTime) {
				this.clearFormData(formId);
				return null;
			}

			return data.fields;
		} catch (error) {
			console.warn('Failed to load form data from localStorage:', error);
			return null;
		}
	},

	/**
	 * Clear form data from localStorage
	 */
	clearFormData(formId) {
		try {
			localStorage.removeItem(this.getStorageKey(formId));
		} catch (error) {
			console.warn('Failed to clear form data from localStorage:', error);
		}
	},

	/**
	 * Clear all expired form data
	 */
	clearExpiredData() {
		try {
			const now = Date.now();
			const keysToRemove = [];

			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key && key.startsWith(this.STORAGE_KEY_PREFIX)) {
					try {
						const data = JSON.parse(localStorage.getItem(key));
						const expiryTime =
							data.timestamp + this.EXPIRY_HOURS * 60 * 60 * 1000;

						if (now > expiryTime) {
							keysToRemove.push(key);
						}
					} catch (e) {
						// Invalid data format, remove it
						keysToRemove.push(key);
					}
				}
			}

			keysToRemove.forEach((key) => localStorage.removeItem(key));
		} catch (error) {
			console.warn('Failed to clear expired form data:', error);
		}
	},
};

const collectFormFields = (ref) => {
	// find all the input elements in the ref that have a class name that contains at least 'wp-block-prc-block-form-input-*' with a wildcard at the end
	const inputElements = ref.querySelectorAll(
		'input, select, textarea, .wp-block-prc-block-form-input-password'
	);
	// Find all that have a name attribute and return an array of objects with the name, the value, and the ref
	const formFields = [];
	inputElements.forEach((input) => {
		if (input.type === 'password') {
			return;
		}
		if (input.id) {
			formFields.push(input.id);
		}
	});
	return formFields;
};

const { state, actions } = store('prc-block/form', {
	state: {
		success: false,
		error: false,
		processing: false,
		get submissionDisabled() {
			const context = getContext();
			return !context.allowSubmit;
		},
		get fieldsForSubmission() {
			const context = getContext();
			const { formFields } = context;
			const allFormFields = state.formFields;
			// Find the formFields in allFormFields that are in formFields
			const formFieldsToSubmit = allFormFields.filter((field) =>
				formFields.includes(field.id)
			);
			// Add the captchaToken as a pseudo-field.
			formFieldsToSubmit.push({
				id: 'captchaToken',
				type: 'captchaToken',
				value: context.captchaToken,
				required: false,
				name: 'captchaToken',
			});

			return formFieldsToSubmit;
		},
		get inputType() {
			const context = getContext();
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.type;
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
		get inputPlaceholder() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.placeholder;
		},
		get isInputHidden() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.hidden;
		},
		get isInputDisabled() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.disabled;
		},
		get isInputReadOnly() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.readOnly;
		},
		get isInputRequired() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.required;
		},
		get isInputChecked() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.checked;
		},
		get isInputError() {
			// Check if this field has an error state.
			const { formFields } = state;
			const { attributes } = getElement();
			const { id } = attributes;
			return (
				formFields.find((field) => field.id === id)?.error ||
				state.error
			);
		},
		get isInputSuccess() {
			return state.success;
		},
		get isInputProcessing() {
			return state.processing;
		},
		get hasErrors() {
			const context = getContext();
			return context.errors.length > 0;
		},
		get formMessage() {
			const context = getContext();
			return context?.formMessage || false;
		},
	},
	actions: {
		/**
		 * Update the state of an input field.
		 * You can update properties like value, disabled, readonly, hidden, etc.
		 *
		 * @param {string} name - The name of the input field.
		 * @param {string} prop - The property to update.
		 * @param {any} value - The value to update the property to.
		 */
		updateInputStateProp: (id, prop, value) => {
			const { formFields } = state;
			const formField = formFields.find((field) => field.id === id);
			if (formField) {
				formField[prop] = value;
			}
			const { formId } = getContext();
			// console.log('updateInputStateProp', {
			// 	formId,
			// 	id,
			// 	prop,
			// 	value,
			// 	formFields,
			// 	state,
			// });
			state.formFields = formFields;
			FormPersistence.saveFormData(formId, formFields);
		},
		onLabelClick: withSyncEvent((event) => {
			// Find the adjacent input element and focus it.
			const input = event.target.nextElementSibling;
			if (
				input &&
				['INPUT', 'SELECT', 'TEXTAREA'].includes(input.tagName)
			) {
				input.focus();
			}
		}),
		/**
		 * Get the current state of a property of an input field by input name and property name.
		 *
		 * @param {string} id - The id of the input field.
		 * @param {string} prop - The property to get.
		 * @return {any} The value of the property.
		 */
		getInputStateProp: (id, prop) => {
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.[prop];
		},
		onInputChange: withSyncEvent((event) => {
			const { value, id } = event.target;
			actions.updateInputStateProp(id, 'value', value);
			// Clear error and timer on user input
			actions.updateInputStateProp(id, 'error', false);
		}),
		onInputCheckboxClick: withSyncEvent((event) => {
			const { checked, id } = event.target;
			actions.updateInputStateProp(id, 'checked', checked);
			// Clear error and timer on user input
			actions.updateInputStateProp(id, 'error', false);
		}),
		onInputFocus: withSyncEvent((event) => {
			const { id } = event.target;
			// Clear error and timer on focus
			actions.updateInputStateProp(id, 'error', false);
		}),
		onInputBlur: withSyncEvent((event) => {
			// console.log('onInputBlur', event);
		}),
		onInputMouseEnter: withSyncEvent((event) => {
			// console.log('onInputMouseEnter', event);
		}),
		onInputMouseLeave: withSyncEvent((event) => {
			// console.log('onInputMouseLeave', event);
		}),
		checkForRequiredFieldsWithoutValues: () => {
			const context = getContext();
			const { fieldsForSubmission } = state;
			// Check if any of the formFieldsToSubmit are required and if they don't have a value, then set the error on their state to be true.
			let stopProcessing = false;
			fieldsForSubmission.forEach((field) => {
				if (
					field.required &&
					(field.type === 'checkbox' || field.type === 'radio'
						? !field.checked
						: !field.value)
				) {
					actions.updateInputStateProp(field.id, 'error', true);
					stopProcessing = true;
				} else {
					actions.updateInputStateProp(field.id, 'error', false);
				}
			});
			context.stopProcessing = stopProcessing;
		},
		/**
		 * This function runs when a form is submitted.
		 * It will check for required fields that are missing values,
		 * set the submission processing to true,
		 * show the captcha,
		 * and then hand off to the Captcha block to allow the submission to continue.
		 * Below, you'll find the sendSubmission callback that watches for the captchaPassed state change and then continues with the form specific submission logic.
		 */
		onSubmit: withSyncEvent(async (event) => {
			event.preventDefault();
			const context = getContext();

			// First, we do form validation.
			actions.checkForRequiredFieldsWithoutValues();

			if (context.stopProcessing) {
				return;
			}

			// Then, we set the submission processing to null, this is just to signal that the processing is about to begin but it's not started yet.
			context.submissionProcessing = null;

			// Next, we show the captcha.
			context.captchaHidden = false;

			// Hand off to the Captcha block for the next submission logic.
			// @see ../form-captcha/view.js
		}),
		/**
		 * Resets the form submission process to initial state.
		 * This allows the user to submit the form again.
		 */
		onReset: () => {
			const context = getContext();
			context.submissionProcessing = false;
			context.captchaHidden = true;
			context.submitButtonText = 'Submit';
			context.stopProcessing = false;
			context.allowSubmit = true;
			context.errors = [];
			FormPersistence.clearFormData(context.formId);
		},
		/**
		 * Dismissing an error message resets the form submission process to initial state.
		 */
		onErrorClick: withSyncEvent((event) => {
			event.preventDefault();
			const { actionUrl } = event.target.dataset;
			if (actionUrl) {
				window.location.href = actionUrl;
			}
			actions.onReset();
		}),
	},
	callbacks: {
		onFormMount: () => {
			const { ref, attributes } = getElement();
			let { id } = attributes;
			if (!id) {
				id = `prc-block-form-${Math.random().toString(36).substring(2, 15)}`;
			}
			const formFields = collectFormFields(ref);
			const context = getContext();
			context.formId = id;
			context.formFields = formFields;
			// Clear any expired form data from localStorage
			FormPersistence.clearExpiredData();
			// Load saved form data if it exists
			const savedFormFields = FormPersistence.loadFormData(id);
			if (savedFormFields) {
				// go through state.formFields and find the ones that are in savedFormFields and update the state with the saved values
				state.formFields = state.formFields.map((field) => {
					// If the field id is in savedFormFields then update the value with the saved value
					const savedField = savedFormFields.find(
						(savedField) => savedField.id === field.id
					);
					if (savedField) {
						field.value = savedField?.value;
						field.checked = savedField?.checked;
					}
					return field;
				});
			}
		},
		onCaptchaPassing: () => {
			const context = getContext();
			if (context.captchaPassed) {
				context.captchaHidden = true;
			}
		},
		onProcessing: () => {
			const context = getContext();
			if (context.submissionProcessing) {
				context.submitButtonText = 'Processing...';
			} else {
				context.submitButtonText = 'Submit';
			}
		},
		sendSubmission: async () => {
			const context = getContext();
			const {
				captchaPassed,
				captchaToken,
				nonceName,
				nonceToken,
				submissionProcessing,
				stopProcessing,
				submitMethod,
				formId,
				redirectUrl,
			} = context;
			if (
				!captchaPassed ||
				stopProcessing ||
				false === submissionProcessing
			) {
				return;
			}
			// Now that we're on to actually submitting the form, we can hide the captcha.
			context.captchaHidden = true;

			context.submissionProcessing = true;

			const { method, action, namespace } = submitMethod;
			const { fieldsForSubmission } = state;

			// Add the nonce to the fieldsForSubmission array as we're ready to submit.
			const fieldsForSubmissionWithCaptcha = [
				...fieldsForSubmission,
				{
					id: 'nonce',
					name: nonceName,
					type: 'nonceToken',
					value: nonceToken,
				},
			];
			// console.log(
			// 	'onSubmit',
			// 	context,
			// 	state,
			// 	fieldsForSubmission,
			// 	fieldsForSubmissionWithCaptcha
			// );
			if (method === 'server') {
				// TODO: Implement server side submission.
				// console.log('onSubmit (SERVER)', context);
			} else if (method === 'rest') {
				// TODO: Implement REST submission.
				// console.log('onSubmit (REST)', context);
			} else if ('api' === method && 'sendToEmail' === action) {
				// TODO: Implement Send To Email.
				console.log(
					'onSubmit (API)',
					'Send To Email is still being worked on. \nWhen finished this will allow editors to easily create forms that submit the contents/fields to an email address of their choosing.\nCoupled with the new PCT IT "create group email in MS Teams" feature this will allow for a more streamlined process for creating forms that submit to an email address.'
				);
			} else if (method === 'api') {
				const _store = store(namespace);
				// console.log('onSubmit (iAPI)', context, state, _store);
				// Run the requested action and wait for it to complete.
				if (!!_store?.actions[action]) {
					try {
						const result = await _store.actions[action](
							fieldsForSubmissionWithCaptcha
						);
						const formResponse = new FormResponse(result);
						// console.log('onSubmit = ', result, formResponse);
						if (formResponse.isSuccess) {
							// Clear the form data from localStorage.
							FormPersistence.clearFormData(formId);

							state.success = true;

							// If there's a redirectUrl, then redirect to it.
							// Otherwise, show the form message.
							if (redirectUrl) {
								window.location.href = redirectUrl;
							} else {
								context.formMessage =
									formResponse?.message ||
									'Form submitted successfully.';
							}
							// If the form response has an actionUrl, wait 1 second and then redirect to it.
							if (formResponse.actionUrl) {
								setTimeout(() => {
									window.location.href =
										formResponse.actionUrl;
								}, 1000);
							}
						} else {
							state.error = true;
							context.errors.push({
								id: `error-${Math.random().toString(36).substring(2, 15)}`,
								message:
									formResponse?.message ||
									'An error occurred.',
								actionUrl: formResponse?.actionUrl || null,
							});
						}
					} catch (error) {
						console.error('onSubmit error', error);
						state.error = true;
						context.errors.push({
							id: `error-${Math.random().toString(36).substring(2, 15)}`,
							message: error?.message || 'An error occurred.',
							actionUrl: error?.actionUrl || null,
						});
					} finally {
						context.submissionProcessing = false;
					}
				}
			}
			FormPersistence.clearFormData(formId);
		},
	},
});
