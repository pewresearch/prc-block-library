<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/video-popup` block.
 *
 * @package gutenberg
 */

class Popup_Modal extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$is_video = array_key_exists('className', $attributes) && $attributes['className'] === 'is-style-video';
		$classnames = classNames('ui modal', array(
			'basic' => $is_video,
		));
		$block_attrs = get_block_wrapper_attributes(array(
			'class' => $classnames,
			'data-inverted' => array_key_exists('inverted', $attributes) ? boolval($attributes['inverted']) : false,
		));
		ob_start();
		?>
		<div <?php echo $block_attrs; ?>>
			<?php if ( ! $is_video ) {
				echo "<div class='header'><h2>{$attributes['title']}</h2></div>";
			}?>
			<div class="content">
				<?php echo wp_kses( $content, 'post' ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'popup-modal',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . 'modal',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'editor_style'   => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Popup_Modal( true );
