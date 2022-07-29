<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Group_Block extends PRC_Block_Library {
	public static $version = '3.0.4';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );

			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 100, 2 );

			add_filter( 'render_block', array( $this, 'group_block_render_callback' ), 10, 2 );
			add_shortcode( 'callout', array( $this, 'callout_shortcode_fallback' ) );
		}
	}

	public function enqueue_assets( $js = true, $css = true, $frontend = false ) {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'group',
			array(
				'js'        => $js,
				'css'       => $css,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		if ( $frontend ) {
			$enqueue->enqueue(
				'frontend',
				'group',
				array(
					'js'        => true,
					'css'       => false,
					'js_dep'    => array(),
					'css_dep'   => array(),
					'in_footer' => true,
					'media'     => 'all',
				)
			);
		}
	}

	/**
	 * Register additional attributes for group block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( 'core/group' !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'isSticky', $metadata['attributes'] ) ) {
			$metadata['attributes']['isSticky'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		// If you pass an id to the block, it will be used as the anchor for when the mobile viewpoint is reached.
		if ( ! array_key_exists( 'responsiveAttachId', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveAttachId'] = array(
				'type'    => 'string',
			);
		}
		// If you pass a threshold it will be used for the mobile viewpoint attach. If not, the default is 640.
		if ( ! array_key_exists( 'responsiveThreshold', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveThreshold'] = array(
				'type'    => 'integer',
				'default' => 640,
			);
		}

		return $metadata;
	}

	public function add_settings(array $settings, array $metadata) {
		if ( 'core/group' === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/group/isSticky' => 'isSticky',
					'core/group/responsiveAttachId' => 'responsiveAttachId',
					'core/group/responsiveThreshold' => 'responsiveThreshold',
				)
			);
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array(
					'prc-block/carousel/direction',
				)
			);
		}
		return $settings;
	}

	public function group_block_render_callback( $block_content, $block ) {
		if ( 'core/group' !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$this->enqueue_assets(
			false,
			true,
			true
		);

		$is_sticky = is_array($block['attrs']) && array_key_exists('isSticky', $block['attrs']) ? $block['attrs']['isSticky'] : false;
		$responsive_attach_id = is_array($block['attrs']) && array_key_exists('responsiveAttachId', $block['attrs']) ? $block['attrs']['responsiveAttachId'] : false;
		$responsive_threshold = is_array($block['attrs']) && array_key_exists('responsiveThreshold', $block['attrs']) ? $block['attrs']['responsiveThreshold'] : false;
		$carousel = isset( $block->context['prc-block/carousel/direction'] ) ? $block->context['prc-block/carousel/direction'] : false;

		$block_content = apply_filters( 'prc_group_block_content', $block_content, $block );

		if ( $is_sticky ) {
			$block_content = wp_sprintf(
				'<div class="prc-group-block--sticky">%s</div>',
				$block_content
			);
		}

		if ( $responsive_threshold && $responsive_attach_id ) {
			$id = md5($block_content);
			$block_content = wp_sprintf(
				'<div class="prc-group-block--responsive" data-return-id="%1$s" data-attach-id="%2$s" data-responsive-threshold="%3$s">%4$s</div>',
				$id,
				$responsive_attach_id,
				$responsive_threshold,
				$block_content
			);
		}

		if ( false !== $carousel ) {
			$block_content = wp_sprintf(
				'<div class="prc-group-block--carousel">%s</div>',
				$block_content
			);
		}

		return $block_content;
	}

	/**
	 * For content in the legacy content editor
	 * fallback to using core/block when calling the [callout] shortcode.
	 */
	public function callout_shortcode_fallback( $attr, $content = null ) {
		$attr = wp_parse_args(
			$attr,
			array(
				'style' => false,
				'align' => false,
			)
		);

		ob_start();
		?>
		<!-- wp:group {<?php echo $attr['align'] ? '' : esc_attr( '"align":"' . substr( $attr['align'], 5 ) ); ?> "style":{"color":{"background":"#f7f7f1"}},"className":"is-style-callout <?php echo $attr['align'] ? '' : esc_attr( $attr['align'] ); ?>"} -->
		<div class="wp-block-group <?php echo $attr['align'] ? '' : esc_attr( $attr['align'] ); ?> is-style-callout has-background" style="background-color:#f7f7f1">
		%s
		</div>
		<!-- /wp:group -->
		<?php
		$block_content = ob_get_clean();
		$block_content = wp_sprintf( $block_content, do_shortcode( $content ) );
		$callout_block = parse_blocks( $block_content );
		$callout_block = render_block( $callout_block[1] );
		return $callout_block;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$this->enqueue_assets( true, true, false );
	}
}

new Group_Block( true );
