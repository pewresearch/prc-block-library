<?php
/**
 * Promo Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Promo
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Promo {
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
			$loader->add_filter( 'block_bindings_supported_attributes_prc-block/promo', $this, 'enable_pattern_overrides' );
		}
	}

	/**
	 * Enable pattern overrides for the promo block
	 *
	 * @hook block_bindings_supported_attributes_prc-block/promo
	 * @param array $supported_attributes Supported attributes.
	 * @return array
	 */
	public function enable_pattern_overrides( $supported_attributes ) {
		$supported_attributes[] = 'heading';
		$supported_attributes[] = 'subHeading';
		$supported_attributes[] = 'icon';
		return $supported_attributes;
	}

	/**
	 * Render an appropriate promo block with a mailchimp form with the attrs from a legacy shortcode.
	 * e.g. [newsletter list_id=”{mailchimp list id}” headline=”Sign up for our weekly newsletter” subheadline=”Our latest data, delivered Saturdays” align=”aligncenter”]
	 *
	 * @param mixed $atts
	 * @param mixed $content
	 * @return string
	 */
	public function newsletter_shortcode_fallback( $atts, $content = null ) {
				$args = wp_parse_args(
					$atts,
					array(
						'list_id'     => '7c1390ba46',
						'headline'    => 'Sign up for our Weekly newsletter',
						'subheadline' => 'Fresh data delivered Saturday mornings',
					)
				);
		ob_start();
		?>
		<!-- wp:prc-block/promo {"backgroundColor":"#fff","hasForm":true} -->
		<div class="wp-block-prc-block-promo__text"><h2 class="wp-block-prc-block-promo__heading"><?php echo esc_html( $args['headline'] ); ?></h2><div class="wp-block-prc-block-promo__sub_heading"><p><?php echo esc_html( $args['subheadline'] ); ?></p></div></div><div class="wp-block-prc-block-promo__action"><!-- wp:prc-block/form {"formName":"Newsletter Signup","method":"api","namespace":"prc-block/form","action":"subscribe","actionConfig":{"interest":"<?php echo esc_html( $args['list_id'] ); ?>"},"className":"is-style-horizontal","layout":{"type":"flex","justifyContent":"space-between"}} -->
<form class="wp-block-prc-block-form is-style-horizontal"><!-- wp:prc-block/form-input-text {"required":true,"metadata":{"name":"emailAddress"}} /--><!-- wp:prc-block/form-submit --><!-- wp:button {"tagName":"button","type":"submit"} -->
<div class="wp-block-button"><button type="submit" class="wp-block-button__link wp-element-button">Submit</button></div>
<!-- /wp:button --><!-- wp:prc-block/form-captcha /--><!-- /wp:prc-block/form-submit --><!-- wp:prc-block/form-message /--></form>
<!-- /wp:prc-block/form --></div>
		<!-- /wp:prc-block/promo -->
		<?php
		$promo_content = ob_get_clean();
		$block         = parse_blocks( $promo_content )[1];
		return render_block( $block );
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		static $block_number = 1;

		$attributes         = wp_parse_args(
			$attributes,
			array(
				'icon'    => '',
				'hasForm' => false,
			)
		);
		$class_name         = array_key_exists( 'className', $attributes ) ? $attributes['className'] : 'is-style-standard';
		$has_form           = array_key_exists( 'hasForm', $attributes ) ? $attributes['hasForm'] : false;
		$has_icon           = ! empty( $attributes['icon'] ) && 'is-style-asymmetrical' !== $class_name;
		$icon_url           = PRC_BLOCK_LIBRARY_DIR . '/src/promo/assets/' . $attributes['icon'] . '.svg';
		$heading            = array_key_exists( 'heading', $attributes ) ? $attributes['heading'] : '';
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'    => md5( wp_json_encode( $attributes ) ),
				'class' => \PRC\BlockUtils\classNames(
					$class_name,
					array(
						'has-icon'       => $has_icon,
						'has-large-icon' => 'alexa' === $attributes['icon'],
						'has-form'       => $has_form,
					)
				),
			)
		);

		$icon = $has_icon ? wp_sprintf(
			'<div class="wp-block-prc-block-promo__icon"><img src="%s" alt="%s"/></div>',
			esc_url( $icon_url ),
			'Icon for promotion number ' . $block_number
		) : '';

		++$block_number;

		return wp_sprintf(
			'<div %1$s><div class="wp-block-prc-block-promo__inner-container">%2$s%3$s</div></div>',
			$wrapper_attributes,
			$icon,
			$content
		);
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
			PRC_BLOCK_LIBRARY_DIR . '/build/promo',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
		add_shortcode( 'newsletter', array( $this, 'newsletter_shortcode_fallback' ), 10, 2 );
	}
}
