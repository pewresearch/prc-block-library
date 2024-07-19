<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Tab Pane
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Tabs_Pane {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/tabs-pane/build/block.json';
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

	public function render_block_callback( $attributes, $content, $block ) {
		$uuid = array_key_exists( 'uuid', $attributes ) ? $attributes['uuid'] : false;
		if ( ! $uuid ) {
			return;
		}
		$is_dialog = array_key_exists( 'isDialog', $attributes ) ? $attributes['isDialog'] : false;

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class' => \PRC\Platform\Block_Utils\classNames( array(
					'wp-block-prc-block-tabs-pane__dialog' => $is_dialog,
				) ),
				'aria-role'   => 'tabpanel',
				'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/tabs-controller')),
				'data-wp-key' => 'panel-' . $uuid,
				'data-wp-class--is-active' => 'callbacks.isActive',
				'data-wp-context' => wp_json_encode(array('uuid' => $uuid)),
				'data-wp-watch' => 'callbacks.onTabWatch'
			)
		);

		ob_start();
		?>
		<div
			class="wp-block-prc-block-tabs-pane__dialog-overlay"
			id="pane-overlay-%1$s"
			data-wp-interactive="<?php echo wp_json_encode(array('namespace' => 'prc-block/tabs-controller')); ?>"
			data-wp-on--click="actions.hideDialog"
		></div>
		<div class="wp-block-prc-block-tabs-pane__dialog-modal" id="pane-modal-%1$s">
			<div class="wp-block-prc-block-tabs-pane__dialog__inner">
				<div class="wp-block-prc-block-tabs-pane__dialog__header">
					<h2 class="wp-block-prc-block-tabs-pane__dialog__title">
						%2$s
					</h2>
					<button
						type="button"
						aria-label="Close"
						class="wp-block-prc-block-tabs-pane__dialog__close"
						data-wp-interactive="1"
						data-wp-on--click="actions.hideDialog"
					>
						X
					</button>
				</div>
				<div class="wp-block-prc-block-tabs-pane__dialog__body">
					%3$s
				</div>
			</div>
		</div>
		<?php
		$dialog_template = ob_get_clean();
		$dialog_template = wp_sprintf(
			$dialog_template,
			'xyz',
			'Test Modal',
			$content,
		);

		return wp_sprintf(
			'<section %1$s>%2$s</section>',
			$block_wrapper_attrs,
			! $is_dialog ? $content : $dialog_template,
		);
	}

	public function block_init() {
		register_block_type( self::$dir . '/build', array(
			'render_callback' => array( $this, 'render_block_callback' ),
		) );
	}
}
