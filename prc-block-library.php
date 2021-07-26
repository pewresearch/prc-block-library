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
 * Version:           2.1.4.1
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
use WPackio\EnqueueNew;

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
	public static $version = '2.1.4.1';

	/**
	 * Registered wpackio assets
	 *
	 * @var array
	 */
	public $registered = array();
	public $enqueue    = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'block_categories', array( $this, 'register_block_categories' ), 10, 2 );
			
			// @TODO Needs to be moved into shared wpack vendor outputs.
			require_once plugin_dir_path( __FILE__ ) . '/src/fact-sheet-collection/index.php';

			// Using shared wpack vendor outputs.
			// Layout Primitives.
			require_once plugin_dir_path( __FILE__ ) . '/src/grid/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/row/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/column/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/chart-builder-data-wrapper/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/chart-builder/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/collapsible/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/cover/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/group/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/heading/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/mailchimp-form/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/mailchimp-select/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu-link/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/page/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-bylines/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-title/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/promo/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/promo-rotator/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/responsive-container/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/separator/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/social-link/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/story-item/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/sub-title/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/staff/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/table/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/tabs/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/taxonomy-tree/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/taxonomy-tree-more/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-az/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-az-controller/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-categorized/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-condensed/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-search-field/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/wp-query/index.php';

			// @TODO This needs to be gone through once all the blocks are moved into the format ^ above
			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_html_tags' ), 10, 2 );
			add_action( 'init', array( $this, 'register_assets' ), 10 );
			add_action( 'init', array( $this, 'register_blocks' ), 11 );
		}
	}

	public function register_block_categories( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'marketing',
					'title' => __( 'Marketing', 'marketing' ),
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
	public static function allowed_html_tags( $allowed_tags ) {
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

	public function get_handle( $block_name, $asset_type, $location = 'block' ) {
		return array_pop( $this->registered[ $location ][ $block_name ][ $asset_type ] )['handle'];
	}

	/**
	 * Register block assets here. Format as follows:
	 * $this->registered[block|frontend][blockName] = wpPackIo register array
	 *
	 * @return void
	 * @throws LogicException
	 */
	public function register_assets() {
		$js_deps       = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$block_js_deps = array_merge( $js_deps, array( 'wp-components' ) );
		$enqueue       = new EnqueueNew( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', __DIR__ . '/prc_blocks/' );

		/** Chapter */
		$this->registered['block']['prc-block/chapter'] = $enqueue->register(
			'chapter',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Flip Cards */
		$this->registered['block']['prc-block/flip-card']    = $enqueue->register(
			'flip-card',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$this->registered['frontend']['prc-block/flip-card'] = $enqueue->register(
			'flip-card',
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

		/** Mailchimp Opt Down Special Form */
		$this->registered['block']['prc-block/mailchimp-opt-down']    = $enqueue->register(
			'mailchimp-opt-down',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$this->registered['frontend']['prc-block/mailchimp-opt-down'] = $enqueue->register(
			'mailchimp-opt-down',
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

		/** Post Publish Date */
		$this->registered['block']['prc-block/post-publish-date'] = $enqueue->register(
			'post-publish-date',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Pullquote */
		$this->registered['block']['prc-block/pullquote'] = $enqueue->register(
			'pullquote',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array_merge( $block_js_deps, array( 'wp-block-editor', 'wp-blocks', 'wp-rich-text' ) ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
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

	/**
	 * Register blocks and editor scripts/styles. DO NOT use the `script` frontend attribute when registering a block type.
	 * If your block has frontend script asset that needs to be localized load the function `enqueue_frontend_assets`.
	 *
	 * @return void
	 */
	public function register_blocks() {

		/** Chapter */
		register_block_type(
			'prc-block/chapter',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/chapter']['js'] )['handle'],
			)
		);

		/** Flip Card */
		register_block_type(
			'prc-block/flip-card',
			array(
				'editor_script'   => array_pop( $this->registered['block']['prc-block/flip-card']['js'] )['handle'],
				'editor_style'    => array_pop( $this->registered['block']['prc-block/flip-card']['css'] )['handle'],
				'render_callback' => function( $attributes, $content, $block ) {
					wp_enqueue_script( array_pop( $this->registered['frontend']['prc-block/flip-card']['js'] )['handle'] );
					wp_enqueue_style( array_pop( $this->registered['frontend']['prc-block/flip-card']['css'] )['handle'] );
					return $content;
				},
			)
		);

		/** Mailchimp Opt Down Special Form */
		register_block_type(
			'prc-block/mailchimp-opt-down',
			array(
				'editor_script'   => array_pop( $this->registered['block']['prc-block/mailchimp-opt-down']['js'] )['handle'],
				'render_callback' => function( $attributes, $content, $block ) {
					wp_enqueue_script( array_pop( $this->registered['frontend']['prc-block/mailchimp-opt-down']['js'] )['handle'] );
					wp_enqueue_style( array_pop( $this->registered['frontend']['prc-block/mailchimp-opt-down']['css'] )['handle'] );
					return $content;
				},
			)
		);

		/** Post Publish Date */
		register_block_type(
			'prc-block/post-publish-date',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/post-publish-date']['js'] )['handle'],
			)
		);

		/** Pullquote */
		register_block_type(
			'prc-block/pullquote',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/pullquote']['js'] )['handle'],
			)
		);
	}
}

new PRC_Block_Library( true );
