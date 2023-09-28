<?php
namespace PRC\Platform\Blocks;
use WP_Error;

/**
 * The core plugin class, responsible for loading all dependencies, defining
 * the plugin version, and registering the hooks that define the plugin.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    PRC\Platform\Blocks
 * @author     Seth Rubenstein <srubenstein@pewresearch.org>
 */
class Library {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the platform as initialized by hooks.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		$this->version = '1.0.0';
		$this->plugin_name = 'prc-block-library';

		$this->load_dependencies();
		$this->gutenberg_config();
		$this->define_apple_news_hooks();
		$this->define_story_item_hooks();
		$this->define_attachment_info_hooks();
		$this->define_table_of_contents_hooks();
		$this->define_report_materials_hooks();
	}

	/**
	 * Include a file from the plugin's includes directory.
	 * @param mixed $block_file_name
	 * @return WP_Error|void
	 */
	private function include_block($block_file_name) {
		$block_file_path = 'blocks/' . $block_file_name . '/' . $block_file_name . '.php';
		$apple_news_component_file_path = 'blocks/' . $block_file_name . '/apple-news.php';
		if ( file_exists( plugin_dir_path( dirname(__FILE__) ) . $block_file_path ) ) {
			// If Apple News component for this block exists load it and register it for the apple new helper later.
			if ( file_exists( plugin_dir_path( dirname(__FILE__) ) . $apple_news_component_file_path ) && class_exists('Apple_Exporter\Components')) {
				require_once plugin_dir_path( dirname(__FILE__) ) . $apple_news_component_file_path;
			}
			require_once plugin_dir_path( dirname(__FILE__) ) . $block_file_path;
		} else {
			return new WP_Error( 'prc_block_library_missing_block', __( 'Block missing.', 'prc' ) );
		}
	}

	/**
	 * Include all blocks from the plugin's /blocks directory.
	 * @return void
	 */
	private function load_blocks() {
		$block_files = glob( PRC_BLOCK_LIBRARY_DIR . '/blocks/*', GLOB_ONLYDIR );
		foreach ($block_files as $block) {
			$block = basename($block);
			$loaded = $this->include_block($block);
			if ( is_wp_error( $loaded ) ) {
				error_log( $loaded->get_error_message() );
			}
		}
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {
		// Load plugin loading class.
		require_once plugin_dir_path( dirname(__FILE__) ) . '/includes/class-loader.php';

		$this->load_blocks();

		// Initialize the loader.
		$this->loader = new Loader();
	}

	private function gutenberg_config() {
		// Remove the "Block Directory" from the block inserter.
		remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );

		// Disable loading remote block patterns, we only want local or database block patterns.
		$this->loader->add_filter(
			'should_load_remote_block_patterns',
			$this,
			'disable_remote_block_patterns',
			10,
			1
		);
		// Only load assets when a block is used. This allows us to unregister core block styles and use our own.
		$this->loader->add_filter(
			'should_load_separate_core_block_assets',
			$this,
			'load_core_block_assets_separately',
			10,
			1
		);

		$this->loader->add_filter('block_categories_all', $this, 'register_block_categories', 10, 2);
		$this->loader->add_filter('safe_style_css', $this, 'allowed_inline_styles', 10, 1);
		$this->loader->add_filter('wp_kses_allowed_html', $this, 'allowed_html_tags', 10, 2);
	}

	private function define_story_item_hooks() {
		$story_item = new Story_Item( $this->version );
		$this->loader->add_filter( 'newsletterglue_allowed_block_list', $story_item, 'allow_in_newsletter_glue', 10, 1 );
		$this->loader->add_filter( 'prc_return_story_item', $story_item, 'return_story_item', 10, 1 );
		$this->loader->add_action( 'prc_do_story_item', $story_item, 'do_story_item', 10, 1 );
		$this->loader->add_action( 'prc_core_on_stub_update', $story_item, 'clear_index_cache_on_stub_update', 10, 1 );
		$this->loader->add_action( 'init', $story_item, 'block_init' );
	}

	private function define_attachment_info_hooks() {
		$attachment_info = new Attachment_Info( $this->version, null );
		$this->loader->add_action( 'init', $attachment_info, 'block_init' );
	}

	private function define_table_of_contents_hooks() {
		$table_of_contents = new Table_Of_Contents( $this->version );
		$this->loader->add_action( 'init', $table_of_contents, 'block_init' );
		$this->loader->add_action( 'enqueue_block_assets', $table_of_contents, 'enqueue_custom_heading_and_dropdown_styles' );
	}

	private function define_report_materials_hooks() {
		$table_of_contents = new Report_Materials( $this->version );
		$this->loader->add_action( 'init', $table_of_contents, 'block_init' );
	}

	public function disable_remote_block_patterns($should_load_remote) {
		return false;
	}

	public function load_core_block_assets_separately($load_separate_assets) {
		return true;
	}

	/**
	 * @hook block_categories_all
	 */
	/**
	 * Establishes new block categories for the block library.
	 * @param mixed $block_categories
	 * @param mixed $block_editor_context
	 * @return mixed
	 */
	public function register_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			$block_categories,
			array(
				array(
					'slug'  => 'content-curation',
					'title' => __( 'Content Curation', 'prc-block-library-categories' ),
				),
				array(
					'slug'  => 'marketing',
					'title' => __( 'Marketing', 'prc-block-library-categories' ),
				),
				array(
					'slug' => 'editorial-product',
					'title' => __( 'Editorial Product', 'prc-block-library-categories' ),
					'icon' => 'lightbulb'
				)
			)
		);
	}

	/**
	 * Filter the allowed style attributes for sanitization.
	 * @hook safe_style_css
	 *
	 * @param mixed $styles
	 * @return mixed
	 */
	public function allowed_inline_styles( $styles ) {
		$styles[] = 'container';
		$styles[] = '@container';
		return $styles;
	}

	/**
	 * Filter the allowed html tags and attributes for sanitization.
	 * @hook wp_kses_allowed_html
	 *
	 * @param array $allowed_tags Allowed tags.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags, $context ) {
		$allowed_tags['iframe'] = array(
			'class' => true,
			'loading' => true,
			'src' => true,
			'width' => true,
			'height' => true,
			'frameborder' => true,
			'allowfullscreen' => true,
			'title' => true,
			'style' => true,
		);
		$allowed_tags['input'] = array(
			'class' => true,
			'id' => true,
			'name' => true,
			'type' => true,
			'value' => true,
			'placeholder' => true,
			'required' => true,
			'disabled' => true,
			'style' => true,
		);
		$allowed_tags['div']['style']  = true;
		$allowed_tags['img']['srcset'] = true;
		$allowed_tags['img']['sizes']  = true;
		$allowed_tags['picture']       = true;
		$allowed_tags['source']        = array(
			'srcset' => true,
			'media'  => true,
			'type'   => true,
			'height' => true,
			'width'  => true,
		);

		// Add SVG Support
		// @TODO: Is this still necessary with 10up's SVG plugin? - @sethrubenstein
		$allowed_tags['svg']  = array(
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
		);
		$allowed_tags['path'] = array(
			'd'    => array(),
			'fill' => array(),
		);
		$allowed_tags['rect'] = array(
			'x'      => array(),
			'y'      => array(),
			'width'  => array(),
			'height' => array(),
			'fill'   => array(),
		);
		// End SVG Support

		$allowed_tags['a'] = array_merge(
			array(
				'aria-controls' => true,
				'aria-selected' => true,
				'aria-role' => true,
			),
			$allowed_tags['a']
		);
		return $allowed_tags;
	}

	private function define_apple_news_hooks() {
		$this->loader->add_filter( 'apple_news_exporter_content', $this, 'apple_news_exporter_content_helper', 10, 2 );
		$this->loader->add_filter( 'apple_news_generate_json', $this, 'apple_news_generate_json_template', 10, 2 );
	}

	/**
	 * Apple News helper exporter content, for all the blocks that need a little help.
	 * @hook apple_news_exporter_content
	 * @param mixed $content
	 * @param mixed $post_id
	 * @return string
	 */
	public function apple_news_exporter_content_helper($content, $post_id) {
		// Get correct image width
		$content = preg_replace(
			'/\.(jpg|jpeg|png|gif|svg|webp).*?\"(.*)width=\"(\d{3})\"/i',
			'.${1}?w=${3}"${2}width="${3}"',
			$content
		);

		// Fix image alignment and anchoring for Apple News plugin
		$content = preg_replace(
			'/(<figure.*class=\".*align)(right|left)(.*\<img)(.*\<\/figure\>)/i',
			'${1}${2}${3} align="${2}"${4}',
			$content
		);

		$content = preg_replace(
			'/<div class=\"wp-block-image\"><figure.*?class=\"(\X*?)\"><a.*?>(\X*?)<\/a>/i',
			'<div class="wp-block-image"><figure class="${1}">${2}',
			$content
		);

		// Transform core quote blocks to Apple News pullquotes
		$content = preg_replace(
			'/<figure.*?class=\"wp-block-prc-block-pullquote\X*?\">\X*?<blockquote>(\X*?)<\/blockquote>\X*?<\/figure>/i',
			'<blockquote class="apple-news-pullquote">${1}</blockquote>',
			$content
		);

		// Convert "big number" styled paragraphs to sections
		$content = preg_replace_callback(
			'/<p.*class=\".*is-style-has-big-number.*?\">(.*)<\/p>/i',
			function ($m) {
				static $count = 1;
				return '<section class="is-style-has-big-number" data-count="' .
					$count++ .
					'">' .
					$m[1] .
					'</section>';
			},
			$content
		);

		$move = preg_split(
			'/(<div.*?class=.*?wp-block-prc-block-collapsible\X*?<\/div>)/i',
			$content,
			-1,
			PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE
		);

		// segregate content and then merge
		$new = [];
		$collapsibles = [];

		foreach ($move as $v) {
			if (preg_match('/wp-block-prc-block-collapsible/i', $v)) {
				$collapsibles[] = $v;
			} else {
				$new[] = $v;
			}
		}

		$content = implode('', array_merge($new, $collapsibles));

		return $content;
	}

	public function apple_news_newsletter_promo_json_string() {
		$newsletter = '
			[
			{
			"role": "image",
			"URL": "https://assets.pewresearch.org/email/newsletter_icon.png",
			"layout": {
				"margin" : {
				"top": 40,
				"bottom": 10
				},
				"columnStart": 0,
				"columnSpan": 15,
				"maximumContentWidth": "50pt"
			}
			},
			{
			"role": "heading2",
			"text": "<a href=\"https://mailchi.mp/pewresearch/weekly-newsletter\">Sign up for our weekly newsletter</a>",
			"format": "html",
			"textStyle":       {
				"fontName": "Helvetica-Bold",
					"fontSize": 18,
					"tracking": 0,
					"lineHeight": 20,
					"textColor": "#2a2a2a",
					"textAlignment": "center",
					"linkStyle" : {
					"textColor": "#2a2a2a",
					"underline": false
					}
				},
			"layout": {
				"margin": {
				"top": 0,
				"bottom": 5
				}
			}
			},
			{
			"role": "heading4",
			"text": "Our latest data, delivered Saturdays",
			"format": "html",
			"textStyle":       {
				"fontName": "Helvetica",
					"fontSize": 18,
					"tracking": 0,
					"lineHeight": 20,
					"textColor": "#888",
					"textAlignment": "center"
				},
			"layout": {
				"margin": {
				"top": 0,
				"bottom": 15
				}
			}
			},
			{
			"role": "link_button",
			"text": "Sign Up",
			"URL": "https://mailchi.mp/pewresearch/weekly-newsletter",
			"style": "default-link-button",
			"layout": "link-button-layout",
			"textStyle": "default-link-button-text-style"
			}
			]
		';
		return $newsletter;
	}

	public function apple_news_sub_title($post_id) {
		$sub_headline = get_post_meta($post_id, 'sub_headline', true);
		$sub_title = get_post_meta($post_id, 'sub_title', true);
		$text_value = null;
		if (!empty($sub_headline)) {
			$text_value = $sub_headline;
		} elseif (!empty($sub_title)) {
			$text_value = $sub_title;
		}

		if ( null !== $text_value ) {
			return [
				'role' => 'intro',
				'text' => $text_value,
				'textStyle' => [
					'fontName' => 'Georgia-Italic',
					'fontSize' => 24,
					'tracking' => 0,
					'lineHeight' => 36,
					'textColor' => '#2a2a2a',
					'hyphenation' => false,
					'fontScaling' => false,
					'conditional' => [
						[
							'fontSize' => 20,
							'lineHeight' => 24,
							'conditions' => [
								[
									'minViewportWidth' => 0,
								],
							],
						],
						[
							'fontSize' => 24,
							'lineHeight' => 36,
							'conditions' => [
								[
									'minViewportWidth' => 769,
								],
							],
						],
					],
				],
				'layout' => [
					'margin' => [
						'top' => 12,
						'bottom' => 12,
					],
				],
			];
		}

		return false;
	}

	/**
	 * Sets up the default Apple News format for posts via JSON
	 * @hook apple_news_generate_json
	 */
	public function apple_news_generate_json_template($json, $post_id) {
		$conditional_anchor_margin = [
			[
				'margin' => [
					'top' => 12,
					'bottom' => 12,
				],
				'conditions' => [
					[
						'minViewportWidth' => 0,
					],
				],
			],
			[
				'margin' => [
					'top' => 0,
					'bottom' => 0,
				],
				'conditions' => [
					[
						'minViewportWidth' => 769,
					],
				],
			],
		];

		$json['layout']['columns'] = 15;

		// Prepare additional components
		$date = [
			'role' => 'byline',
			'text' => get_the_time('F j, Y', $post_id),
			'textStyle' => [
				'textAlignment' => 'left',
				'fontName' => 'Helvetica',
				'fontSize' => 14,
				'lineHeight' => 19,
				'tracking' => 0,
				'textColor' => '#5c5c5c',
				'textTransform' => 'uppercase',
			],
			'layout' => [
				'margin' => [
					'top' => 36,
				],
			],
		];

		// Check for sub-title and splice into components list if necessary
		$sub_title = $this->apple_news_sub_title($post_id);
		if (false !== $sub_title) {
			array_splice($json['components'], 1, 0, [$sub_title]);
		}

		array_unshift($json['components'], $date);

		// Add default weekly newsletter promo
		$json['components'] = array_merge(
			$json['components'],
			json_decode($this->apple_news_newsletter_promo_json_string(), true)
		);

		$json['componentLayouts']['link-button-layout'] = [
			'margin' => [
				'bottom' => 20,
			],
			'padding' => [
				'top' => 10,
				'bottom' => 10,
				'left' => 15,
				'right' => 15,
			],
		];

		$json['componentStyles']['default-link-button'] = [
			'backgroundColor' => '#000',
			'mask' => [
				'type' => 'corners',
				'radius' => 0,
			],
		];

		$json['componentTextStyles']['default-link-button-text-style'] = [
			'textColor' => '#FFF',
			'fontName' => 'Helvetica-Bold',
			'fontSize' => 18,
		];

		$json['textStyles']['default-tag-bignumstrong'] = [
			'fontName' => 'Helvetica-Bold',
			'fontSize' => 22,
			'lineHeight' => 32,
			'tracking' => -0.025,
			'linkStyle' => [
				'textColor' => '#346ead',
				'underline' => true,
			],
		];

		$json['componentTextStyles']['body-bignumber'] = [
			'textAlignment' => 'left',
			'fontName' => 'Georgia',
			'fontSize' => 18,
			'tracking' => 0,
			'lineHeight' => 32,
			'textColor' => '#2a2a2a',
			'linkStyle' => [
				'textColor' => '#346ead',
				'underline' => true,
			],
			'dropCapStyle' => [
				'numberOfLines' => 2,
				'fontName' => 'Helvetica-Bold',
				'textColor' => '#ec9f2e',
				'padding' => 1,
				'backgroundColor' => '#fff',
				'numberOfCharacters' => 1,
			],
			'paragraphSpacingBefore' => 22,
			'paragraphSpacingAfter' => 22,
		];

		$json['componentTextStyles']['body-bignumber-2-digit'] = [
			'textAlignment' => 'left',
			'fontName' => 'Georgia',
			'fontSize' => 18,
			'tracking' => 0,
			'lineHeight' => 32,
			'textColor' => '#2a2a2a',
			'linkStyle' => [
				'textColor' => '#346ead',
				'underline' => true,
			],
			'dropCapStyle' => [
				'numberOfLines' => 3,
				'fontName' => 'Helvetica-Bold',
				'textColor' => '#ec9f2e',
				'padding' => 0,
				'backgroundColor' => '#fff',
				'numberOfCharacters' => 2,
				'numberOfRaisedLines' => 0,
			],
			'paragraphSpacingBefore' => 22,
			'paragraphSpacingAfter' => 22,
		];

		$json['metadata']['title'] = get_the_title($post_id);
		$json['metadata']['excerpt'] = preg_replace(
			'/\&hellip\;/i',
			'...',
			get_the_excerpt($post_id)
		);

		$json['componentLayouts']['anchor-layout-pullquote'] = [
			'columnStart' => 0,
			'columnSpan' => 15,
			'padding' => [
				'left' => 12,
				'bottom' => 12,
			],
			'margin' => [
				'top' => 12,
				'bottom' => 12,
			],
		];

		$json['componentLayouts']['full-width-image-no-bleed'] = [
			'columnStart' => 0,
			'columnSpan' => 15,
			'margin' => [
				'top' => 24,
				'bottom' => 24,
			],
			'ignoreDocumentMargin' => false,
		];

		$json['componentLayouts']['anchor-layout-right-4-col'] = [
			'columnStart' => 5,
			'columnSpan' => 10,
			'conditional' => $conditional_anchor_margin,
		];

		$json['componentLayouts']['anchor-layout-right-2-col'] = [
			'columnStart' => 10,
			'columnSpan' => 5,
			'conditional' => $conditional_anchor_margin,
		];

		$json['componentLayouts']['anchor-layout-left-4-col'] = [
			'columnStart' => 0,
			'columnSpan' => 10,
			'conditional' => $conditional_anchor_margin,
		];

		$json['componentLayouts']['anchor-layout-left-2-col'] = [
			'columnStart' => 0,
			'columnSpan' => 5,
			'conditional' => $conditional_anchor_margin,
		];

		$json['componentLayouts']['anchor-layout-left'] = [
			'columnStart' => 0,
			'columnSpan' => 7,
			'conditional' => $conditional_anchor_margin,
		];

		$json['componentLayouts']['callout-layout-full'] = [
			'columnStart' => 0,
			'columnSpan' => 15,
			'margin' => [
				'bottom' => 20,
				'top' => 20,
			],
			'padding' => [
				'bottom' => 8,
				'left' => 8,
				'right' => 8,
				'top' => 0,
			],
		];

		$json['componentLayouts']['callout-layout-right-2-col'] = [
			'columnStart' => 10,
			'columnSpan' => 5,
			'margin' => [
				'bottom' => 20,
				'top' => 20,
			],
			'padding' => [
				'bottom' => 8,
				'left' => 8,
				'right' => 8,
				'top' => 0,
			],
		];

		if (array_key_exists('full-width-image', $json['componentLayouts'])) {
			$json['componentLayouts']['full-width-image']['columnStart'] = 0;
			$json['componentLayouts']['full-width-image']['columnSpan'] = 15;
		}

		if (array_key_exists('anchor-layout-right', $json['componentLayouts'])) {
			$json['componentLayouts']['anchor-layout-right']['columnStart'] = 8;
			$json['componentLayouts']['anchor-layout-right']['columnSpan'] = 7;
			$json['componentLayouts']['anchor-layout-right'][
				'conditional'
			] = $conditional_anchor_margin;
		}

		if (array_key_exists('byline-layout', $json['componentLayouts'])) {
			$json['componentLayouts']['byline-layout']['columnSpan'] = 15;
		}

		if (
			!array_key_exists(
				'default-blockquote-left',
				$json['componentTextStyles']
			)
		) {
			$json['componentTextStyles']['default-blockquote-left'] = [
				'fontName' => 'Helvetica',
				'fontSize' => 17,
				'textColor' => '#2a2a2a',
				'lineHeight' => 28,
				'textAlignment' => 'left',
				'tracking' => 0,
				'linkStyle' => [
					'textColor' => '#346ead',
					'underline' => true,
				],
				'paragraphSpacingBefore' => 16,
				'paragraphSpacingAfter' => 16,
			];
		}

		if ( !array_key_exists('default-pullquote', $json['componentTextStyles']) ) {
			$json['componentTextStyles']['default-pullquote'] = [
				"fontName" => "Marion-Regular",
				"fontSize" => 32,
				"textColor" => "#2a2a2a",
				"textTransform" => "none",
				"lineHeight" => 45,
				"textAlignment" => "left",
				"tracking" => -0.01,
				"fontScaling" => false,
				"conditional" => [
					[
						"fontSize" => 28,
						"lineHeight" => 36,
						"conditions" => [["minViewportWidth" => 0]]
					],
					[
						"fontSize" => 32,
						"lineHeight" => 45,
						"conditions" => [["minViewportWidth" => 769]]
					]
				]
			];
		}

		if (!array_key_exists('blockquote-layout', $json['componentLayouts'])) {
			$json['componentLayouts']['blockquote-layout'] = [
				'contentInset' => [
					'bottom' => true,
					'left' => true,
					'right' => true,
					'top' => true,
				],
			];
		}

		$components = [];
		for ($i = 0; $i < count($json['components']); $i++) {
			$new = [];
			$component = $json['components'][$i];
			// make pullquotes full width
			if (
				isset($component['textStyle']) &&
				in_array($component['textStyle'], array('default-pullquote', 'default-pullquote-left', 'default-pullquote-right'))
			) {
				$component['layout'] = 'anchor-layout-pullquote';
			}

			if (
				isset($component['textStyle']) &&
				($component['textStyle'] == 'body-bignumber' || stripos($component['text'], 'class="bignumber"') !== false)
			) {
				$m = preg_split(
					'/<p class=\"bignumber\">/',
					$component['text'],
					-1,
					PREG_SPLIT_NO_EMPTY
				);

				//split component if more than one big number grafs
				if (count($m) > 1) {
					for ($j = 0; $j < count($m); $j++) {
						if ($j == 0) {
							$component['text'] = wpautop($m[$j]);
						} else {
							$new_component = [
								'role' => 'body',
								'layout' => 'body-layout',
								'textStyle' => 'body-bignumber',
								'text' => wpautop($m[$j]),
								'format' => 'html',
							];
							array_push($new, $new_component);
						}
					}
				}
			} elseif (
				($component['components'][0]['role'] ?? $component['role']) ==
				'photo'
			) {
				//make non-featured image respect document margins
				$url = get_the_post_thumbnail_url($post_id, 'full');
				$layout =
					$component['components'][0]['layout'] ?? $component['layout'];

				if (
					$url !=
						($component['components'][0]['URL'] ?? $component['URL']) &&
					'full-width-image' === $layout
				) {
					if ($component['role'] == 'container') {
						$component['layout']['ignoreDocumentMargin'] = true;
					} else {
						$component['layout'] = 'full-width-image-no-bleed';
					}
				}

				// change column span for various images sizes
				if (
					$component['role'] == 'photo' &&
					$component['layout'] == 'anchor-layout-right'
				) {
					$width = substr($component['URL'], -3);
					if (intval($width) == 200) {
						$component['layout'] = 'anchor-layout-right-2-col';
					}
					if (intval($width) == 420) {
						$component['layout'] = 'anchor-layout-right-4-col';
					}
				}

				// use full-res image
				if ($component['role'] == 'container') {
					$component['components'][0]['URL'] = preg_replace(
						'/\.(jpg|jpeg|png|gif|svg).*/i',
						'.${1}',
						$component['components'][0]['URL']
					);
				} else {
					$component['URL'] = preg_replace(
						'/\.(jpg|jpeg|png|gif|svg).*/i',
						'.${1}',
						$component['URL']
					);
				}
			}
			array_push($components, $component);
			array_splice($components, count($components) + 1, 0, $new);
		}
		$json['components'] = $components;
		return $json;
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    PRC_Platform_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
