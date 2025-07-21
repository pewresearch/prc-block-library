<?php
/**
 * Form Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Form Send Email.
 *
 * @package PRC\Platform\Blocks
 */
class Form_Send_Email {

	/**
	 * Constructor.
	 *
	 * @param \PRC\Platform\Blocks\Loader $loader The loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the class.
	 *
	 * @param \PRC\Platform\Blocks\Loader $loader The loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_filter( 'prc_api_endpoints', $this, 'register_rest_endpoints' );
		}
	}

	/**
	 * Register REST endpoints.
	 *
	 * @hook prc_api_endpoints
	 *
	 * @param array $endpoints The endpoints.
	 * @return array
	 */
	public function register_rest_endpoints( $endpoints ) {
		$send_email = array(
			'route'               => 'form/send-to-email',
			'methods'             => 'POST',
			'callback'            => array( $this, 'handle_email_submission' ),
			'args'                => array(
				'nonce' => array(
					'validate_callback' => function ( $param, $request, $key ) {
						return is_string( $param );
					},
				),
			),
			'permission_callback' => function () {
				return true;
			},
		);
		return array_merge( $endpoints, array( $send_email ) );
	}

	/**
	 * Handle the email submission.
	 *
	 * This is our first standardized "rest" action for prc-block/form.
	 * It should follow a common pattern.
	 * All responses will include the formName, formId, and formFields.
	 * The formFields will be an array of objects with the following properties:
	 * - id: string
	 * - name: string
	 * - type: string
	 * - value: string
	 * - required: boolean
	 * - checked: boolean | null
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function handle_email_submission( $request ) {
		$nonce = $request->get_param( 'nonce' );
		if ( ! wp_verify_nonce( $nonce, 'prc-block-form' ) ) {
			return new \WP_Error( 'invalid_nonce', 'Unauthorized access, NONCE invalid. ERROR CODE: 403', array( 'status' => 403 ) );
		}

		$form_data = $request->get_param( 'formData' );
		$form_data = json_decode( $form_data, true );

		$form_id   = $form_data['formId'];
		$form_name = $form_data['formName'];

		// Find the first field with type 'email' and use its value as the email address.
		$email_address = '';
		if ( isset( $form_data['fields'] ) && is_array( $form_data['fields'] ) ) {
			foreach ( $form_data['fields'] as $field ) {
				if ( isset( $field['type'] ) && 'email' === $field['type'] && ! empty( $field['value'] ) ) {
					$email_address = $field['value'];
					break;
				}
			}
		}

		$fields = $form_data['formFields'];

		$subject = 'New Form Submission from ' . $form_name;
		$message = '';
		foreach ( $fields as $field ) {
			$message .= $field['label'] . ': ' . $field['value'] . '<br>';
		}

		$headers   = array( 'Content-Type: text/html; charset=UTF-8' );
		$headers[] = 'From: ' . $email_address;
		$headers[] = 'Reply-To: ' . $email_address;
		$headers[] = 'Content-Type: text/html; charset=UTF-8';

		$sent = \wp_mail( $email_address, $subject, $message, $headers ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.wp_mail_wp_mail

		if ( $sent ) {
			return new \WP_REST_Response( array( 'message' => 'Form submission sent successfully' ), 200 );
		} else {
			return new \WP_Error( 'form_submission_failed', 'Form submission failed to send', array( 'status' => 500 ) );
		}
	}
}
