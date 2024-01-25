<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Promo
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Promo {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/promo/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	/**
	 * Render an appropriate promo block with a mailchimp form with the attrs from a legacy shortcode.
	 * e.g. [newsletter list_id=”{mailchimp list id}” headline=”Sign up for our weekly newsletter” subheadline=”Our latest data, delivered Saturdays” align=”aligncenter”]
	 *
	 * @param mixed $atts
	 * @param mixed $content
	 * @return string
	 */
	public function newsletter_shortcode_fallback( $atts, $content = null ) {
		//
		$args = wp_parse_args(
			$atts,
			array(
				'list_id'     => '7c1390ba46',
				'headline'    => 'Sign up for our Weekly newsletter',
				'subheadline' => 'Fresh data delivered Saturday mornings',
			)
		);
		ob_start();
		?>
		<!-- wp:prc-block/promo {"backgroundColor":"#fff","hasForm":true} -->
		<div class="wp-block-prc-block-promo__text"><h2 class="wp-block-prc-block-promo__heading"><?php echo esc_html( $args['headline'] ); ?></h2><div class="wp-block-prc-block-promo__sub_heading"><p><?php echo esc_html( $args['subheadline'] ); ?></p></div></div><div class="wp-block-prc-block-promo__action"><!-- wp:prc-block/mailchimp-form {"interest":"<?php echo esc_html( $args['list_id'] ); ?>","buttonColor":"#000","className":"wp-block-prc-block-mailchimp-form is-style-horizontal"} /--></div>
		<!-- /wp:prc-block/promo -->
		<?php
		$promo_content = ob_get_clean();
		$block         = parse_blocks( $promo_content )[1];
		return render_block( $block );
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
		add_shortcode( 'newsletter', array( $this, 'newsletter_shortcode_fallback' ), 10, 2 );
	}

}
