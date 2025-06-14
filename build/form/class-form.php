<?php
/**
 * Form Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Get form endpoints
	 *
	 * Sets the default email endpoint and allows for additional endpoints to be added.
	 *
	 * @return array
	 */
	public function get_form_endpoints() {
		return apply_filters(
			'prc_platform_form_endpoints',
			array(
				array(
					'namespace'   => 'prc-block-library/forms',
					'action'      => 'email',
					'method'      => 'server',
					'label'       => 'Email',
					'description' => 'Email form',
				),
			)
		);
	}

	/**
	 * Get API action
	 *
	 * @param string $namespace_prefix Namespace prefix.
	 * @param string $action Action.
	 * @return string
	 */
	public function get_api_action( $namespace_prefix, $action ) {
		return $namespace_prefix . '::' . $action;
	}

	/**
	 * Get server action
	 *
	 * @param string $namespace_prefix Namespace prefix.
	 * @param string $action Action.
	 * @return string
	 */
	public function get_server_action( $namespace_prefix, $action ) {
		return $this->get_api_action( $namespace_prefix, $action );
	}

	/**
	 * Get REST action
	 *
	 * @param string $namespace_prefix Namespace prefix.
	 * @param string $action Action.
	 * @return string
	 */
	public function get_rest_action( $namespace_prefix, $action ) {
		return $this->get_api_action( $namespace_prefix, $action );
	}

	/**
	 * Get the form fields
	 *
	 * @param string $content Content.
	 * @return array
	 */
	public function get_form_fields( $content ) {
		$tag = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag( 'form' );
		$tag->set_bookmark( 'start' );
		// First lets get the checkboxes, they're the only input element with a wrapper.
		$checkboxes  = array();
		$text_fields = array();
		while ( $tag->next_tag(
			array(
				'tag_name'   => 'div',
				'class_name' => 'wp-block-prc-block-form-input-checkbox',
			)
		) ) {
			$tag->set_bookmark( 'checkbox-div' );
			$label_text = '';
			while ( $tag->next_tag( array( 'tag_name' => 'label' ) ) ) {
				$label_text = '';
				// Step into the label and collect all text tokens until the closing tag.
				while ( $tag->next_token() ) {
					if ( $tag->is_tag_closer( 'label' ) ) {
						break;
					}
					if ( '#text' === $tag->get_token_type() ) {
						$label_text .= $tag->get_modifiable_text();
					}
				}
				// Now $label_text contains the full inner text of the label, even with nested tags.
			}
			$tag->seek( 'checkbox-div' );
			while ( $tag->next_tag(
				array(
					'tag_name' => 'input',
				)
			) ) {
				$checkboxes[] = array(
					'id'       => $tag->get_attribute( 'id' ),
					'name'     => $tag->get_attribute( 'name' ),
					'value'    => $tag->get_attribute( 'value' ),
					'label'    => $label_text,
					'type'     => $tag->get_attribute( 'type' ),
					'required' => $tag->get_attribute( 'required' ),
					'checked'  => $tag->get_attribute( 'checked' ),
				);
			}
		}
		$tag->seek( 'start' );
		while ( $tag->next_tag(
			array(
				'tag_name'   => 'div',
				'class_name' => 'wp-block-prc-block-form-field',
			)
		) ) {
			$tag->set_bookmark( 'field-div' );
			$label_text = '';
			while ( $tag->next_tag( array( 'tag_name' => 'label' ) ) ) {
				$label_text = '';
				// Step into the label and collect all text tokens until the closing tag.
				while ( $tag->next_token() ) {
					if ( $tag->is_tag_closer( 'label' ) ) {
						break;
					}
					if ( '#text' === $tag->get_token_type() ) {
						$label_text .= $tag->get_modifiable_text();
					}
				}
				// Now $label_text contains the full inner text of the label, even with nested tags.
			}
			$tag->seek( 'field-div' );
			while ( $tag->next_tag(
				array(
					'tag_name'   => 'input',
					'class_name' => 'wp-block-prc-block-form-input-text',
				)
			) ) {
				$text_fields[] = array(
					'id'          => $tag->get_attribute( 'id' ),
					'name'        => $tag->get_attribute( 'name' ),
					'value'       => $tag->get_attribute( 'value' ),
					'label'       => $label_text,
					'type'        => $tag->get_attribute( 'type' ),
					'placeholder' => $tag->get_attribute( 'placeholder' ),
					'required'    => $tag->get_attribute( 'required' ),
					'disabled'    => $tag->get_attribute( 'disabled' ),
					'readonly'    => $tag->get_attribute( 'readonly' ),
					'hidden'      => $tag->get_attribute( 'hidden' ),
				);
			}
		}

		$merged_fields = array_merge( $checkboxes, $text_fields );
		return $merged_fields;
	}

	/**
	 * Render the errors
	 *
	 * @return string
	 */
	public function render_errors() {
		return wp_sprintf(
			'<div class="wp-block-prc-block-form-errors"><template data-wp-each--error="context.errors"><mark class="wp-block-prc-block-form-error"><button data-wp-text="context.error.message" data-wp-on--click="actions.onErrorClick" data-wp-bind--data-action-url="context.error.actionUrl" type="button"></button></mark></template></div>',
		);
	}

	/**
	 * Render the form callback
	 *
	 * @param array  $attributes Attributes.
	 * @param string $content Content.
	 * @return string
	 */
	public function render_form_callback( $attributes, $content ) {
		$form_method    = $attributes['method'] ?? false;
		$form_action    = $attributes['action'] ?? false;
		$form_namespace = $attributes['namespace'] ?? false;
		if ( empty( $form_method ) || empty( $form_action ) || empty( $form_namespace ) ) {
			return '';
		}
		$redirect_url = $attributes['redirectUrl'] ?? false;
		// If redirectUrl is / then set it to the current URL.
		if ( '/' === $redirect_url ) {
			$redirect_url = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : false;
		}
		if ( empty( $redirect_url ) ) {
			$redirect_url = false;
		}
		$tag = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag( 'form' );

		// Get and set the id if it doesn't exist.
		$block_id = $tag->get_attribute( 'id' );
		if ( ! $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-' );
			$tag->set_attribute( 'id', $block_id );
		}
		// Define the interactivity namespace.
		$tag->set_attribute( 'data-wp-interactive', 'prc-block/form' );

		// Define the interactivity context.
		$tag->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'formFields'           => array(),
					'formId'               => $block_id,
					'errors'               => array(),
					'captchaPassed'        => false,
					'captchaHidden'        => true,
					'captchaToken'         => '',
					'nonceName'            => 'prc-block-form',
					'nonceToken'           => wp_create_nonce( 'prc-block-form' ),
					'stopProcessing'       => false,
					'submissionProcessing' => false,
					'allowSubmit'          => true,
					'formMessage'          => false,
					'submitButtonText'     => __( 'Submit' ),
					'submitMethod'         => array(
						'method'    => $form_method,
						'action'    => $form_action,
						'namespace' => $form_namespace,
					),
					'redirectUrl'          => $redirect_url,
				)
			)
		);
		// Events.
		$tag->set_attribute( 'data-wp-init', 'callbacks.onFormMount' );
		$tag->set_attribute( 'data-wp-on--submit', 'actions.onSubmit' );
		$tag->set_attribute( 'data-wp-class--has-errors', 'state.hasErrors' );
		$tag->set_attribute( 'data-wp-class--is-displaying-form-message', 'state.formMessage' );
		$tag->set_attribute( 'data-wp-class--is-processing', 'context.submissionProcessing' );
		$tag->set_attribute( 'data-wp-watch--onCaptchaPassing', 'callbacks.onCaptchaPassing' );
		$tag->set_attribute( 'data-wp-watch--onProcessing', 'callbacks.onProcessing' );
		$tag->set_attribute( 'data-wp-watch--sendSubmission', 'callbacks.sendSubmission' );

		$content = $tag->get_updated_html();

		// Add errors and processing spinner to the end of the form.
		$regex       = '/<\/form>/';
		$replacement = $this->render_errors() . '<div class="wp-block-prc-block-form-processing"><div class="wp-block-prc-block-form-processing_spinner"><span>Processing...</span></div></div></form>';
		return preg_replace( $regex, $replacement, $content );
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/form',
			array(
				'render_callback' => array( $this, 'render_form_callback' ),
			)
		);
	}
}
