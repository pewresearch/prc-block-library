<?php
use \WPackio as WPackio;

class Related_Posts_Block extends PRC_Block_Library {
	public static $block_name = 'prc-block/related-posts';
	public static $version = 1.0;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		return $content;
		// query db off of this hash
		$hash = array_key_exists('prc-block/quote-sorter-hash', $block->context) ? $block->context['prc-block/quote-sorter-hash'] : false;
		$hasQuoteArt = $attributes['includeQuoteArt'];
		$block_attrs = get_block_wrapper_attributes( [
			'class' => 'active-quote ' . ( $hasQuoteArt ? '' : 'no-art' ),
		]);
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
		<div
			class="wp-block-prc-block-quote-sorter-quotes"
			data-has-art=<?php echo $hasQuoteArt; ?>
			data-art-color=<?php echo $attributes['quoteArtColor']; ?>
		  >
		<?php foreach ( $quotes['quotes'] as $quote ) {
			$block_instance = $block->parsed_block;

			// Set the block name to one that does not correspond to an existing registered block.
			// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
			$block_instance['blockName'] = 'core/null';

			// Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
			// `render_callback` and ensure that no wrapper markup is included.
			$block_content = (
				new WP_Block(
					$block_instance,
					array(
						'prc-block/quote-sorter/quote' => $quote['quote'],
						'prc-block/quote-sorter/attribution'  => $quote['attribution'],
					)
				)
			)->render( array( 'dynamic' => false ) );

			// get the props array, add quotation marks, then stringify
			// print_r($quote['props'][0]);
			$typologies_props = $quote['props'];
			$typologies_str = $typologies_props ? '"' . implode('","', $quote['props']) . '"' : '';
			echo wp_sprintf(
				'<div %1$s data-typologies=\'[%2$s]\'>%3$s</div>',
				$block_attrs,
				$typologies_str,
				$block_content
			);
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
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'related-posts',
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
			plugin_dir_path( __DIR__ ) . '/related-posts',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Related_Posts_Block( true );
