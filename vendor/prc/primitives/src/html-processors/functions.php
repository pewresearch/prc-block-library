<?php
/**
 * Procedural helpers for HTML processors.
 *
 * @package pewresearch/wp-html-processors
 */

declare(strict_types=1);

namespace PRC\Primitives\HTML_Processors;

/**
 * Processes a table block into an array of data. Cell text is taken from HTML content.
 *
 * Tested with the core/table block and flexible-table/table block.
 *
 * @param string $table_content The content of the table block.
 * @return array<string, mixed>|\WP_Error
 */
function parse_table_block_into_array( string $table_content ) {
	// Strip $table_content of any <!-- comments -->, which can interfer with the parser below.
	$table_content = preg_replace( '/<!--(.|\s)*?-->/', '', $table_content );
	$processor     = new TableProcessor( $table_content );
	return $processor->get_data();
}

/**
 * Processes a string of HTML and returns an array of headings.
 *
 * @param string $document_content HTML document.
 * @return array<int, array<string, mixed>>
 */
function parse_document_for_headings( string $document_content ) {
	// Strip $document_content of any <!-- comments -->, which can interfer with the parser below.
	$document_content = preg_replace( '/<!--(.|\s)*?-->/', '', $document_content );
	$processor        = new HeadingProcessor( $document_content );
	return $processor->process();
}

/**
 * Updates heading elements in a document to include ids derived from heading text.
 *
 * @param string $document_content HTML document.
 * @return string
 */
function update_document_headings_with_ids( string $document_content ) {
	$processor = new HeadingProcessor( $document_content );
	return $processor->process( true );
}
