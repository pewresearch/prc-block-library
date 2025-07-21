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
	 * Define validation rules for each field type.
	 *
	 * @var array
	 */
	private const FIELD_VALIDATION_RULES = array(
		'email'          => array(
			'required'  => true,
			'validator' => 'validate_email',
		),
		'text'           => array(
			'required'  => false,
			'validator' => 'validate_text',
		),
		'textarea'       => array(
			'required'  => false,
			'validator' => 'validate_text',
		),
		'number'         => array(
			'required'  => false,
			'validator' => 'validate_number',
		),
		'tel'            => array(
			'required'  => false,
			'validator' => 'validate_tel',
		),
		'url'            => array(
			'required'  => false,
			'validator' => 'validate_url',
		),
		'date'           => array(
			'required'  => false,
			'validator' => 'validate_date',
		),
		'datetime-local' => array(
			'required'  => false,
			'validator' => 'validate_datetime',
		),
		'time'           => array(
			'required'  => false,
			'validator' => 'validate_time',
		),
		'week'           => array(
			'required'  => false,
			'validator' => 'validate_week',
		),
		'month'          => array(
			'required'  => false,
			'validator' => 'validate_month',
		),
		'search'         => array(
			'required'  => false,
			'validator' => 'validate_text',
		),
		'select'         => array(
			'required'  => false,
			'validator' => 'validate_text',
		),
		'checkbox'       => array(
			'required'  => false,
			'validator' => 'validate_checkbox',
		),
		'radio'          => array(
			'required'  => false,
			'validator' => 'validate_radio',
		),
		'hidden'         => array(
			'required'  => false,
			'validator' => 'validate_text',
		),
		'captchaToken'   => array(
			'required'  => false,
			'validator' => 'validate_captcha',
		),
		'nonceToken'     => array(
			'required'  => false,
			'validator' => 'validate_nonce',
		),
	);

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
	 * Validate a single form field.
	 *
	 * @param array $field The field data.
	 * @return \WP_Error|true Returns true if valid, WP_Error if invalid.
	 */
	private function validate_field( $field ) {
		// Check if this field is required.
		$is_required = isset( $field['required'] ) ? (bool) $field['required'] : false;

		// Ensure required field properties exist.
		if ( ! isset( $field['type'] ) ) {
			return new \WP_Error(
				'invalid_field_structure',
				'Field missing required type property.',
				array(
					'status' => 400,
					'field'  => $field,
				)
			);
		}

		$field_type  = sanitize_text_field( $field['type'] );
		$field_value = sanitize_text_field( $field['value'] );

		// Check if field type is supported.
		if ( ! isset( self::FIELD_VALIDATION_RULES[ $field_type ] ) ) {
			return new \WP_Error(
				'unsupported_field_type',
				"Unsupported field type: {$field_type}",
				array(
					'status' => 400,
					'field'  => $field,
				)
			);
		}

		$rules = self::FIELD_VALIDATION_RULES[ $field_type ];

		// Check if required field is empty.
		if ( $is_required && empty( $field_value ) ) {
			return new \WP_Error(
				'required_field_empty',
				"Required field of type '{$field_type}' cannot be empty.",
				array(
					'status' => 400,
					'field'  => $field,
				)
			);
		}

		// Skip validation if field is not required and empty.
		if ( ! $is_required && empty( $field_value ) ) {
			return true;
		}

		// Run type-specific validation.
		$validator = $rules['validator'];
		if ( method_exists( $this, $validator ) ) {
			return $this->$validator( $field_value, $field_type );
		}

		return true;
	}

	/**
	 * Validate email field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_email( $value, $type = 'email' ) {
		if ( ! filter_var( $value, FILTER_VALIDATE_EMAIL ) ) {
			return new \WP_Error( 'invalid_email', 'Invalid email address format.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate text fields (text, textarea, search).
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_text( $value, $type = 'text' ) {
		// Basic sanitization check.
		if ( sanitize_text_field( $value ) !== $value && 'textarea' !== $type ) {
			return new \WP_Error( 'invalid_text', 'Text field contains invalid characters.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate number field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_number( $value, $type = 'number' ) {
		if ( ! is_numeric( $value ) ) {
			return new \WP_Error( 'invalid_number', 'Number field must contain a valid number.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate telephone field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_tel( $value, $type = 'tel' ) {
		// Basic phone number validation - allows numbers, spaces, dashes, parentheses, plus.
		if ( ! preg_match( '/^[\d\s\-\(\)\+\.]+$/', $value ) ) {
			return new \WP_Error( 'invalid_tel', 'Telephone field contains invalid characters.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate URL field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_url( $value, $type = 'url' ) {
		if ( ! filter_var( $value, FILTER_VALIDATE_URL ) ) {
			return new \WP_Error( 'invalid_url', 'URL field must contain a valid URL.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate date field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_date( $value, $type = 'date' ) {
		$date = \DateTime::createFromFormat( 'Y-m-d', $value );
		if ( ! $date || $date->format( 'Y-m-d' ) !== $value ) {
			return new \WP_Error( 'invalid_date', 'Date field must be in YYYY-MM-DD format.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate datetime-local field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_datetime( $value, $type = 'datetime-local' ) {
		$datetime = \DateTime::createFromFormat( 'Y-m-d\TH:i', $value );
		if ( ! $datetime || $datetime->format( 'Y-m-d\TH:i' ) !== $value ) {
			return new \WP_Error( 'invalid_datetime', 'Datetime field must be in YYYY-MM-DDTHH:MM format.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate time field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_time( $value, $type = 'time' ) {
		$time = \DateTime::createFromFormat( 'H:i', $value );
		if ( ! $time || $time->format( 'H:i' ) !== $value ) {
			return new \WP_Error( 'invalid_time', 'Time field must be in HH:MM format.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate week field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_week( $value, $type = 'week' ) {
		if ( ! preg_match( '/^\d{4}-W\d{2}$/', $value ) ) {
			return new \WP_Error( 'invalid_week', 'Week field must be in YYYY-WNN format.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate month field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_month( $value, $type = 'month' ) {
		$date = \DateTime::createFromFormat( 'Y-m', $value );
		if ( ! $date || $date->format( 'Y-m' ) !== $value ) {
			return new \WP_Error( 'invalid_month', 'Month field must be in YYYY-MM format.', array( 'status' => 400 ) );
		}
		return true;
	}

	/**
	 * Validate captcha field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_captcha( $value, $type = 'captchaToken' ) {
		return true;
	}

	/**
	 * Validate nonce field.
	 *
	 * @param string $value The field value.
	 * @param string $type The field type.
	 * @return \WP_Error|true
	 */
	private function validate_nonce( $value, $type = 'nonceToken', ) {
		return wp_verify_nonce( $value, 'prc-block-form' );
	}

	/**
	 * Format the email body with HTML table styling.
	 * Safely sanitizes the values and labels before outputting them.
	 *
	 * @param array  $form_fields The form fields data.
	 * @param string $form_name The name of the form.
	 * @return string The formatted HTML message.
	 */
	private function format_body( $form_fields, $form_name ) {
		$message = '';
		foreach ( $form_fields as $index => $field ) {
			// Skip system fields like captcha and nonce tokens.
			if ( in_array( $field['type'], array( 'captchaToken', 'nonceToken' ), true ) ) {
				continue;
			}

			$label = isset( $field['label'] ) ? sanitize_text_field( $field['label'] ) : 'Unlabeled Field';
			$value = sanitize_text_field( $field['value'] );

			// Handle checkbox values.
			if ( 'checkbox' === $field['type'] ) {
				$value = isset( $field['checked'] ) && $field['checked'] ? 'Yes' : 'No';
			}

			// Handle empty values.
			if ( empty( $value ) && 'checkbox' !== $field['type'] ) {
				$value = '<em style="color: #95a5a6;">Not provided</em>';
			}

			// Alternate row colors.
			$row_color = ( 0 === $index % 2 ) ? '#f8f9fa' : '#ffffff';

			$message .= '
						<tr style="background-color: ' . $row_color . ';">
							<td style="padding: 12px 15px; border-bottom: 1px solid #ecf0f1; font-weight: 600; color: #2c3e50;">' . esc_html( $label ) . '</td>
							<td style="padding: 12px 15px; border-bottom: 1px solid #ecf0f1;">' . $value . '</td>
						</tr>';
		}

		return $message;
	}

	/**
	 * Format the email message with HTML table styling.
	 *
	 * @param array  $form_fields The form fields data.
	 * @param string $form_name The name of the form.
	 * @return string The formatted HTML message.
	 */
	private function format_message( $form_fields, $form_name ) {
		$form_name = sanitize_text_field( $form_name );

		$message = '
		<html>
		<head>
			<title>Form Submission from ' . esc_html( $form_name ) . '</title>
		</head>
		<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
			<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Form Submission</h2>
				<p style="margin-bottom: 20px;"><strong>Form:</strong> ' . esc_html( $form_name ) . '</p>
				<table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
					<thead>
						<tr style="background-color: #3498db; color: white;">
							<th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #2980b9;">Field</th>
							<th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #2980b9;">Value</th>
						</tr>
					</thead>
					<tbody>';

		$message .= $this->format_body( $form_fields, $form_name );

		$message .= '
					</tbody>
				</table>
				<div style="margin-top: 30px; padding: 15px; background-color: #ecf0f1; border-left: 4px solid #3498db; color: #2c3e50;">
					<p style="margin: 0; font-size: 14px;"><strong>Submission Time:</strong> ' . current_time( 'F j, Y, g:i a' ) . '</p>
				</div>
			</div>
		</body>
		</html>';

		return $message;
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
		if ( ! $this->validate_nonce( $nonce ) ) {
			return new \WP_Error( 'invalid_nonce', 'Unauthorized access, NONCE invalid. ERROR CODE: 403', array( 'status' => 403 ) );
		}

		$form_data = json_decode( $request->get_body(), true );

		if ( ! $form_data || ! is_array( $form_data ) ) {
			return new \WP_Error( 'invalid_form_data', 'Invalid form data provided.', array( 'status' => 400 ) );
		}

		$form_id   = $form_data['formId'] ?? '';
		$form_name = $form_data['formName'] ?? '';
		$target    = $form_data['redirectTarget'] ?? false;

		// Verify $target is a valid email address.
		if ( ! filter_var( $target, FILTER_VALIDATE_EMAIL ) ) {
			return new \WP_Error( 'invalid_target', 'Invalid target provided by form. Must be a valid email address.', array( 'status' => 400 ) );
		}

		$form_fields = $form_data['formFields'] ?? array();
		if ( ! is_array( $form_fields ) || empty( $form_fields ) ) {
			return new \WP_Error( 'empty_form_fields', 'No form fields provided.', array( 'status' => 400 ) );
		}

		// Find the first field with type 'email' and use its value as the email address.
		$email_address = false;
		foreach ( $form_fields as $field ) {
			if ( isset( $field['type'] ) && 'email' === $field['type'] && ! empty( $field['value'] ) ) {
				$email_address = $field['value'];
				break;
			}
		}

		// Verify the email address is a valid email address.
		if ( ! filter_var( $email_address, FILTER_VALIDATE_EMAIL ) ) {
			return new \WP_Error( 'invalid_email', 'Invalid email address in form submission. Must be a valid email address.', array( 'status' => 400 ) );
		}

		// Validate all form fields efficiently.
		foreach ( $form_fields as $field ) {
			$validation_result = $this->validate_field( $field );
			if ( is_wp_error( $validation_result ) ) {
				return $validation_result;
			}
		}

		$subject = 'New Form Submission from: ' . sanitize_text_field( $form_name );
		$message = $this->format_message( $form_fields, $form_name );

		$headers   = array( 'Content-Type: text/html; charset=UTF-8' );
		$headers[] = 'From: ' . sanitize_email( $email_address );
		$headers[] = 'Reply-To: ' . sanitize_email( $email_address );

		$sent = \wp_mail( $target, $subject, $message, $headers ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.wp_mail_wp_mail

		if ( $sent ) {
			return new \WP_REST_Response( array( 'message' => 'Form submission sent successfully' ), 200 );
		} else {
			return new \WP_Error( 'form_submission_failed', 'Form submission failed to send', array( 'status' => 500 ) );
		}
	}
}
