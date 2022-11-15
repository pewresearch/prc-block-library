<?php
use \WPackio as WPackio;

class Related_Posts_Block extends PRC_Block_Library {
	public static $block_name = 'prc-block/related-posts';
	public static $version = 1.0;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		// return $content;

		$post_type = array_key_exists( 'postType', $attributes ) ? $attributes['postType'] : 'post';
		$taxonomy = array_key_exists( 'taxonomy', $attributes ) ? $attributes['taxonomy'] : 'category';
		$related_posts = apply_filters( 'prc_related_posts', get_the_ID(), array(
			'post_type' => $post_type,
			'taxonomy' => $taxonomy,
		) );

		if ( empty( $related_posts ) ) {
			return; // Exit Early No Related Posts.
		}

		$block_attrs = get_block_wrapper_attributes();

		$block_content = '';

		$block_instance = $block->parsed_block;

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
		$block_instance['blockName'] = 'core/null';

		foreach( $related_posts as $post ) {
			// Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
			// `render_callback` and ensure that no wrapper markup is included.
			$block_content .= (
				new WP_Block(
					$block_instance,
					array(
						'queryId' => 0,
						'postId'  => $post['postId'],
						'postType' => $post['postType'],
					)
				)
			)->render( array( 'dynamic' => false ) );
		}

		return sprintf(
			'<div %1$s></div>',
			$block_attrs
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$block_content
		);

	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'related-posts',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/related-posts',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Related_Posts_Block( true );
