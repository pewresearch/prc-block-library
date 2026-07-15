<?php
/**
 * Generate Blurb Ability.
 *
 * Generates a short editorial blurb for a Story Item block based on the linked post.
 *
 * @package PRC\Platform\Blocks\AI_Features
 */

namespace PRC\Platform\Blocks\AI_Features;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate Blurb ability class.
 */
class Generate_Blurb {

	/**
	 * Plugin file used to validate activation on the target site.
	 *
	 * @var string
	 */
	private const PLUGIN_FILE = 'prc-block-library/prc-block-library.php';

	/**
	 * Ability name.
	 *
	 * @var string
	 */
	public static $ability_name = 'prc-ai/generate-blurb';

	/**
	 * Blocks that are allowed to use this ability.
	 *
	 * @var array<int, string>
	 */
	public static $allowed_blocks = array( 'prc-block/story-item' );

	/**
	 * Maximum characters of post body text to send to the model.
	 */
	private const CONTENT_MAX_LENGTH = 15000;

	/**
	 * Register the generate-blurb ability with WP Abilities API.
	 *
	 * @hook wp_abilities_api_init
	 */
	public function register_ability() {
		wp_register_ability(
			self::$ability_name,
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
							return $this->execute( $input );
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
					'allowed_blocks' => self::$allowed_blocks,
					'mcp'            => array(
						'public' => true,
						'type'   => 'tool',
					),
				),
			)
		);
	}

	/**
	 * System instructions for the model.
	 *
	 * @return string
	 */
	private function get_system_instructions() {
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
	 * Execute the ability.
	 *
	 * @param array<string, mixed> $input The input.
	 * @return array{error: string, blurb: string}
	 */
	public function execute( $input ) {
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

		$title   = html_entity_decode( wp_strip_all_tags( get_the_title( $post ) ), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
		$permalink = get_permalink( $post_id );
		if ( ! is_string( $permalink ) ) {
			$permalink = '';
		} elseif ( '' !== $permalink ) {
			$permalink = AI_Prompt_Permalink::normalize_for_public_origin( $permalink );
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
				'error' => __( 'No post content available to generate a blurb.', 'prc-block-library' ),
				'blurb' => '',
			);
		}

		$prompt = wp_sprintf(
			"Post title: %s\nURL: %s\n\nContent excerpt:\n%s",
			$title,
			$permalink,
			$raw_source
		);

		$builder = wp_ai_client_prompt( $prompt );
		if ( is_wp_error( $builder ) ) {
			return array(
				'error' => 'AI generation failed: ' . $builder->get_error_message(),
				'blurb' => '',
			);
		}

		$blurb = $builder
			->using_system_instruction( $this->get_system_instructions() )
			->using_temperature( 0.4 )
			->using_model_preference( ...\WordPress\AI\get_preferred_models_for_text_generation() )
			->generate_text();

		if ( is_wp_error( $blurb ) ) {
			return array(
				'error' => 'AI generation failed: ' . $blurb->get_error_message(),
				'blurb' => '',
			);
		}

		$blurb = trim( (string) $blurb );

		return array(
			'error' => '',
			'blurb' => $blurb,
		);
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
