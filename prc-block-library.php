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
 * Plugin Name:       PRC Block Library (Private)
 * Plugin URI:        https://pewresearch.org
 * Description:       PRC Block Library
 * Version:           2.1.20
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Seth Rubenstein, Benjamin Wormald
 * Author URI:        https://www.pewresearch.org/devdocs/
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
	public static $version = '2.1.20';

	/**
	 * Registered wpackio assets
	 *
	 * @var array
	 */
	public $registered = array();
	public $enqueue    = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			// Only load assets when a block is used. This allows us to unregister core block styles and use our own.
			add_filter( 'should_load_separate_core_block_assets', '__return_true' );

			add_filter( 'block_categories_all', array( $this, 'register_block_categories' ), 10, 2 );

			// @TODO Needs to be moved into shared wpack vendor outputs.
			require_once plugin_dir_path( __FILE__ ) . '/src/fact-sheet-collection/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/_deprecated/index.php';

			// Get files from blocks.json and include them.
			$files = json_decode( file_get_contents( plugin_dir_path( __FILE__ ) . '/blocks.json' ), true );
			$blocks = $files['blocks'];
			foreach ( $blocks as $block ) {
				if ( !array_key_exists('php', $block) ) {
					continue;
				}
				$php_path = $block['php'];
				require_once plugin_dir_path( __FILE__ ) . $php_path;
			}

			add_filter( 'safe_style_css', array($this, 'allowed_inline_styles') );
			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_html_tags' ), 10, 2 );
		}
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
	 * Filter the allowed style attributes for sanitization.
	 * @param mixed $styles
	 * @return mixed
	 */
	public function allowed_inline_styles( $styles ) {
		$styles[] = 'aspect-ratio'; // Adding this to support Vimeo block.
		return $styles;
	}

	/**
	 * Filter the allowed tags for sanitization.
	 *
	 * @param array $allowed_tags Allowed tags.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags, $context ) {
		$allowed_tags['iframe'] = array(
			'class' => true,
			'loading' => true,
			'src' => true,
			'width' => true,
			'height' => true,
			'frameborder' => true,
			'allowfullscreen' => true,
			'title' => true,
			'style' => true,
		);
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
