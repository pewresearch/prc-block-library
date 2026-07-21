<?php
/**
 * Story Item AI feature and abilities.
 *
 * Registers title and blurb generators with the WordPress AI plugin. When enabled,
 * localizes editor config onto the story-item block script so the bundled edit UI
 * can show Generate with AI controls.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WordPress\AI\Abstracts\Abstract_Feature;
use WordPress\AI\Experiments\Experiment_Category;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Story Item AI feature class.
 */
class Story_Item_AI extends Abstract_Feature {

	/**
	 * Plugin file used to validate activation on the target site.
	 */
	private const PLUGIN_FILE = 'prc-block-library/prc-block-library.php';

	/**
	 * Generate blurb ability name.
	 */
	public const ABILITY_GENERATE_BLURB = 'prc-ai/generate-blurb';

	/**
	 * Generate title ability name.
	 */
	public const ABILITY_GENERATE_TITLE = 'prc-ai/generate-title';

	/**
	 * Blocks allowed to use these abilities.
	 *
	 * @var array<int, string>
	 */
	private const ALLOWED_BLOCKS = array( 'prc-block/story-item' );

	/**
	 * Maximum characters of post body text to send to the model.
	 */
	private const CONTENT_MAX_LENGTH = 15000;

	/**
	 * Feature identifier.
	 */
	public static function get_id(): string {
		return 'generate-blurb';
	}

	/**
	 * Loads feature metadata.
	 *
	 * @return array{label: string, description: string, category: string} Feature metadata.
	 */
	protected function load_metadata(): array {
		return array(
			'label'       => __( 'Story Item AI Generation', 'prc-block-library' ),
			'description' => __( 'Uses AI to generate a title or short blurb for a story item based on the linked post.', 'prc-block-library' ),
			'category'    => Experiment_Category::EDITOR,
		);
	}

	/**
	 * Registers the feature's hooks and functionality.
	 *
	 * This method is only called when the feature is enabled.
	 */
	public function register(): void {
		add_action( 'wp_abilities_api_init', array( $this, 'register_blurb_ability' ) );
		add_action( 'wp_abilities_api_init', array( $this, 'register_title_ability' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'localize_editor_config' ), 20 );
	}

	/**
	 * Localizes AI config onto the story-item editor script.
	 *
	 * @hook enqueue_block_editor_assets 20
	 */
	public function localize_editor_config(): void {
		$block_type = \WP_Block_Type_Registry::get_instance()->get_registered( 'prc-block/story-item' );
		if ( ! $block_type || empty( $block_type->editor_script_handles ) ) {
			return;
		}

		$handle = $block_type->editor_script_handles[0];

		wp_localize_script(
			$handle,
			'PRCStoryItemAI',
			array(
				'enabled'              => true,
				'abilityGenerateBlurb' => self::ABILITY_GENERATE_BLURB,
				'abilityGenerateTitle' => self::ABILITY_GENERATE_TITLE,
			)
		);
	}

