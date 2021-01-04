<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class PRC_Story_Item extends PRC_Block_Library {

	public $version      = '2.0.1';
	public $block_assets = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'init', array( $this, 'register_frontend_assets' ), 11 );
		}
	}

	private function cherry_pick_attr( $needle, $haystack ) {
		if ( array_key_exists( $needle, $haystack ) ) {
			return $haystack[ $needle ];
		}
		return '';
	}

	/**
	 * Renders the `prc-block/story-item` placeholder block.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_story_item( $attributes, $content, $block ) {
		// Do we need to go fetch information at any time??
		$image_size = $this->cherry_pick_attr( 'imageSize', $attributes );
		$image_slot = $this->cherry_pick_attr( 'imageSlot', $attributes );
		$stacked    = ( 'left' === $image_slot || 'right' === $image_slot );
		$post_id    = $this->cherry_pick_attr( 'postID', $attributes );
		$label      = $this->cherry_pick_attr( 'label', $attributes );
		$date       = $this->cherry_pick_attr( 'date', $attributes );
		$title      = $this->cherry_pick_attr( 'title', $attributes );
		$excerpt    = $this->cherry_pick_attr( 'excerpt', $attributes );
		$extra      = $this->cherry_pick_attr( 'extra', $attributes );
		ob_start();
		vdump( $attributes );
		?>
		<div
			class=<?php echo esc_attr( classNames( 'react-story-item', $this->cherry_pick_attr( 'className', $attributes ) ) ); ?>
			data-label=<?php echo esc_attr( $label ); ?>
			data-date=<?php echo esc_attr( $date ); ?>
			data-link=<?php echo esc_attr( $this->cherry_pick_attr( 'link', $attributes ) ); ?>
			data-image=<?php echo esc_attr( $this->cherry_pick_attr( 'image', $attributes ) ); ?>
			data-imageSlot=<?php echo esc_attr( $image_slot ); ?>
			data-imageSize=<?php echo esc_attr( $image_size ); ?>
			data-headerSize=<?php echo esc_attr( $this->cherry_pick_attr( 'headerSize', $attributes ) ); ?>
			data-classname=<?php echo esc_attr( $this->cherry_pick_attr( 'className', $attributes ) ); ?>
			data-emphasis=<?php echo esc_attr( $this->cherry_pick_attr( 'enableEmphasis', $attributes ) ); ?>
			data-breakingNews=<?php echo esc_attr( $this->cherry_pick_attr( 'enableBreakingNews', $attributes ) ); ?>
			data-excerptbelow=<?php echo esc_attr( $this->cherry_pick_attr( 'enableExcerptBelow', $attributes ) ); ?>
			data-chartArt=<?php echo esc_attr( $this->cherry_pick_attr( 'isChartArt', $attributes ) ); ?>
		>
			<div
				id=<?php echo esc_attr( 'post-' . $post_id ); ?>
				class=<?php echo esc_attr( classNames( 'ui item story is-style-' . $image_slot, array( 'stacked' => $stacked ) ) ); ?>
			>
				<div class="content">
					<div class="ui fluid placeholder">
						<div class="header">
							<div class="line" />
							<div class="line" />
						</div>
						<div class="paragraph">
							<div class="line" />
							<div class="line" />
							<div class="line" />
							<div class="line" />
							<div class="line" />
						</div>
					</div>
				</div>
				<div class="hidden">
					<?php
					if ( true === $this->cherry_pick_attr( 'enableHeader', $attributes ) ) {
						echo "<div class='title'>{$title}</div>";
					}
					?>
					<?php
					if ( true === $this->cherry_pick_attr( 'enableExcerpt', $attributes ) ) {
						echo "<div class='description'>{$excerpt}</div>";
					}
					?>
					<?php
					if ( true === $this->cherry_pick_attr( 'enableExtra', $attributes ) ) {
						echo "<ul class='extra'>{$extra}</ul>";
					}
					?>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the menu link block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'lodash', 'wp-components' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$this->block_assets = $enqueue->register(
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
				'editor_script'   => array_pop( $this->block_assets['js'] )['handle'],
				'style'           => array_pop( $this->block_assets['css'] )['handle'],
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);

		// Not sure what this is doing really...
		// if ( false !== $this->block_assets ) {
		// add_filter(
		// 'prc_story_item_script_handle',
		// function() {
		// return array_pop( $this->block_assets['js'] )['handle'];
		// }
		// );
		// }
	}

	public function register_frontend_assets() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'moment', 'wp-url' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$frontend_assets = $enqueue->register(
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

		wp_register_script(
			'prc-story-item-frontend',
			str_replace( get_template_directory_uri(), '', array_pop( $frontend_assets['js'] )['url'] ),
			$js_deps,
			$this->version,
			true
		);
	}
}

new PRC_Story_Item( true );

function prc_get_story_item( $args ) {
	$story_item = new PRC_Story_Item( false );
	wp_enqueue_script( 'prc-story-item-frontend' );
	return $story_item->render_story_item();
}
