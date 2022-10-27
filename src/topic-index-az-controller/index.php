<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/topic-index-az-controller` block.
 *
 * @package gutenberg
 */

class Topic_Index_AZ_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_az_list( $block ) {
		$az      = array( 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' );
		$present = array();
		foreach ( $block->inner_blocks as $block ) {
			foreach ( $block->inner_blocks as $row ) {
				foreach ( $row->inner_blocks as $column ) {
					foreach ( $column->inner_blocks as $az_block ) {
						if ( array_key_exists( 'letter', $az_block->attributes ) ) {
							$present[] = strtoupper( $az_block->attributes['letter'] );
						}
					}
				}
			}
		}
		$list = '';
		foreach ( $az as $letter ) {
			$class = classnames( 'item', array( 'disabled' => ! in_array( $letter, $present ) ) );
			$list .= "<a href='#{$letter}' class='{$class}'>{$letter}</a>";
		}
		return empty( $list ) ? false : $list;
	}

	public function render_mobile_accordion( $block ) {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'frontend',
			'topic-index-az-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array( 'jquery' ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$az = array();
		foreach ( $block->inner_blocks as $block ) {
			foreach ( $block->inner_blocks as $row ) {
				foreach ( $row->inner_blocks as $column ) {
					foreach ( $column->inner_blocks as $az_block ) {
						if ( array_key_exists( 'letter', $az_block->attributes ) ) {
							$letter                           = strtoupper( $az_block->attributes['letter'] );
							$block                            = $az_block->parsed_block;
							$block['attrs']['disableHeading'] = true;
							$az[ $letter ]                    = $block;
						}
					}
				}
			}
		}

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class' => 'ui divided accordion',
			)
		);

		$return = '<div ' . $block_wrapper_attrs . '>';
		foreach ( $az as $letter => $az_block ) {
			$return .= parent::render_accordion_section(
				$letter,
				false,
				array( $az_block )
			);
		}
		$return = $return . '</div>';
		return $return;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		if ( jetpack_is_mobile() ) {
			return $this->render_mobile_accordion( $block );
		}

		// get all the inner blocks columns and then all the innerblocks a-z blocks inside those columns and compute available a-z list.
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'    => 'prc-az-index-menu',
				'class' => 'ui secondary fluid menu',
			)
		);
		$az_list             = $this->render_az_list( $block );
		ob_start();
		?>
		<div <?php echo $block_wrapper_attrs; ?>>
			<?php echo false !== $az_list ? $az_list : ''; ?>
		</div>
		<?php echo wp_kses( $content, 'post' ); ?>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-az-controller',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_editor_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/topic-index-az-controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Topic_Index_AZ_Controller( true );
