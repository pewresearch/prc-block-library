<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/story-item` block.
 *
 * @package gutenberg
 */

class PRC_FactSheet_Collection extends PRC_Block_Library {
	protected static $block_slug = 'fact-sheet-collection';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * [get_collection description]
	 *
	 * @param  [type] $post_id [description].
	 * @return array with the current post's collection term id and name and if that term has a parent (it's nested) then it'll return the parent's term id and name as well
	 */
	private function get_collection( $post_id ) {
		/**
		 * Check that this post actually has collection terms.
		 */
		$collections = wp_get_post_terms( $post_id, 'collection' );

		if ( is_wp_error( $collections ) || empty( $collections ) ) {
			return false;
		}

		/**
		 * Get only the first collection.
		 */
		$collection = $collections[0];

		$return = array(
			'parent'  => array(),
			'current' => array(
				'name'    => $collection->name,
				'term_id' => $collection->term_id,
			),
			'menu'    => array(),
		);

		if ( $collection->parent ) {
			$post_type = get_post_type( $post_id );
			$parent    = get_term( $collection->parent, 'collection' );

			$return['parent'] = array(
				'name'    => $parent->name,
				'term_id' => $parent->term_id,
			);

			// $term_children = get_term_children( $parent->term_id, 'collection' );
			$term_children = get_terms(
				array(
					'taxonomy' => 'collection',
					'orderby'  => 'slug',
					'order'    => 'ASC',
					'child_of' => $parent->term_id,
				)
			);
			if ( $term_children ) {
				foreach ( $term_children as $term ) {
					// Get the first post associated with this taxonomy term. Not the newest, the first. That means the oldest.
					// TODO: Figure out a better way to do this.
					// IDEA: We could increase the number of posts to 6, grab the first one position 0 use it for our nav and then add the other 5 into a "More content in this collection" part of the return with post title and link.
					$args = array(
						'post_type'   => $post_type,
						'numberposts' => 1,
						'orderby'     => 'date',
						'order'       => 'ASC',
						'tax_query'   => array(
							array(
								'taxonomy' => 'collection',
								'field'    => 'term_id',
								'terms'    => $term->term_id,
							),
						),
					);

					$linked_posts = new WP_Query( $args );
					$permalink    = '';
					if ( $linked_posts ) {
						$permalink = get_permalink( $linked_posts->posts[0]->ID );
					}

					$return['menu'][ $term->slug ] = array(
						'name'      => $term->name,
						'term_id'   => $term->term_id,
						'permalink' => $permalink,
					);

				}
			}
		}

		return $return;
	}

	public function get_menu_items( $collection ) {
		$items = array();
		$elm   = 'a';
		foreach ( $collection['menu'] as $key => $value ) {
			$link_attr = "href='{$value['permalink']}'";
			// If is active...
			if ( $collection['current']['term_id'] === $value['term_id'] ) {
				$items[] = "<div class='item active'>{$value['name']}</div>";
			} else {
				$items[] = "<{$elm} class='item' {$link_attr}>{$value['name']}</{$elm}>";
			}
		}
		return $items;
	}

	private function get_alt_lang_post_url( $attributes ) {
		if ( array_key_exists( 'altPostLabel', $attributes ) && array_key_exists( 'altPostUrl', $attributes ) ) {
			return array(
				'url'   => $attributes['altPostUrl'],
				'label' => $attributes['altPostLabel'],
			);
		}
		return false;
	}

	private function get_pdf_url( $attributes ) {
		if ( array_key_exists( 'pdfId', $attributes ) ) {
			return wp_get_attachment_url( (int) $attributes['pdfId'] );
		}
		return false;
	}

	public function render_block_callback( $attributes ) {
		ob_start();
		$collection = $this->get_collection( get_the_ID() );
		$alt        = $this->get_alt_lang_post_url( $attributes );
		$pdf_link   = $this->get_pdf_url( $attributes );
		?>
		<div>
			<?php if ( false !== $alt ) : ?>
				<a class="fact-sheet-alt-url" href="<?php echo esc_url( $alt['url'] ); ?>"><?php echo esc_html( $alt['label'] ); ?></a>
			<?php endif; ?>
			<?php if ( false !== $collection ) : ?>
				<div class='factsheet-collection-terms'>
					<?php echo implode( '', $this->get_menu_items( $collection ) ); ?>
				</div>
			<?php endif; ?>
			<?php if ( false !== $pdf_link ) : ?>
				<a class="fact-sheet-download" href="<?php echo esc_url( $pdf_link ); ?>" download><i class="icon file pdf outline"></i>Download a PDF version of this fact sheet</a>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'wp-url' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );
		return $enqueue->register(
			self::$block_slug,
			'frontend',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		$registered = $this->register_frontend();
		wp_enqueue_script( array_pop( $registered['js'] )['handle'] );
	}

	/**
	 * Register the story item block.
	 *
	 * @uses render_story_item()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'lodash', 'wp-components' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$block_assets = $enqueue->register(
			self::$block_slug,
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/' . self::$block_slug,
			array(
				'editor_script'   => array_pop( $block_assets['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new PRC_FactSheet_Collection( true );
