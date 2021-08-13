<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Page_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$title       = $attributes['title'];
		$content     = $attributes['content'];
		$url         = $attributes['url'];
		$image       = $attributes['image'];
		$read_more   = $attributes['enableReadMore'] && array_key_exists( 'readMore', $attributes ) ? $attributes['readMore'] : false;
		$class_names = classNames(
			'ui page-item',
			array(
				'has-excerpt' => array_key_exists( 'content', $attributes ) && true === $attributes['enableExcerpt'] && ! empty( $attributes['content'] ),
			)
		);
		ob_start();
		?>
		<div class="<?php echo esc_attr( $class_names ); ?>">
			<div class="image"><a href="<?php echo esc_url( $url ); ?>"><img src="<?php echo esc_url( $image ); ?>"/></a></div>
			<div class="content">
				<?php echo wp_kses( "<div class='header'><a href='" . esc_url( $url ) . "'>" . $title . '</a></div>', 'post' ); ?>
				<?php
				if ( true === $attributes['enableExcerpt'] ) {
					echo '<div class="description">' . wp_kses( $content, 'post' ) . '</div>';
				}
				if ( false !== $read_more ) {
					echo '<div class="extra"><span class="read-more">' . filter_block_kses_value( $read_more, 'post' ) . '</span></div>';
				}
				?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'page',
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
			plugin_dir_path( __DIR__ ) . '/page',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Page_Block( true );
