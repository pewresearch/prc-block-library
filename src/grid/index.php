<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;
class Grid_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'prc_core_on_publish', array( $this, 'update_featured_post_ids' ), 10, 2 );
			add_action( 'prc_core_on_update', array( $this, 'update_featured_post_ids' ), 10, 2 );
		}
	}

	protected function get_unique_array( $arr1, $arr2 ) {
		return array_unique( array_merge( $arr1, $arr2 ), SORT_REGULAR );
	}

	/**
	 * Search prc-block/column for prc-block/story-item and return and array of post ids.
	 *
	 * @param mixed $inner_blocks
	 * @param mixed $post_ids
	 * @return mixed
	 */
	public function get_story_item_ids_from_column( $inner_blocks, $post_ids = array() ) {
		do_action( 'qm/debug', 'get_story_item_ids_from_column() ->' . print_r( $inner_blocks, true ) );
		foreach ( $inner_blocks as $key => $inner_block ) {
			if ( 'prc-block/story-item' === $inner_block['blockName'] ) {
				if ( ! empty( $inner_block['attrs']['postID'] ) ) {
					$post_ids[] = $inner_block['attrs']['postID'];
				}
			} elseif ( 'prc-block/grid' === $inner_block['blockName'] ) {
				$post_ids = $this->get_unique_array( $post_ids, $this->recursively_search_grid_for_story_items( $inner_block, $post_ids ) );
			}
		}
		return $post_ids;
	}

	/**
	 * Search prc-block/grid or core/group blocks for prc-block/story-item and return array of their post ids.
	 * // https://stackoverflow.com/questions/10928993/is-there-a-way-to-loop-through-a-multidimensional-array-without-knowing-its-dep
	 *
	 * @param mixed $block
	 * @param mixed $post_ids
	 * @return mixed
	 */
	public function recursively_search_grid_for_story_items( $block, $post_ids ) {

		if ( 'prc-block/grid' === $block['blockName'] ) {
			if ( ! empty( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as $key => $inner_block ) {
					if ( 'prc-block/row' === $inner_block['blockName'] ) {
						foreach ( $inner_block['innerBlocks'] as $key => $inner_block ) {
							if ( 'prc-block/column' === $inner_block['blockName'] ) {
								$post_ids = $this->get_story_item_ids_from_column( $inner_block['innerBlocks'], $post_ids );
							}
						}
					}
				}
			}
		} elseif ( 'core/group' === $block['blockName'] ) {
			if ( ! empty( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as $key => $inner_block ) {
					$post_ids = $this->get_unique_array( $post_ids, $this->recursively_search_grid_for_story_items( $inner_block, $post_ids ) );
				}
			}
		}

		return $post_ids;
	}

	/**
	 * Parses the story items inside a grid inside a post/page and builds an array of all post id's referenced in story items
	 * useful for excluding posts in wp_query block and topic page pre_get_posts
	 */
	public function update_featured_post_ids( $post, $has_blocks ) {
		if ( true !== $has_blocks ) {
			return;
		}

		if ( ! has_block( 'prc-block/story-item', $post ) && ! has_block( 'prc-block/grid', $post ) ) {
			return;
		}

		$post_ids = array();

		$blocks = parse_blocks( $post->post_content );

		foreach ( $blocks as $key => $block ) {
			if ( 'prc-block/story-item' === $block['blockName'] ) {
				if ( false !== $block['attrs']['postID'] ) {
					$post_ids[] = $block['attrs']['postID'];
				}
			}
			$post_ids = $this->get_unique_array( $post_ids, $this->recursively_search_grid_for_story_items( $block, $post_ids ) );
		}

		$post_ids = apply_filters( 'prc_block_featured_post_ids', $post_ids, $blocks );

		if ( ! empty( $post_ids ) ) {
			update_post_meta( $post->ID, '_featured_posts', $post_ids );
		}
	}

	/**
	 * Render callback for prc-block/grid
	 * If there is only one row block then well treat that row block as the grid, otherwise (if there is more than one rwo) treat this as the grid and the rows as rows. 
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_grid( $attributes, $content, $block ) {
		$inner_blocks = $block->parsed_block['innerBlocks'];
		$classnames   = array_key_exists( 'className', $attributes ) ? $attributes['className'] : null;
		$use_css_grid = array_key_exists( 'useCssGrid', $attributes ) ? $attributes['useCssGrid'] : false;
		$count        = count( $inner_blocks );

		ob_start();
		if ( $count > 1 ) {
			$class_names = classNames(
				'wp-block-prc-block-grid',
				array(
					'ui grid' => false === $use_css_grid,
				),
				explode( ' ', $classnames )
			);
			echo '<div class="' . esc_attr( $class_names ) . '">';
		}
		foreach ( $inner_blocks as $row_block ) {
			if ( $count > 1 ) {
				$row_block['attrs']['asRow'] = true;
			}
			$row_block['attrs']['useCssGrid'] = $use_css_grid;
			echo render_block( $row_block );
		}
		if ( $count > 1 ) {
			echo '</div>';
		}
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/grid block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'grid',
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
			plugin_dir_path( __DIR__ ) . '/grid',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_grid' ),
			)
		);
	}
}

new Grid_Block( true );
