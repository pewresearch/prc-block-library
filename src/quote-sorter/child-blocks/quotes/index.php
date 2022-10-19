<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

//  TODO: finish setting up Quotes block

class Quote_Sorter_Quotes_Block extends Quote_Sorter {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes(array());
		// query db off of this hash
		$hash = array_key_exists('prc-block/quote-sorter-hash', $block->context) ? $block->context['prc-block/quote-sorter-hash'] : false;
		if ( false === $hash) {
			return new WP_Error( 'no-hash', 'No hash found in block context.' );
		}
		$query  = new Quote_Sorter_Query(
			array(
				'hash'   => $hash,
				'limit'  => 1,
				'fields' => array( 'hash', "quotes" ),
			)
		);
		$result = array_pop( $query->items );
		if ( false === $result ) {
			return new WP_Error( 'no-result', 'No result found in query.' );
		}
		$quotes = json_decode( $result->quotes, true );
		shuffle($quotes['quotes']);
		// for loop through quotes
		ob_start();
		?>
		<div <?php echo $block_attrs;?>>
		<?php foreach ( $quotes['quotes'] as $quote ) {
			$parsed = new WP_Block_Parser_Block(
				'prc-block/quote-sorter-quote',
				$quote,
				[],
				'',
				''
			);
			echo render_block((array) $parsed);
		} ?>
		<div class="wp-block-prc-block-quote-sorter-no-results hidden"><?php echo wp_kses($attributes['noResultsMessage'], 'post') ;?></div>
		</div>
		<div class="show-more">
			<button class="ui button show-more__button">View all</button>
		</div>
		<?php
		return ob_get_clean();

	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'quote-sorter-quotes',
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
			plugin_dir_path( __DIR__ ) . '/quotes',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Quote_Sorter_Quotes_Block( true );
