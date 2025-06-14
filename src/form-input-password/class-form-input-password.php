<?php
/**
 * Form Input Password
 *
 * @package PRC\Platform\Blocks
 */
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Input Text Field
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Input_Password {
	/**
	 * Constructor.
	 *
	 * @param object $loader The loader object.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param object $loader The loader object.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Inject the password analyzer into the content and state.
	 *
	 * @param string $content The content to inject the password analyzer into.
	 * @param string $block_id The block ID.
	 * @param array  $existing_state The existing state to merge for this block id.
	 *
	 * @return string The password analyzer.
	 */
	public function inject_password_analyzer( $content, $block_id, $existing_state = array() ) {
		$condition_state = 'state.' . $block_id . '.conditionsList';
		$conditions      = array(
			array(
				'id'    => 'hasLowerCase',
				'label' => 'Includes one lowercase letter',
				'met'   => false,
			),
			array(
				'id'    => 'hasUpperCase',
				'label' => 'Includes one uppercase letter',
				'met'   => false,
			),
			array(
				'id'    => 'hasNumber',
				'label' => 'Includes one number',
				'met'   => false,
			),
			array(
				'id'    => 'hasSpecialCharacter',
				'label' => 'Includes one special character',
				'met'   => false,
			),
			array(
				'id'    => 'hasLength',
				'label' => 'Be at least 12 characters long',
				'met'   => false,
			),
			array(
				'id'    => 'hasNoInvalidCharacters',
				'label' => 'Not include invalid characters',
				'met'   => false,
			),
			array(
				'id'    => 'hasMatch',
				'label' => 'Confirmation matches password',
				'met'   => false,
			),
		);
		ob_start();
		?>
		<div class="prc-block-form-input-password__analyzer" >
			<p>Password Must:</p>
			<ul>
			<template
				data-wp-each--condition="<?php echo esc_attr( $condition_state ); ?>"
				data-wp-each-key="context.condition.id"
			>
				<li data-wp-class--is-valid="context.condition.met">
					<span data-wp-class--icon-hidden="!context.condition.met">
						<?php echo \PRC\Platform\Icons\render( 'solid', 'check' ); ?>
					</span>
					<span data-wp-class--icon-hidden="context.condition.met">
						<?php echo \PRC\Platform\Icons\render( 'regular', 'xmark' ); ?>
					</span>
					<span class="password-analyzer__label" data-wp-text="context.condition.label"></span>
				</li>
			</template>
			</ul>
		</div>
		<?php
		$password_analyzer = ob_get_clean();

		$content = str_replace( '<div class="prc-block-form-input-password__analyzer"></div>', $password_analyzer, $content );

		wp_interactivity_state(
			'prc-block/form-input-password',
			array(
				$block_id => array_merge(
					$existing_state[ $block_id ] ?? array(),
					array(
						'conditionsList' => $conditions,
					)
				),
			)
		);

		return $content;
	}

	/**
	 * Render the block.
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $content The block content.
	 * @param object $block The block object.
	 *
	 * @return string The block HTML.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form';
		if ( null === $target_namespace ) {
			return;
		}

		$input_name            = array_key_exists( 'metadata', $attributes ) && array_key_exists( 'name', $attributes['metadata'] ) ? $attributes['metadata']['name'] : null;
		$includes_confirmation = array_key_exists( 'includesConfirmation', $attributes ) ? $attributes['includesConfirmation'] : false;

		// $block_id = md5( $target_namespace . '/password/' . $input_name . '/' . $includes_confirmation );
		$block_id = wp_unique_id( 'prc-block-form-input-password-' );

		$state = wp_interactivity_state(
			'prc-block/form-input-password',
			array(
				$block_id => array(
					'hasConfirmation'        => $includes_confirmation,
					'value'                  => '',
					'confirmationValue'      => '',
					'passwordInputId'        => null,
					'confirmationInputId'    => null,
					'hasLowerCase'           => false,
					'hasUpperCase'           => false,
					'hasNumber'              => false,
					'hasSpecialCharacter'    => false,
					'hasLength'              => false,
					'hasNoInvalidCharacters' => true,
					'passwordsMatch'         => false,
					'conditionsList'         => array(),
				),
			)
		);
		// This both adds the password analyzer markup and injects the necessary state for the password analyzer.
		// Because this interacts with global state, it's important this run here at this step, not before, not after.
		if ( $includes_confirmation ) {
			$content = $this->inject_password_analyzer( $content, $block_id, $state );
		}

		// Now that we're done processing the html of the block to build state, we can start manipulating it.
		$tag = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-password',
			)
		);
		$tag->set_bookmark( 'start' );
		$tag->set_attribute( 'data-wp-interactive', 'prc-block/form-input-password' );
		$tag->set_attribute( 'id', $block_id );
		$tag->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'id'              => $block_id,
					'targetNamespace' => $target_namespace,
				)
			)
		);
		$tag->set_attribute( 'data-wp-watch--on--value-change', 'callbacks.onValueChange' );
		$tag->set_attribute( 'data-wp-class--is-error', 'context.error' );
		if ( $includes_confirmation ) {
			$tag->set_attribute( 'data-wp-init--on-confirmation-init', 'callbacks.onConfirmationInit' );
			$tag->set_attribute( 'data-wp-watch--on--password-analyzer', 'callbacks.onPasswordAnalyzer' );
		}

		$content = $tag->get_updated_html();

		// Treat this block as a field in the target namespace.
		$state                  = wp_interactivity_state( $target_namespace );
		$existing_form_fields   = $state['formFields'] ?? array();
		$existing_form_fields[] = array(
			'id'          => $block_id,
			'name'        => 'password',
			'label'       => 'Password',
			'type'        => 'password',
			'value'       => '',
			'required'    => true,
			'placeholder' => 'Password...',
			'hidden'      => null,
			'readonly'    => null,
			'disabled'    => null,
			'error'       => null,
		);
		// Inject the form fields into the target namespace, could be prc-block/form, could be another interactive store.
		$state = wp_interactivity_state(
			$target_namespace,
			array(
				'formFields' => $existing_form_fields,
			)
		);

		return $content;
	}

	/**
	 * Register the block.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type_from_metadata/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/form-input-password',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
