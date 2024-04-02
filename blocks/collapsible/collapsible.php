<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Collapsible
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Collapsible {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/collapsible/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'query_vars', $this, 'register_qvar', 10, 1 );
		}
	}

	/**
	 * @hook prc_platform_rewrite_query_vars
	 * @param array $query_vars
	 * @return array $query_vars
	 */
	public function register_qvar($query_vars) {
		$query_vars[] = 'collapsibleId';
		return $query_vars;
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
		add_shortcode( 'collapsible', array( $this, 'shortcode_fallback' ), 10, 2 );
	}

	/**
	 * A fallback for the collapsible shortcode.
	 * @param mixed $atts
	 * @param mixed $content
	 * @return string
	 */
	public function shortcode_fallback( $atts, $content = null ) {
		ob_start();
		?>
		<!-- wp:prc-block/collapsible {"title":"How we did this"} -->
		<?php echo $content;?>
		<!-- /wp:prc-block/collapsible -->
		<?php
		$collapsible_fallback = ob_get_clean();
		$block				  = parse_blocks( $collapsible_fallback )[1];

		return render_block( $block );
	}

}
