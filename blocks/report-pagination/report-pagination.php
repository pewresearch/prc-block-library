<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Report Pagination
 * Description:       Provides a stylized pagination for use with reports
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Report_Pagination {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/report-pagination/build/block.json';
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

	public function get_next_post_button($pagination_data, $attributes) {
		$next_post = $pagination_data['next_post'] ?? false;
		if ( false === $next_post ) {
			return false;
		}
		$next_post_title = $next_post['title'];
		// strip any integer. from the start of next_post_title and replace with empty string
		$next_post_title = preg_replace('/^\d+\.\s/', '', $next_post_title);
		$next_post_title = 'Next: ' . $next_post_title;
		$next_post_link = $next_post['link'];

		$classnames = \PRC\Platform\Block_Utils\classNames(
			'wp-block-prc-block-report-pagination__next-post-button',
			array(
				'has-text-color' => $attributes['nextButtonTextColor'],
				'has-' . $attributes['nextButtonTextColor'] .'-color' => $attributes['nextButtonTextColor'],
				'has-background' => $attributes['nextButtonBackgroundColor'],
				'has-' . $attributes['nextButtonBackgroundColor'] . '-background-color' => $attributes['backgroundColor'],
			),
		);
		ob_start();
		?>
		<a href="<?php echo esc_url($next_post_link); ?>" rel="prefetch" class="<?php echo esc_attr($classnames);?>" alt="Go to the next post in this report: <?php echo esc_attr($next_post_title); ?>" style="box-shadow: inset 0 3px 4px -2px var(--wp--preset--color--<?php echo $attributes['nextButtonBoxShadowColor'];?>)">
			<?php echo esc_html($next_post_title); ?>
		</a>
		<?php
		$next_post_button = ob_get_clean();
		return $next_post_button;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'] ?? false;
		if ( false === $post_id ) {
			return;
		}

		$report_package = new \PRC\Platform\Post_Report_Package(null, null);
		$pagination_data = $report_package->get_pagination($post_id);
		$pagination_items = $pagination_data['pagination_items'] ?? array();
		if ( false === $pagination_data || empty($pagination_items) ) {
			return;
		}

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

		$wrapper_attributes = get_block_wrapper_attributes();

		$pagination = new \PRC\Platform\Blocks\Pagination( $pagination_items );

		$pagination_markup = $pagination->get_markup([
			'item_classnames' => \PRC\Platform\Block_Utils\classNames(array(
				'has-text-color' => $attributes['itemTextColor'],
				'has-' . $attributes['itemTextColor'] . '-color' => $attributes['itemTextColor'],
				'has-background' => $attributes['itemBackgroundColor'],
				'has-' . $attributes['itemBackgroundColor'] . '-background-color' => $attributes['itemBackgroundColor'],
				'has-border-color' => $attributes['itemBorderColor'],
				'has-border-' . $attributes['itemBorderColor'] . '-color' => $attributes['itemBorderColor'],
				'has-hover-background' => $attributes['itemHoverBackgroundColor'],
				'has-hover-' . $attributes['itemHoverBackgroundColor'] . '-background-color' => $attributes['itemHoverBackgroundColor'],
				'has-active-background' => $attributes['itemActiveBackgroundColor'],
				'has-active-' . $attributes['itemActiveBackgroundColor'] . '-background-color' => $attributes['itemActiveBackgroundColor'],
			)),
		]);

		$next_post_button = $this->get_next_post_button($pagination_data, $attributes);

		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$wrapper_attributes,
			$next_post_button,
			$pagination_markup,
		);
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
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}