	/**
	 * Register the generate-blurb ability with WP Abilities API.
	 *
	 * @hook wp_abilities_api_init
	 */
	public function register_blurb_ability(): void {
		wp_register_ability(
			self::ABILITY_GENERATE_BLURB,
			array(
				'label'               => __( 'Generate Blurb', 'prc-block-library' ),
				'description'         => __( 'Generates a short blurb for a story item based on the linked post.', 'prc-block-library' ),
				'category'            => 'data-retrieval',
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => array(
						'post_id' => array(
							'type'        => 'integer',
							'description' => 'The linked post ID.',
						),
						'site_id' => \PRC\Platform\AI\Utils\site_id_input_schema_property(),
					),
					'required'             => array( 'post_id' ),
					'additionalProperties' => false,
				),
				'output_schema'       => array(
					'type'       => 'object',
					'properties' => array(
						'error' => array(
							'type'        => 'string',
							'description' => 'An error message, if any.',
						),
						'blurb' => array(
							'type'        => 'string',
							'description' => 'The generated blurb text.',
						),
					),
				),
				'execute_callback'    => function ( $input ) {
					return $this->with_site(
						$input,
						function () use ( $input ) {
							return $this->execute_blurb( $input );
						}
					);
				},
				'permission_callback' => function ( $input = null ) {
					return $this->with_site(
						$input,
						function () {
							return current_user_can( 'edit_posts' );
						}
					);
				},
				'meta'                => array(
					'annotations'    => array(
						'instructions' => 'This ability generates a concise blurb for a Story Item block from the linked post title and content. Optionally pass site_id to run against a specific multisite blog; defaults to the content site (20). If this plugin is inactive on the target site, the ability returns plugin_inactive_on_site.',
						'readonly'     => true,
						'destructive'  => false,
						'idempotent'   => false,
					),
					'show_in_rest'   => true,
					'allowed_blocks' => self::ALLOWED_BLOCKS,
					'mcp'            => array(
						'public' => true,
						'type'   => 'tool',
					),
				),
			)
		);
	}

	/**
	 * Register the generate-title ability with WP Abilities API.
	 *
	 * @hook wp_abilities_api_init
	 */
	public function register_title_ability(): void {
		wp_register_ability(
			self::ABILITY_GENERATE_TITLE,
			array(
				'label'               => __( 'Generate Title', 'prc-block-library' ),
				'description'         => __( 'Generates a short, factual title/headline for a story item based on the linked post.', 'prc-block-library' ),
				'category'            => 'data-retrieval',
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => array(
						'post_id' => array(
							'type'        => 'integer',
							'description' => 'The linked post ID.',
						),
						'site_id' => \PRC\Platform\AI\Utils\site_id_input_schema_property(),
					),
					'required'             => array( 'post_id' ),
					'additionalProperties' => false,
				),
				'output_schema'       => array(
					'type'       => 'object',
					'properties' => array(
						'error' => array(
							'type'        => 'string',
							'description' => 'An error message, if any.',
						),
						'title' => array(
							'type'        => 'string',
							'description' => 'The generated title text.',
						),
					),
				),
				'execute_callback'    => function ( $input ) {
					return $this->with_site(
						$input,
						function () use ( $input ) {
							return $this->execute_title( $input );
						}
					);
				},
				'permission_callback' => function ( $input = null ) {
					return $this->with_site(
						$input,
						function () {
							return current_user_can( 'edit_posts' );
						}
					);
				},
				'meta'                => array(
					'annotations'    => array(
						'instructions' => 'This ability generates a short, factual headline/title for a Story Item block from the linked post title and content. Optionally pass site_id to run against a specific multisite blog; defaults to the content site (20). If this plugin is inactive on the target site, the ability returns plugin_inactive_on_site.',
						'readonly'     => true,
						'destructive'  => false,
						'idempotent'   => false,
					),
					'show_in_rest'   => true,
					'allowed_blocks' => self::ALLOWED_BLOCKS,
					'mcp'            => array(
						'public' => true,
						'type'   => 'tool',
					),
				),
			)
		);
	}

	/**
	 * Execute the generate-blurb ability.
	 *
	 * @param array<string, mixed> $input The input.
	 * @return array{error: string, blurb: string}
	 */
	private function execute_blurb( $input ) {
		$post_id = isset( $input['post_id'] ) ? (int) $input['post_id'] : 0;

		if ( $post_id <= 0 ) {
			return array(
				'error' => __( 'A valid post ID is required.', 'prc-block-library' ),
				'blurb' => '',
			);
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return array(
				'error' => __( 'You do not have permission to generate a blurb for this post.', 'prc-block-library' ),
				'blurb' => '',
			);
		}

		$post = get_post( $post_id );
		if ( ! $post instanceof \WP_Post ) {
			return array(
				'error' => __( 'Post not found.', 'prc-block-library' ),
				'blurb' => '',
			);
		}

		$prompt = $this->build_post_prompt( $post, $post_id );
		if ( is_array( $prompt ) ) {
			return array(
				'error' => $prompt['error'],
				'blurb' => '',
			);
		}

		$builder = wp_ai_client_prompt( $prompt );
		if ( is_wp_error( $builder ) ) {
			return array(
				'error' => 'AI generation failed: ' . $builder->get_error_message(),
				'blurb' => '',
			);
		}

		$blurb = $builder
			->using_system_instruction( $this->get_blurb_system_instructions() )
			->using_temperature( 0.4 )
			->using_model_preference( ...\WordPress\AI\get_preferred_models_for_text_generation() )
			->generate_text();

		if ( is_wp_error( $blurb ) ) {
			return array(
				'error' => 'AI generation failed: ' . $blurb->get_error_message(),
				'blurb' => '',
			);
		}

		return array(
			'error' => '',
			'blurb' => trim( (string) $blurb ),
		);
	}

	/**
	 * Execute the generate-title ability.
	 *
	 * @param array<string, mixed> $input The input.
	 * @return array{error: string, title: string}
	 */
	private function execute_title( $input ) {
		$post_id = isset( $input['post_id'] ) ? (int) $input['post_id'] : 0;

		if ( $post_id <= 0 ) {
			return array(
				'error' => __( 'A valid post ID is required.', 'prc-block-library' ),
				'title' => '',
			);
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return array(
				'error' => __( 'You do not have permission to generate a title for this post.', 'prc-block-library' ),
				'title' => '',
			);
		}

		$post = get_post( $post_id );
		if ( ! $post instanceof \WP_Post ) {
			return array(
				'error' => __( 'Post not found.', 'prc-block-library' ),
				'title' => '',
			);
		}

		$prompt = $this->build_post_prompt( $post, $post_id );
		if ( is_array( $prompt ) ) {
			return array(
				'error' => $prompt['error'],
				'title' => '',
			);
		}

		$builder = wp_ai_client_prompt( $prompt );
		if ( is_wp_error( $builder ) ) {
			return array(
				'error' => 'AI generation failed: ' . $builder->get_error_message(),
				'title' => '',
			);
		}

		$generated_title = $builder
			->using_system_instruction( $this->get_title_system_instructions() )
			->using_temperature( 0.3 )
			->using_model_preference( ...\WordPress\AI\get_preferred_models_for_text_generation() )
			->generate_text();

		if ( is_wp_error( $generated_title ) ) {
			return array(
				'error' => 'AI generation failed: ' . $generated_title->get_error_message(),
				'title' => '',
			);
		}

		return array(
			'error' => '',
			'title' => trim( (string) $generated_title ),
		);
	}

	/**
	 * Build the user prompt from a linked post.
	 *
	 * @param \WP_Post $post    Post object.
	 * @param int      $post_id Post ID.
	 * @return string|array{error: string}
	 */
	private function build_post_prompt( \WP_Post $post, int $post_id ) {
		$title     = html_entity_decode( wp_strip_all_tags( get_the_title( $post ) ), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
		$permalink = get_permalink( $post_id );
		if ( ! is_string( $permalink ) ) {
			$permalink = '';
		} elseif ( '' !== $permalink ) {
			$permalink = self::normalize_for_public_origin( $permalink );
		}

		$raw_source = '';
		if ( '' !== trim( (string) $post->post_excerpt ) ) {
			$raw_source = wp_strip_all_tags( $post->post_excerpt );
		} else {
			$raw_source = wp_strip_all_tags( $post->post_content );
		}

		$raw_source = preg_replace( '/\s+/u', ' ', $raw_source );
		if ( ! is_string( $raw_source ) ) {
			$raw_source = '';
		}
		if ( mb_strlen( $raw_source ) > self::CONTENT_MAX_LENGTH ) {
			$raw_source = mb_substr( $raw_source, 0, self::CONTENT_MAX_LENGTH );
		}

		if ( '' === $raw_source && '' === $title ) {
			return array(
				'error' => __( 'No post content available to generate from.', 'prc-block-library' ),
			);
		}

		return wp_sprintf(
			"Post title: %s\nURL: %s\n\nContent excerpt:\n%s",
			$title,
			$permalink,
			$raw_source
		);
	}

	/**
	 * System instructions for blurb generation.
	 *
	 * @return string
	 */
	private function get_blurb_system_instructions() {
		return 'You are an editor for Pew Research Center, a nonpartisan research organization.
Your task is to write a concise 1–2 sentence blurb that summarizes the linked research content and encourages readers to read more.

GUIDELINES:
- Use factual, nonpartisan language consistent with Pew Research Center style.
- Do not invent statistics or claims not supported by the provided text.
- Never use the word "Pew Research Center" in the blurb.
- Keep the blurb to 1–2 sentences.
- Do not include markdown, HTML, or bullet points.
- Output plain text only.';
	}

	/**
	 * System instructions for title generation.
	 *
	 * @return string
	 */
	private function get_title_system_instructions() {
		return 'You are an editor for Pew Research Center, a nonpartisan research organization.
Your task is to write a short, factual headline or title that accurately describes the linked research content.

GUIDELINES:
- Use factual, nonpartisan language consistent with Pew Research Center style.
- Do not invent statistics or claims not supported by the provided text.
- Never use the phrase "Pew Research Center" in the title.
- Keep the title concise — typically 8 to 15 words.
- Do not include markdown, HTML, punctuation at the end, or bullet points.
- Output plain text only.
- Write in headline case (capitalize major words).';
	}

	/**
	 * Swap the current site's home URL prefix for the public production origin when not in production.
	 *
	 * @param string $url Permalink or other absolute URL rooted at this site's home.
	 * @return string
	 */
	private static function normalize_for_public_origin( string $url ): string {
		if ( 'production' === wp_get_environment_type() ) {
			return $url;
		}

		$home_url       = trailingslashit( home_url() );
		$default_public = 'https://www.' . 'pewresearch.org'; // pragma: allowlist secret — public site origin for AI prompts, not an API key.
		$production_url = trailingslashit(
			apply_filters( 'prc_schema_seo_gsc_production_url', $default_public )
		);

		if ( $home_url !== $production_url && str_starts_with( $url, $home_url ) ) {
			return $production_url . substr( $url, strlen( $home_url ) );
		}

		return $url;
	}

	/**
	 * Run a callback on the requested target site.
	 *
	 * @param array|null $input    Ability input.
	 * @param callable   $callback Callback to run after site validation/switching.
	 * @return mixed
	 */
	private function with_site( $input, callable $callback ) {
		return \PRC\Platform\AI\Utils\with_site(
			\PRC\Platform\AI\Utils\resolve_site_id( is_array( $input ) ? $input : null ),
			self::PLUGIN_FILE,
			$callback
		);
	}
}
