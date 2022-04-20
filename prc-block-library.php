<?php
/**
 * PRC Block Library
 *
 * @package           PRC_Block_Library
 * @author            Seth Rubenstein
 * @copyright         2021 Pew Research Center
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       PRC Block Library
 * Plugin URI:        https://pewresearch.org
 * Description:       PRC Block Library
 * Version:           2.1.13
 * Requires at least: 5.4
 * Requires PHP:      7.4
 * Author:            Seth Rubenstein, Benjamin Wormald
 * Author URI:        https://sethrubenstein.info
 * Text Domain:       prc-block-library
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

define( 'PRC_BLOCK_LIBRARY_FILE', __FILE__ );
define( 'PRC_BLOCK_LIBRARY_DIR', __DIR__ );

class PRC_Block_Library {
	/**
	 * Easily accessible variable that points to the plugin filepath.
	 *
	 * @var string
	 */
	public static $plugin_file = __FILE__;
	/**
	 * Version, change whenever you push a change to production otherwise script concatenation will break Gutenberg.
	 *
	 * @var string
	 */
	public static $version = '2.1.13a';

	/**
	 * Registered wpackio assets
	 *
	 * @var array
	 */
	public $registered = array();
	public $enqueue    = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			// Only load assets when a block is used.
			add_filter( 'should_load_separate_core_block_assets', '__return_true' );

			add_filter( 'block_categories_all', array( $this, 'register_block_categories' ), 10, 2 );

			// @TODO Needs to be moved into shared wpack vendor outputs.
			require_once plugin_dir_path( __FILE__ ) . '/src/fact-sheet-collection/index.php';

			require_once plugin_dir_path( __FILE__ ) . '/src/_deprecated/index.php';

			// Using shared wpack vendor outputs.
			// Layout Primitives.
			require_once plugin_dir_path( __FILE__ ) . '/src/grid/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/row/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/column/index.php';
			// Load Main BLock Library.
			require_once plugin_dir_path( __FILE__ ) . '/src/chart-builder-data-wrapper/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/chart-builder/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/collapsible/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/cover/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/daily-briefing-signup/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/flip-card/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/github-gist/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/group/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/heading/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/image/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/livestream/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/mailchimp-form/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/mailchimp-opt-down/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/mailchimp-select/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/media-text/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu-link/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/page/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/paragraph/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/popular-listing/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/popup/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-date/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-bylines/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-sub-title/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-title/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/promo/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/promo-rotator/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/pullquote/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/query/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/responsive-container/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/separator/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/social-link/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/story-item/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/staff/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/staff-listing/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/table/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/table-of-contents/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/tabs/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/taxonomy-tree/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/taxonomy-tree-more/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-az/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-az-controller/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-categorized/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-condensed/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-search-field/index.php';

			// @TODO This needs to be gone through once all the blocks are moved into the format ^ above
			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_html_tags' ), 10, 2 );
		}
	}

	public function register_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			$block_categories,
			array(
				array(
					'slug'  => 'content-curation',
					'title' => __( 'Content Curation', 'prc-block-library-categories' ),
				),
				array(
					'slug'  => 'essay',
					'title' => __( 'Essays', 'prc-block-library-categories' ),
				),
				array(
					'slug'  => 'marketing',
					'title' => __( 'Marketing', 'prc-block-library-categories' ),
				),
			)
		);
	}

	/**
	 * Filter the allowed tags for sanitization.
	 *
	 * @param array $allowed_tags Allowed tags.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags, $context ) {
		$allowed_tags['div']['style']  = true;
		$allowed_tags['img']['srcset'] = true;
		$allowed_tags['img']['sizes']  = true;
		$allowed_tags['picture']       = true;
		$allowed_tags['source']        = array(
			'srcset' => true,
			'media'  => true,
			'type'   => true,
		);
		// Add SVG Support
		$allowed_tags['svg']  = array(
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
		);
		$allowed_tags['path'] = array(
			'd'    => array(),
			'fill' => array(),
		);
		$allowed_tags['rect'] = array(
			'x'      => array(),
			'y'      => array(),
			'width'  => array(),
			'height' => array(),
			'fill'   => array(),
		);
		return $allowed_tags;
	}

	/**
	 * This mimics core get_block_wrapper_attributes($extra_attributes = array()) for when we're intercepting a block render and global $block data is lost.
	 * @param array $extra_attributes
	 * @return mixed
	 */
	public function _get_block_wrapper_attributes( $extra_attributes = array() ) {
		$new_attributes = array();///

		if ( empty( $new_attributes ) && empty( $extra_attributes ) ) {
			return '';
		}

		// This is hardcoded on purpose.
		// We only support a fixed list of attributes.
		$attributes_to_merge = array( 'style', 'class' );
		$attributes          = array();
		foreach ( $attributes_to_merge as $attribute_name ) {
			if ( empty( $new_attributes[ $attribute_name ] ) && empty( $extra_attributes[ $attribute_name ] ) ) {
				continue;
			}

			if ( empty( $new_attributes[ $attribute_name ] ) ) {
				$attributes[ $attribute_name ] = $extra_attributes[ $attribute_name ];
				continue;
			}

			if ( empty( $extra_attributes[ $attribute_name ] ) ) {
				$attributes[ $attribute_name ] = $new_attributes[ $attribute_name ];
				continue;
			}

			$attributes[ $attribute_name ] = $extra_attributes[ $attribute_name ] . ' ' . $new_attributes[ $attribute_name ];
		}

		foreach ( $extra_attributes as $attribute_name => $value ) {
			if ( ! in_array( $attribute_name, $attributes_to_merge, true ) ) {
				$attributes[ $attribute_name ] = $value;
			}
		}

		if ( empty( $attributes ) ) {
			return '';
		}

		$normalized_attributes = array();
		foreach ( $attributes as $key => $value ) {
			$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
		}

		return implode( ' ', $normalized_attributes );
	}

	public function render_accordion_section( $label, $link = false, $inner_blocks ) {
		$title_class_names   = classNames(
			'title',
			array(
				'active' => sanitize_title( $label ) === get_query_var( 'menuItem', false ),
			)
		);
		$content_class_names = classNames(
			'content',
			array(
				'active' => sanitize_title( $label ) === get_query_var( 'menuItem', false ),
			)
		);
		ob_start();
		?>
		<div class="<?php echo esc_attr( $title_class_names ); ?>" data-slug="<?php echo esc_attr( sanitize_title( $label ) ); ?>">
			<h3><i class="dropdown icon"></i> <?php echo $label; ?></h3>
		</div>
		<div class="<?php echo esc_attr( $content_class_names ); ?>" data-slug="<?php echo esc_attr( sanitize_title( $label ) ); ?>">
			<?php echo false !== $link ? '<p><a href="' . esc_url( $link ) . '">Main ' . $label . ' page</a></p>' : null; ?>
			<?php
			foreach ( $inner_blocks as $block ) {
				echo render_block( $block );
			}
			?>
		</div>
		<?php
		return ob_get_clean();
	}

}

new PRC_Block_Library( true );
