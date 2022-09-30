/**
 * WordPress Dependencies
 */
import { hydrate } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

function Test() {
	return (
		<form
			className="wp-block-prc-block-mailchimp-form"
			id="cdf2873de9a306cc7e2a9c07bdb177a4"
			data-segment-id=""
		>
			<input
				// style="border-width:1px;padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--20);margin-right:var(--wp--preset--spacing--20)"
				className="has-border-color has-white-border-color wp-block-prc-block-form-input-field"
				placeholder="Enter email address..."
				type="email"
			/>
			<div className="wp-block-button">
				<a className="wp-block-button__link has-white-color has-mustard-background-color has-text-color has-background wp-element-button">
					Sign Up
				</a>
			</div>
		</form>
	);
}

domReady(() => {
	const forms = document.querySelectorAll('.wp-block-prc-block-mailchimp-form');
	forms.forEach((elm) => {
		hydrate(<Test />, elm);
	});
});
