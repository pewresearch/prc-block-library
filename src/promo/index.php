<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\EnqueueNew;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Promo extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_shortcode( 'newsletter', array( $this, 'newsletter_shortcode_fallback' ), 10, 2 );
		}
	}

	// [newsletter list_id=”{mailchimp list id}” headline=”Sign up for our weekly newsletter” subheadline=”Our latest data, delivered Saturdays” align=”aligncenter”]
	public function newsletter_shortcode_fallback( $atts, $content = null ) {
		// Render an appropriate promo block with a mailchimp form with the attrs from th is shortcode inside.
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
		<div class="wp-block-prc-block-promo__text"><h2 class="heading sans-serif"><?php echo esc_html( $args['headline'] ); ?></h2><div class="sub-heading sans-serif"><p><?php echo esc_html( $args['subheadline'] ); ?></p></div></div><div class="wp-block-prc-block-promo__action"><!-- wp:prc-block/mailchimp-form {"interest":"<?php echo esc_html( $args['list_id'] ); ?>","buttonColor":"#000","className":"wp-block-prc-block-mailchimp-form is-style-horizontal"} /--></div>
		<!-- /wp:prc-block/promo -->
		<?php
		$promo_content = ob_get_clean();
		$block         = parse_blocks( $promo_content )[1];
		return render_block( $block );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$attributes         = wp_parse_args(
			$attributes,
			array(
				'hasDarkBackground' => false,
				'backgroundColor'   => '#fff',
				'borderColor'       => '#fff',
				'icon'              => '',
				'hasForm'           => false,
			)
		);
		$has_dark_bg        = $attributes['hasDarkBackground'];
		$has_icon           = ! empty( $attributes['icon'] ) && 'is-style-asymmetrical' !== $attributes['className'];
		$icon_url           = plugin_dir_url( parent::$plugin_file ) . 'src/promo/icons/' . $attributes['icon'] . '.svg';
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'    => md5( wp_json_encode( $attributes ) ),
				'class' => classnames(
					$attributes['className'],
					array(
						'has-icon'            => $has_icon,
						'has-large-icon'      => 'alexa' === $attributes['icon'],
						'has-form'            => $attributes['hasForm'],
						'has-dark-background' => $has_dark_bg,
					) 
				),
				'style' => 'border-color: ' . $attributes['borderColor'] . '; background-color: ' . $attributes['backgroundColor'],
			)
		);
		ob_start();
		?>
		<div <?php echo $wrapper_attributes; ?>>
			<div class='wp-block-prc-block-promo__inner-container'>
				<?php
				if ( $has_icon ) {
					echo '<div class="wp-block-prc-block-promo__icon"><img src="' . esc_url( $icon_url ) . '"/></div>';
				}
				?>
				<?php echo wp_kses( $content, 'post' ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-block-editor', 'wp-data', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'promo',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_editor_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/promo',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Promo( true );

/**
 * Renders a standard PRC Promo block
 *
 * @param mixed $args
 * @param mixed $content
 * @return string|false
 */
function prc_render_promo( $args, $content ) {
}
