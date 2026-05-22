<?php
/**
 * Core Button Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Button
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_Button {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public static $block_name = 'core/button';

	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * View style handle
	 *
	 * @var string
	 */
	public $view_style_handle;

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-button' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'init', $this, 'register_core_button_block_styles' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'prc-block-library/apple-news/components/layouts', $this, 'apple_news_layout' );
			$loader->add_filter( 'prc-block-library/apple-news/components/styles', $this, 'apple_news_style' );
			$loader->add_filter( 'prc-block-library/apple-news/components/text-styles', $this, 'apple_news_text_style' );
			$loader->add_filter( 'render_block', $this, 'render', 10, 2 );
		}
	}

	/**
	 * Register the block's assets.
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->view_style_handle    = register_block_style_handle( $this->block_json, 'style' );

		register_block_style(
			'core/buttons',
			array(
				'name'  => 'flex-buttons',
				'label' => 'Flex Buttons',
			)
		);
	}

	/**
	 * Register the block's editor assets.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register the block's style assets.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_editor_style() {
		wp_enqueue_style( $this->view_style_handle );
	}

	/**
	 * Register additional settings, like context, for the core/button block.
	 *
	 * @hook block_type_metadata_settings
	 *
	 * @param array $settings Current block settings.
	 * @param array $metadata Block metadata.
	 *
	 * @return mixed
	 */
	public function add_settings( array $settings, array $metadata ) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['interactivity'] = true;
			$settings['attributes']    = array_merge(
				$settings['attributes'] ?? array(),
				array(
					'hasIcon'      => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'iconLibrary'  => array( 'type' => 'string' ),
					'iconName'     => array( 'type' => 'string' ),
					'iconPosition' => array(
						'type'    => 'string',
						'default' => 'right',
					),
					'iconColor'    => array( 'type' => 'string' ),
				)
			);
		}
		return $settings;
	}

	/**
	 * Apple News layout
	 * Define the default button styles and settings for Apple News.
	 *
	 * @hook prc-block-library/apple-news/components/layouts
	 *
	 * @param mixed $component_layouts Component layouts.
	 * @return mixed
	 */
	public function apple_news_layout( $component_layouts ) {
		$component_layouts['link-button-layout'] = array(
			'margin'  => array(
				'bottom' => 20,
			),
			'padding' => array(
				'top'    => 10,
				'bottom' => 10,
				'left'   => 15,
				'right'  => 15,
			),
		);
		return $component_layouts;
	}

	/**
	 * Apple News style
	 *
	 * @hook prc-block-library/apple-news/components/styles
	 *
	 * @param mixed $component_styles Component styles.
	 * @return mixed
	 */
	public function apple_news_style( $component_styles ) {
		$component_styles['default-link-button'] = array(
			'backgroundColor' => '#000',
			'mask'            => array(
				'type'   => 'corners',
				'radius' => 0,
			),
		);
		return $component_styles;
	}

	/**
	 * Apple News text style
	 *
	 * @hook prc-block-library/apple-news/components/text-styles
	 *
	 * @param mixed $component_text_styles Component text styles.
	 * @return mixed
	 */
	public function apple_news_text_style( $component_text_styles ) {
		$component_text_styles['default-link-button-text-style'] = array(
			'textColor' => '#FFF',
			'fontName'  => 'Helvetica-Bold',
			'fontSize'  => 18,
		);
		return $component_text_styles;
	}

	/**
	 * Registers additional icon styles for core/button.
	 */
	public function register_core_button_block_styles() {
		register_block_style(
			'core/button',
			array(
				'name'         => 'link',
				'label'        => 'Link',
				'inline_style' => wp_sprintf(
					'.wp-block-button.is-style-link .wp-element-button { background: transparent !important; color: inherit; padding: 0 !important; border: none !important; border-radius: 0 !important; min-height: unset; font-size: inherit; text-decoration: none !important; }',
				),
			)
		);
	}

	/**
	 * Get the button text
	 *
	 * @param string $block_content Block content.
	 * @return string
	 */
	public static function get_button_text( $block_content ) {
		preg_match( '/<(a|button)[^>]*>(.*?)<\/(a|button)>/s', $block_content, $matches );
		if ( ! array_key_exists( 2, $matches ) ) {
			return '';
		}
		return trim( wp_strip_all_tags( $matches[2] ) );
	}

	/**
	 * Adds @wordpress/interactivity api handlers for core/button block.
	 *
	 * @uses:
	 * - actions.onButtonClick
	 * - actions.onButtonMouseEnter
	 * - state.$button_id.text
	 * - state.$button_id.isHidden
	 * - state.$button_id.isDisabled
	 * - state.$button_id.isError
	 * - state.$button_id.isSuccess
	 * - state.$button_id.isProcessing
	 *
	 * @hook render_block
	 *
	 * @param string $block_content Block content.
	 * @param mixed  $block Block.
	 * @return mixed
	 */
	/**
	 * Resolve the CSS vars needed by the is-style-has-icon style and apply them
	 * to the rendered HTML. Sets --icon-url / --icon-color on the <a> element
	 * and data-icon-position on the outer .wp-block-button wrapper.
	 *
	 * @param string $block_content Block HTML.
	 * @param array  $attrs         Block attributes.
	 *
	 * @return string Modified block HTML.
	 */
	private function maybe_inject_icon_vars( string $block_content, array $attrs ): string {
		if ( empty( $attrs['hasIcon'] ) ) {
			return $block_content;
		}

		$icon_name = $attrs['iconName'] ?? '';
		if ( empty( $icon_name ) ) {
			return $block_content;
		}

		$library  = $attrs['iconLibrary'] ?? 'solid';
		$color    = $attrs['iconColor'] ?? 'currentColor';
		$position = $attrs['iconPosition'] ?? 'right';

		$icon_uri = \PRC\Platform\Icons\get_icon_as_data_uri( $library, $icon_name );

		// Pass 1: set CSS vars on the <a> element.
		$anchor_processor = new WP_HTML_Tag_Processor( $block_content );
		while ( $anchor_processor->next_tag() ) {
			if ( in_array( $anchor_processor->get_tag(), array( 'A', 'BUTTON' ), true ) ) {
				break;
			}
		}
		if ( in_array( $anchor_processor->get_tag(), array( 'A', 'BUTTON' ), true ) ) {
			$existing_style = $anchor_processor->get_attribute( 'style' ) ?? '';
			$separator      = '' !== $existing_style ? ';' : '';
			$icon_style     = sprintf(
				'--icon-url:url(%1$s);--icon-color:%2$s',
				$icon_uri,
				$color
			);
			$anchor_processor->set_attribute( 'style', $existing_style . $separator . $icon_style );
		}

		$block_content = $anchor_processor->get_updated_html();

		// Pass 2: add has-icon class and data-icon-position on the outer wrapper div.
		$wrapper_processor = new WP_HTML_Tag_Processor( $block_content );
		if ( $wrapper_processor->next_tag( 'div' ) ) {
			$existing_class = $wrapper_processor->get_attribute( 'class' ) ?? '';
			if ( ! $wrapper_processor->has_class( 'has-icon' ) ) {
				$wrapper_processor->set_attribute( 'class', trim( $existing_class . ' has-icon' ) );
			}
			$wrapper_processor->set_attribute( 'data-icon-position', esc_attr( $position ) );
		}

		return $wrapper_processor->get_updated_html();
	}

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$button_text = self::get_button_text( $block_content );

		$attributes = $block['attrs'];

		$target_namespace = array_key_exists( 'interactiveNamespace', $block['attrs'] ) ? $block['attrs']['interactiveNamespace'] : null;
		$has_subsumption  = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;

		// Inject icon CSS vars for is-style-has-icon before further processing.
		$block_content = $this->maybe_inject_icon_vars( $block_content, $attributes );

		$tag_processor = new WP_HTML_Tag_Processor( $block_content );
		while ( $tag_processor->next_tag() ) {
			if ( in_array( $tag_processor->get_tag(), array( 'A', 'BUTTON' ), true ) ) {
				break;
			}
		}

		$metadata = array_key_exists( 'metadata', $block['attrs'] ) ? $block['attrs']['metadata'] : null;

		$input_name = array_key_exists( 'metadata', $block['attrs'] ) && array_key_exists( 'name', $block['attrs']['metadata'] ) ? $block['attrs']['metadata']['name'] : null;

		// Generate a unique ID for the button if one is not provided either by anchor or input name.
		$button_id = array_key_exists( 'anchor', $block['attrs'] ) ? $block['attrs']['anchor'] : null;
		if ( null === $button_id && null !== $input_name ) {
			$button_id = sanitize_title( $input_name );
		}
		if ( null === $button_id ) {
			$button_id = wp_unique_id( 'core-button-' );
		}

		$tag_processor->set_attribute( 'id', $button_id );
		$tag_processor->set_attribute( 'data-core-button-original-text', $button_text );

		/**
		 * BLOCK BINDINGS:
		 *
		 * - url
		 * - source
		 * - valueToFetch
		 * - args
		 */
		if ( null !== $metadata ) {
			$bindings = array_key_exists( 'bindings', $metadata ) ? $metadata['bindings'] : null;
			if ( null !== $bindings ) {
				$bound_url      = array_key_exists( 'url', $bindings ) ? $bindings['url'] : array( 'args' => array() );
				$bound_url_src  = array_key_exists( 'source', $bound_url ) ? $bound_url['source'] : null;
				$bound_url_args = isset( $bound_url['args'] ) && is_array( $bound_url['args'] ) ? $bound_url['args'] : array();
				$args_value_fetch = array_key_exists( 'valueToFetch', $bound_url_args ) ? $bound_url_args['valueToFetch'] : null;
				// If the button is bound to a staff photo, add the download attribute.
				if ( 'prc-platform/staff-info' === $bound_url_src && 'photo-full' === $args_value_fetch ) {
					$tag_processor->set_attribute( 'download', true );
					$current_link = $tag_processor->get_attribute( 'href' );
					// If the button is bound to a staff member but does not have a proper href then we should add a hidden attribute.
					if ( empty( $current_link ) || '#' === $current_link ) {
						$tag_processor->set_attribute( 'hidden', true );
					}
				}
			}
		}

		/**
		 * INTERACTIVITY API DIRECTIVES:
		 * - data-wp-interactive
		 * - data-wp-on--click
		 * - data-wp-text
		 * - data-wp-class--is-error
		 * - data-wp-class--is-success
		 * - data-wp-class--is-processing
		 * - data-wp-class--is-disabled
		 *
		 * Note: These are generalized directives available to any consumer. For more specific form related directives, see the form-submit block.
		 */
		if ( $has_subsumption ) {
			$tag_processor->set_attribute( 'data-wp-interactive', $target_namespace );
			$tag_processor->set_attribute( 'data-wp-text', 'state.getButtonText' );
			$tag_processor->set_attribute( 'data-wp-on--click', 'actions.onButtonClick' );

			return $tag_processor->get_updated_html();
		}

		if ( null !== $target_namespace ) {
			wp_interactivity_state(
				$target_namespace,
				array(
					$button_id => array(
						'isHidden'     => false,
						'isDisabled'   => false,
						'isError'      => false,
						'isSuccess'    => false,
						'isProcessing' => false,
						'text'         => $button_text,
						'originalText' => $button_text,
					),
				)
			);

			// Reset the ID attribute to the newly generated $button_id.
			$tag_processor->set_attribute( 'id', $button_id );

			$tag_processor->set_attribute(
				'data-wp-interactive',
				$target_namespace
			);

			// Action Directives.
			$tag_processor->set_attribute(
				'data-wp-on--click',
				$target_namespace . '::actions.onButtonClick'
			);
			$tag_processor->set_attribute(
				'data-wp-on--mouseenter',
				$target_namespace . '::actions.onButtonMouseEnter'
			);

			// Inner Text Directive.
			$tag_processor->set_attribute(
				'data-wp-text',
				$target_namespace . '::state.' . $button_id . '.text'
			);

			// Classname Directives.
			$tag_processor->set_attribute(
				'data-wp-class--is-error',
				$target_namespace . '::state.' . $button_id . '.isError'
			);
			$tag_processor->set_attribute(
				'data-wp-class--is-success',
				$target_namespace . '::state.' . $button_id . '.isSuccess'
			);
			$tag_processor->set_attribute(
				'data-wp-class--is-processing',
				$target_namespace . '::state.' . $button_id . '.isProcessing'
			);
			$tag_processor->set_attribute(
				'data-wp-class--is-disabled',
				$target_namespace . '::state.' . $button_id . '.isDisabled'
			);

			// HTML Attribute Directives.
			$tag_processor->set_attribute(
				'data-wp-bind--hidden',
				$target_namespace . '::state.' . $button_id . '.isHidden'
			);

		}

		$block_content = $tag_processor->get_updated_html();

		return $block_content;
	}
}
