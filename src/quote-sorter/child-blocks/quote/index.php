<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

//  TODO: finish setting up Quotes block

class Quote_Sorter_Quote_Block extends Quote_Sorter {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {


		$quoteArt = array_key_exists('prc-block/quote-sorter-art', $block->context) ? $block->context['prc-block/quote-sorter-art'] : false;
		print_r($quoteArt);
		$block_attrs = get_block_wrapper_attributes(
			array(
				'class' => $attributes['class'] . ' quote-component active-quote wp-block-prc-block-quote-sorter-quote',
				'data-typologies' => wp_json_encode($attributes['props']),
			)
		);
		ob_start();
		echo '<!-- .wp-block-prc-block-quote-sorter-quote -->';
		?>

		<div <?php echo $block_attrs;?> >
			<div class="content">
				<div class="description">“<?php echo $attributes['quote']; ?>”</div>
			</div>
			<div class="extra content">
				<div class="meta">
				<?php echo $attributes['attribution']; ?>
				</div>
			</div>
		</div>
		<?php
		echo '<!-- /.wp-block-prc-block-quote-sorter-quote -->';
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'quote-sorter-quote',
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
			plugin_dir_path( __DIR__ ) . '/quote',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'			  => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Quote_Sorter_Quote_Block( true );
