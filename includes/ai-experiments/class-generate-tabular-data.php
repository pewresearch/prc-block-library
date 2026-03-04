<?php
/**
 * Generate Tabular Data Ability.
 *
 * Generates tabular data in markdown format based on a prompt by searching
 * Pew Research Center content and using AI to synthesize the results.
 *
 * @package PRC\Platform\Blocks\AI_Experiments
 */

namespace PRC\Platform\Blocks\AI_Experiments;

use WordPress\AiClient\AiClient;
use PRC\Platform\AI\Utils;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate Tabular Data ability class.
 */
class Generate_Tabular_Data {

	/**
	 * Ability name.
	 *
	 * @var string
	 */
	public static $ability_name = 'prc-ai/generate-tabular-data';

	/**
	 * Blocks that are allowed to use this ability.
	 *
	 * @var array
	 */
	public static $allowed_blocks = array( 'prc-block/table' );

	/**
	 * Register the generate-tabular-data ability with WP Abilities API.
	 *
	 * @hook wp_abilities_api_init
	 */
	public function register_ability() {
		wp_register_ability(
			self::$ability_name,
			array(
				'label'               => __( 'Generate Tabular Data', 'prc-block-library' ),
				'description'         => __( 'Generates tabular data in markdown format based on a prompt.', 'prc-block-library' ),
				'category'            => 'data-retrieval',
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => array(
						'data_description' => array(
							'type'        => 'string',
							'description' => 'Description of data to retrieve and format as a table.',
						),
						'from'             => array(
							'type'        => 'number',
							'description' => 'Start year of the data range (e.g., 2010).',
						),
						'to'               => array(
							'type'        => 'number',
							'description' => 'End year of the data range (e.g., 2020).',
						),
					),
					'required'             => array( 'data_description' ),
					'additionalProperties' => false,
				),
				'output_schema'       => array(
					'type'       => 'object',
					'properties' => array(
						'error' => array(
							'type'        => 'string',
							'description' => 'An error message, if any.',
						),
						'table' => array(
							'type'        => 'string',
							'description' => 'The generated tabular data in markdown format.',
						),
					),
				),
				'execute_callback'    => array( $this, 'execute' ),
				'permission_callback' => function () {
					return current_user_can( 'manage_options' );
				},
				'meta'                => array(
					'annotations'    => array(
						'instructions' => 'This ability searches Pew Research Center content matching the data description, then uses AI to generate a markdown table from the matched sources.',
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
	 * Get the system instructions for the AI.
	 *
	 * @return string The system instructions.
	 */
	private function get_system_instructions() {
		return 'You are a data analyst for Pew Research Center, a nonpartisan research organization.
Your task is to generate a markdown table from the provided source URLs.

GUIDELINES:
- Extract relevant data points from the source URLs provided.
- Format the data as a clean markdown table with headers.
- Use accurate data from the sources. Do not fabricate numbers or statistics.
- If the sources do not contain sufficient data to build the requested table, explain what is missing.
- Include column headers that clearly describe each data point.
- Use consistent formatting for numbers, percentages, and dates.

OUTPUT FORMAT:
- Return ONLY a valid markdown table.
- Do not include explanatory text before or after the table.
- Do not wrap the table in code blocks or backticks.
- Use standard markdown table syntax with pipes and dashes.';
	}

	/**
	 * Execute the ability: generate tabular data from prompt.
	 *
	 * @param array $input The input.
	 *
	 * @return array Tabular data in markdown format.
	 */
	public function execute( $input ) {
		$data_description = $input['data_description'] ?? '';
		$year_range_start = $input['from'] ?? null;
		$year_range_end   = $input['to'] ?? null;
		
		$search_term = Utils\refine_search_term( $data_description );

		if ( ! $search_term ) {
			return array(
				'error' => 'No data can be generated for request. Unable to determine search term.',
				'table' => '',
			);
		}

		$search_topics = Utils\refine_search_term_to_list_of_topics( $search_term );

		$query_args = array(
			's'              => $search_term,
			'post_type'      => array(
				'post',
				'short-read',
				'fact-sheet',
			),
			'posts_per_page' => 25,
			'fields'         => 'id',
			'tax_query'      => array(
				array(
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => wp_list_pluck( $search_topics, 'id' ),
				),
			),
		);

		if ( null !== $year_range_start && null !== $year_range_end ) {
			$query_args['date_query'] = array(
				array(
					'after'     => array(
						'year'  => $year_range_start,
						'month' => 1,
						'day'   => 1,
					),
					'before'    => array(
						'year'  => $year_range_end,
						'month' => 12,
						'day'   => 31,
					),
					'inclusive' => true,
				),
			);
		}

		$search_query = new \WP_Query( $query_args );

		if ( ! $search_query->have_posts() ) {
			return array(
				'error' => 'No data can be generated for request. No relevant posts found on Pew Research Center website.',
				'table' => '',
			);
		}

		// Create a list of urls to check against.
		$urls_to_check = array();
		foreach ( $search_query->posts as $post_id ) {
			$urls_to_check[] = get_permalink( $post_id );
		}

		// Replace bloginfo('url') with pewresearch.org, so that we're always checking live site urls.
		$urls_to_check = str_replace( get_bloginfo( 'url' ), 'https://www.pewresearch.org', $urls_to_check );

		// Shape the prompt with user request and source URLs.
		$prompt = wp_sprintf(
			"User request: \"%s\"\n\nSource URLs to check:\n%s",
			$data_description,
			implode( "\n", array_map( fn( $url ) => "- $url", $urls_to_check ) )
		);

		try {
			$table = AiClient::prompt( $prompt )
				->usingSystemInstruction( $this->get_system_instructions() )
				->usingTemperature( 0.3 )
				->generateText();

			return array(
				'error' => '',
				'table' => $table,
			);
		} catch ( \Exception $e ) {
			return array(
				'error' => 'AI generation failed: ' . $e->getMessage(),
				'table' => '',
			);
		}
	}
}
