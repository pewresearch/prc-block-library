<?php
use \WPackio as WPackio;

class Flip_Card_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$attrs = array(
			'class' => classNames(
				'rendered',
				array(
					'alignleft'  => array_key_exists( 'align', $attributes ) && 'left' === $attributes['align'],
					'alignright' => array_key_exists( 'align', $attributes ) && 'right' === $attributes['align'],
				) 
			),
			'style' => sprintf( 'width: %spx; min-height: %spx; border-color: %s; background-color: %s', $attributes['width'], $attributes['height'], $attributes['borderColor'], $attributes['bgColor'] ),
		);
		if ( array_key_exists( 'isFluid', $attributes ) && true === $attributes['isFluid'] ) {
			$attrs['style'] = sprintf( 'border-color: %s; background-color: %s', $attributes['borderColor'], $attributes['bgColor'] );
		}

		$block_attrs = get_block_wrapper_attributes( $attrs );
		ob_start();
		?>
		<div <?php echo $block_attrs; ?>>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$block = $enqueue->register(
			'blocks',
			'flip-card-controller',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$frontend = $enqueue->register(
			'frontend',
			'flip-card-controller',
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
			plugin_dir_path( __DIR__ ) . '/controller',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'editor_style'    => array_pop( $block['css'] )['handle'],
				'script'          => array_pop( $frontend['js'] )['handle'],
				'style'           => array_pop( $frontend['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Flip_Card_Controller( true );
