<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Promo extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$attributes         = wp_parse_args(
			$attributes,
			array(
				'className'       => '',
				'heading'         => '',
				'headingLevel'    => 2,
				'description'     => '',
				'backgroundColor' => '#fff',
				'borderColor'     => '#fff',
				'sansSerif'       => false,
				'icon'            => '',
			)
		);
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'    => md5( wp_json_encode( $attributes ) ),
				'class' => classnames( 'wp-block-prc-block-promo', $attributes['className'], array( 'sans-serif' => $attributes['sansSerif'] ) ),
				'style' => 'border-color: ' . $attributes['borderColor'] . '; background-color: ' . $attributes['backgroundColor'],
			)
		);
		$heading_tag        = 3 === $attributes['headingLevel'] ? 'h3' : 'h2';
		$heading_tag        = $heading_tag . ' class=' . classnames( array( 'sans-serif' => $attributes['sansSerif'] ) );
		$has_description    = '' !== $attributes['description'] && '<p></p>' !== $attributes['description'];
		$has_icon           = ! empty( $attributes['icon'] );
		$icon_url           = plugin_dir_url( parent::$plugin_file ) . 'src/promo/icons/' . $attributes['icon'] . '.svg';
		ob_start();
		// print_r( $block );
		?>
		<div <?php echo $wrapper_attributes; ?>>
			<?php
			if ( $has_icon ) {
				echo '<div class="icon"><img src="' . esc_url( $icon_url ) . '"/></div>';
			}
			?>
			<div class="text">
				<<?php echo $heading_tag; ?>><?php echo filter_block_kses_value( $attributes['heading'], 'post' ); ?></<?php echo $heading_tag; ?>>
				<?php
				if ( $has_description ) {
					echo '<div>' . filter_block_kses_value( $attributes['description'], 'post' ) . '</div>';
				}
				?>
			</div>
			<div class="action">
				<?php echo wp_kses( $content, 'post' ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-block-editor', 'wp-data', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

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
