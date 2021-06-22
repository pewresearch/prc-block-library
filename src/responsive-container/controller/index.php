<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\EnqueueNew;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Responsive_Container_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'wp_footer', array( $this, 'construct_media_queries' ) );
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function get_block_id_hash( $block ) {
		return substr( strtolower( preg_replace( '/[0-9_\/]+/', '', base64_encode( sha1( wp_json_encode( $block ) ) ) ) ), 0, 10 );
	}

	public function construct_media_queries() {
		global $post;

		if ( ! is_singular() && ! has_blocks( $post ) && ! has_block( 'prc-block/responsive-container-controller', $post ) ) {
			return;
		}

		$media_queries = array();
		$blocks        = parse_blocks( $post->post_content );
		$matched       = array_filter(
			array_column( $blocks, 'blockName' ),
			function( $e ) {
				return 'prc-block/responsive-container-controller' === $e;
			} 
		);

		// No data, return early,
		if ( empty( $matched ) ) {
			return;
		}
		
		foreach ( array_keys( $matched ) as $i ) {
			foreach ( $blocks[ $i ]['innerBlocks'] as $viewport_block ) {
				$id  = $this->get_block_id_hash( $viewport_block );
				$min = array_key_exists(
					'min',
					$viewport_block['attrs']
				) ? $viewport_block['attrs']['min'] : null;
				$max = array_key_exists(
					'max',
					$viewport_block['attrs']
				) ? $viewport_block['attrs']['max'] : null;

				error_log( print_r( array( $id, $min, $max ), true ) );

				if ( null !== $min && null !== $max ) {
					$media_queries[ $id ] = sprintf( '@media screen and (max-width: %spx) and (min-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: block!important; }}', $max, $min, $id );
				} elseif ( null !== $max && null === $min ) {
					$media_queries[ $id ] = sprintf( '@media screen and (max-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: block!important; }}', $max, $id );
				}
			}
		}

		// No data, return early,
		if ( empty( $media_queries ) ) {
			return;
		}

		echo '<style>';
		foreach ( $media_queries as $media_query ) {
			echo $media_query;
		}
		echo '</style>';
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id' => $this->get_block_id_hash( $block ),
			)
		);

		$allowed_html = wp_kses_allowed_html( 'post' );
		if ( is_array( $allowed_html ) ) {
			$allowed_html['style']        = true;
			$allowed_html['div']['style'] = true;
		}
		ob_start();
		?>
		<div <?php echo $wrapper_attributes; ?>>
			<?php 
			// Get through an array map or filter (or array_columns) all the min and max of each viewport block. Then...
			foreach ( $block->parsed_block['innerBlocks'] as $i => $viewport_block ) {
				$id = $this->get_block_id_hash( $viewport_block );
				
				$viewport_block['attrs']['id'] = $id;
				echo render_block( $viewport_block );
			}
			?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue    = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$registered = $enqueue->register(
			'blocks',
			'responsive-container-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . 'controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Responsive_Container_Controller( true );
