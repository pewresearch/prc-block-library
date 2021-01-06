<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/story-item` block.
 *
 * @package gutenberg
 */

class PRC_Story_Item extends PRC_Block_Library {

	public $version         = '2.0.1';
	public $block_assets    = false;
	public $frontend_assets = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_frontend' ), 10 );
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	private function cherry_pick_attr( $needle, $haystack ) {
		if ( array_key_exists( $needle, $haystack ) ) {
			return $haystack[ $needle ];
		}
		return null;
	}

	/**
	 * Get first term in either formats or programs (as determined by $programs flag)
	 *
	 * @param int  $post_id of post you want to fetch.
	 * @param bool $programs flag to enable fetching programs taxonomy instead of formats, defaults to false.
	 * @return string
	 */
	private function get_label( int $post_id, $programs = false ) {
		$terms = wp_get_object_terms( $post_id, $programs ? 'programs' : 'formats', array( 'fields' => 'names' ) );
		if ( ! is_wp_error( $terms ) || ! empty( $terms ) ) {
			return array_shift( $terms );
		}
		return 'Report';
	}

	/**
	 * Given a post id construct a post's story item attributes.
	 * Defaults to pub listing options (stub, image slot left, A3 image size) but these can be overriden by passing in $args (array).
	 *
	 * @param int   $post_id of post you want to fetch.
	 * @param array $args option arguments to override defaults.
	 * @return array
	 */
	public function get_attributes_by_object_id( int $post_id, $args = array() ) {
		$defaults = array(
			'postID'                 => $post_id,
			'postType'               => 'stub',
			'imageSize'              => 'A3',
			'imageSlot'              => 'disabled',
			'isChartArt'             => false,
			'headerSize'             => 2,
			'enableAltHeaderWeight'  => false,
			'enableEmphasis'         => false,
			'enableHeader'           => true,
			'enableExcerpt'          => true,
			'enableExcerptBelow'     => false,
			'enableExtra'            => false,
			'enableBreakingNews'     => false,
			'enableProgramsTaxonomy' => false,
		);
		$attrs    = wp_parse_args( $args, $defaults );

		if ( 'stub' === $attrs['postType'] ) {
			switch_to_blog( 1 );
		}

		$post = get_post( $post_id );

		if ( is_wp_error( $post ) ) {
			restore_current_blog();
			return $post;
		}

		$attrs['title']   = $post->post_title;
		$attrs['excerpt'] = $post->post_excerpt;
		$attrs['date']    = $post->post_date;

		$attrs['label'] = $this->get_label( $post_id, $attrs['enableProgramsTaxonomy'] );

		$art = prc_get_art( $post_id, $attrs['imageSize'] );
		if ( false !== $attrs['imageSlot'] && false !== $art ) {
			$attrs['image']     = $art['rawUrl'];
			$attrs['imageSlot'] = 'left';
			$attrs['className'] = 'is-style-left';
		}

		if ( 'stub' === $attrs['postType'] ) {
			$attrs['link'] = get_post_meta( $post_id, '_redirect', true );
		} else {
			$attrs['link'] = get_permalink( $post_id );
		}

		$attrs = wp_parse_args( $args, $attrs );
		if ( 'stub' === $attrs['postType'] ) {
			restore_current_blog();
		}

		return $attrs;
	}

	/**
	 * Renders the `prc-block/story-item` placeholder block.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns story item placeholder markup.
	 */
	public function render_story_item( $attributes ) {
		// Do we need to go fetch information at any time??
		$image_size = $this->cherry_pick_attr( 'imageSize', $attributes );
		$image_slot = $this->cherry_pick_attr( 'imageSlot', $attributes );
		$stacked    = ( 'top' === $image_slot || 'bottom' === $image_slot );
		$post_id    = $this->cherry_pick_attr( 'postID', $attributes );
		$label      = $this->cherry_pick_attr( 'label', $attributes );
		$date       = $this->cherry_pick_attr( 'date', $attributes );
		$title      = $this->cherry_pick_attr( 'title', $attributes );
		$excerpt    = $this->cherry_pick_attr( 'excerpt', $attributes );
		$extra      = $this->cherry_pick_attr( 'extra', $attributes );

		$story_item_class = 'ui item story is-style-' . $image_slot;
		if ( $stacked ) {
			$story_item_class .= ' stacked';
		}
		$this->enqueue_frontend();
		error_log( print_r( $attributes, true ) );
		ob_start();
		?>
		<div
			class="<?php echo esc_attr( classNames( 'react-story-item', $this->cherry_pick_attr( 'className', $attributes ) ) ); ?>"
			data-label="<?php echo esc_attr( $label ); ?>"
			data-date="<?php echo esc_attr( $date ); ?>"
			data-link="<?php echo esc_attr( $this->cherry_pick_attr( 'link', $attributes ) ); ?>"
			data-image="<?php echo esc_attr( $this->cherry_pick_attr( 'image', $attributes ) ); ?>"
			data-imageSlot="<?php echo esc_attr( $image_slot ); ?>"
			data-imageSize="<?php echo esc_attr( $image_size ); ?>"
			data-headerSize="<?php echo esc_attr( $this->cherry_pick_attr( 'headerSize', $attributes ) ); ?>"
			data-classname="<?php echo esc_attr( $this->cherry_pick_attr( 'className', $attributes ) ); ?>"
			data-emphasis="<?php echo esc_attr( $this->cherry_pick_attr( 'enableEmphasis', $attributes ) ); ?>"
			data-breakingNews="<?php echo esc_attr( $this->cherry_pick_attr( 'enableBreakingNews', $attributes ) ); ?>"
			data-excerptbelow="<?php echo esc_attr( $this->cherry_pick_attr( 'enableExcerptBelow', $attributes ) ); ?>"
			data-chartArt="<?php echo esc_attr( $this->cherry_pick_attr( 'isChartArt', $attributes ) ); ?>"
		>
			<div
				id="<?php echo esc_attr( 'post-' . $post_id ); ?>"
				class="<?php echo esc_attr( $story_item_class ); ?>"
			>
				<?php
				if ( in_array( $image_slot, array( 'left', 'top' ) ) ) {
					echo wp_kses( "<div class='{$image_size} image'><div class='ui fluid placeholder'><div class='image'></div></div></div>", 'post' );
				}
				?>
				<div class="content">
					<div class="ui fluid placeholder">
						<div class="header">
							<div class="line"></div>
							<div class="line"></div>
						</div>
						<div class="paragraph">
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
						</div>
					</div>
				</div>
				<?php
				if ( in_array( $image_slot, array( 'right', 'bottom' ) ) ) {
					echo wp_kses( "<div class='{$image_size} image'><div class='ui fluid placeholder'><div class='image'></div></div></div>", 'post' );
				}
				?>
				<div class="hidden">
					<?php
					if ( true === $this->cherry_pick_attr( 'enableHeader', $attributes ) ) {
						echo wp_kses( "<div class='title'>{$title}</div>", 'post' );
					}
					?>
					<?php
					if ( true === $this->cherry_pick_attr( 'enableExcerpt', $attributes ) ) {
						echo wp_kses( "<div class='description'>{$excerpt}</div>", 'post' );
					}
					?>
					<?php
					if ( true === $this->cherry_pick_attr( 'enableExtra', $attributes ) ) {
						echo wp_kses( "<ul class='extra'>{$extra}</ul>", 'post' );
					}
					?>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'moment', 'wp-url' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$this->frontend_assets = $enqueue->register(
			'story-item',
			'frontend',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		if ( false === $this->frontend_assets || ! array_key_exists( 'js', $this->frontend_assets ) ) {
			$this->register_frontend();
		}
		wp_enqueue_script( array_pop( $this->frontend_assets['js'] )['handle'] );
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
			'story-item',
			'main',
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
			plugin_dir_path( __DIR__ ) . '/story-item',
			array(
				'editor_script'   => array_pop( $block_assets['js'] )['handle'],
				'style'           => array_pop( $block_assets['css'] )['handle'],
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);
	}
}

new PRC_Story_Item( true );

/**
 * By default should only load A3 left aligned stubs, can be modified through args.
 */
function prc_get_story_item( $stub_post_id, $args = array() ) {
	$story_item = new PRC_Story_Item( false );
	$attributes = $story_item->get_attributes_by_object_id( $stub_post_id, $args );
	return $story_item->render_story_item( $attributes );
}
