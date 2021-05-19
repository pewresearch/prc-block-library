<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Taxonomy_Tree extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Renders the `prc-block/taxonomy-tree` block.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_taxonomy_tree( $attributes, $content, $block ) {
		$sub_heading = array_key_exists( 'subHeading', $attributes ) ? $attributes['subHeading'] : null;
		$is_alt      = array_key_exists( 'className', $attributes ) && 'is-style-alt' === $attributes['className'] ? true : false;
		$tag_name    = $is_alt ? 'div' : 'h3';
		$classnames  = classNames(
			array(
				'ui sub header' => $is_alt,
			)
		);
		ob_start();
		?>
		<<?php echo esc_attr( $tag_name ); ?> class="<?php echo esc_attr( $classnames ); ?>">
			<?php echo filter_block_kses_value( $sub_heading, 'post' ); ?>
		</<?php echo esc_attr( $tag_name ); ?>>
		<div class="ui list">
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the menu link block.
	 *
	 * @uses render_taxonomy_tree()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'taxonomy-tree',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/taxonomy-tree',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_taxonomy_tree' ),
			)
		);
	}
}

new Taxonomy_Tree( true );
