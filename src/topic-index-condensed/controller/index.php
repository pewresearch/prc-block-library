<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\EnqueueNew;

class Topic_Index_Condensed_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_filter( 'query_vars', array( $this, 'register_query_vars' ), 20, 1 );
		}
	}

	public function register_query_vars( $qvars ) {
		$qvars[] = 'menuItem';
		return $qvars;
	}

	public function render_accordion_section( $label, $link, $uuid, $inner_blocks ) {
		$title_class_names   = classNames(
			'title',
			array(
				'active' => sanitize_title( $label ) === get_query_var( 'menuItem', false ),
			)
		);
		$content_class_names = classNames(
			'content',
			array(
				'active' => sanitize_title( $label ) === get_query_var( 'menuItem', false ),
			)
		);
		ob_start();
		?>
		<div class="<?php echo esc_attr( $title_class_names ); ?>" data-slug="<?php echo esc_attr( sanitize_title( $label ) ); ?>">
			<h2><i class="dropdown icon"></i> <?php echo $label; ?></h2>
		</div>
		<div class="<?php echo esc_attr( $content_class_names ); ?>" data-slug="<?php echo esc_attr( sanitize_title( $label ) ); ?>">
			<p><a href="<?php echo esc_url( $link ); ?>">Main <?php echo $label; ?> page</a></p>
			<?php
			foreach ( $inner_blocks as $block ) {
				echo render_block( $block );
			}
			?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function render_mobile_accordion( $block ) {
		$menu_items = $block->parsed_block['innerBlocks'][0]['innerBlocks'];
		$menu_items = array_map(
			function( $e ) {
				return $e['attrs']['uuid'];
			},
			$menu_items
		);
		$page_items = $block->parsed_block['innerBlocks'][1]['innerBlocks'];
		// Sort page items by menu items and return a formatted array of only the data we need.
		$page_items = array_map(
			function( $v ) use ( $page_items ) {
				return array_pop(
					array_filter(
						array_filter(
							array_map(
								function( $e ) {
									if ( array_key_exists( 'heading', $e['attrs'] ) && ! empty( $e['attrs']['heading'] ) ) {
										return array(
											'uuid'        => $e['attrs']['uuid'],
											'heading'     => $e['attrs']['heading'],
											'url'         => $e['attrs']['url'],
											'innerBlocks' => $e['innerBlocks'],
										);
									}
								},
								$page_items
							),
							function( $e ) {
								return null !== $e;
							}
						),
						function( $e ) use ( $v ) {
							return $e['uuid'] === $v;
						}
					)
				);
			},
			$menu_items
		);
		
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class' => 'ui accordion',
			)
		);
		ob_start();
		echo '<div ' . $block_wrapper_attrs . '>';
		// We need to get the order of page items from menu items...)
		foreach ( $page_items as $page_item ) {
			echo $this->render_accordion_section( 
				$page_item['heading'],
				$page_item['url'],
				$page_item['uuid'],
				$page_item['innerBlocks']
			);
		}
		echo '</div>';
		return ob_get_clean();
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-controller
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_controller_placeholder( $attributes, $content, $block ) {
		$this->enqueue_frontend();
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class' => 'ui grid',
			)
		);
		if ( jetpack_is_mobile() ) {
			return $this->render_mobile_accordion( $block );
		} 
		ob_start();
		?>
		<div <?php echo $block_wrapper_attrs; ?>>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function enqueue_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-url' );
		$enqueue = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		return $enqueue->enqueue(
			'frontend',
			'topic-index-condensed',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	/**
	 * Register the prc-block/grid block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-condensed-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . 'controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_controller_placeholder' ),
			)
		);
	}
}

new Topic_Index_Condensed_Controller( true );
