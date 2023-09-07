<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Data Table
 * Description:       Beyond a simple html table, this block allows you to create rich data tables.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Data_Table {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
		}
	}

	public function register_data_table_post_type() {
		register_post_type(
			'prc-data-table',
			array(
				'labels' => array(
					'name' => __('Data Tables'),
					'singular_name' => __('Data Table'),
					'description' => __('Data Tables are used to create rich data tables.'),
				),
				'public' => true,
				'has_archive' => true,
				'show_in_rest' => true,
				'rest_base' => 'data-tables',
				'rest_controller_class' => 'WP_REST_Posts_Controller',
				'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments'),
			)
		);
	}

	public function render_callback($attributes, $content, $block) {
		if ( is_admin() ) {
			return $content;
		}

		$block_wrapper_attrs = get_block_wrapper_attributes();

		// Generate a dynamic ID for the table data.
		$table_id = 'prc-table-' . wp_hash(wp_json_encode($attributes));

		// Get the table head.
		$thead = isset($attributes['colHeaders']) ? $attributes['colHeaders'] : array();

		// Get the table body.
		$tbody = isset($attributes['data']) ? $attributes['data'] : array();

		$caption = isset($attributes['caption']) ? $attributes['caption'] : '';

		ob_start();
		?>
		<table id="<?php echo esc_attr($table_id); ?>">
			<thead>
				<tr>
					<?php
					foreach ($thead as $cell) {
						echo wp_sprintf('<th>%s</th>', esc_html($cell));
					}
					?>
				</tr>
			</thead>
			<tbody>
				<?php
				foreach ($tbody as $row) {
					echo wp_sprintf('<tr>%s</tr>', implode('', array_map(function ($cell) {
						return wp_sprintf('<td>%s</td>', esc_html($cell));
					}, $row)));
				}
				?>
			</tbody>
		</table>
		<?php
		if ( ! empty($caption) ) {
			echo wp_sprintf('<figcaption>%s</figcaption>', esc_html($caption));
		}
		$table_markup = ob_get_clean();

		$script = wp_sprintf(
			'if (window.prcDataTables === undefined) { window.prcDataTables = {}; } window.prcDataTables["%1$s"] = %2$s;',
			$table_id,
			wp_json_encode($attributes)
		);
		wp_add_inline_script('prc-block-data-table-view-script', $script);

		// You can use this method...
		return wp_sprintf(
			'<figure %1$s>%2$s</figure>',
			$block_wrapper_attrs,
			$table_markup,
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array($this, 'render_callback'),
			),
		);
	}

}

new Data_Table(true);
