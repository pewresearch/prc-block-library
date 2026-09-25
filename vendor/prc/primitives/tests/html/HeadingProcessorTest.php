<?php
/**
 * @package pewresearch/wp-html-processors
 */

declare(strict_types=1);

namespace PRC\Primitives\HTML_Processors\Tests;

use PHPUnit\Framework\TestCase;
use PRC\Primitives\HTML_Processors\HeadingProcessor;

use function PRC\Primitives\HTML_Processors\parse_document_for_headings;
use function PRC\Primitives\HTML_Processors\update_document_headings_with_ids;

/**
 * @covers \PRC\Primitives\HTML_Processors\HeadingProcessor
 */
final class HeadingProcessorTest extends TestCase {

	public function test_parse_document_for_headings_finds_h2_and_h3(): void {
		$html = '<div><h2 id="intro">Hello</h2><p>Text</p><h3>Sub</h3></div>';

		$headings = parse_document_for_headings( $html );

		$this->assertCount( 2, $headings );
		$this->assertSame( '2', $headings[0]['level'] );
		$this->assertSame( 'Hello', $headings[0]['content'] );
		$this->assertSame( 'intro', $headings[0]['id'] );
		$this->assertSame( '3', $headings[1]['level'] );
	}

	public function test_update_document_headings_with_ids_adds_missing_ids(): void {
		$html = '<section><h2>My Title</h2></section>';

		$updated = update_document_headings_with_ids( $html );

		$this->assertStringContainsString( 'id="my-title"', $updated );
	}

	public function test_heading_processor_respects_no_toc_attribute(): void {
		$html = '<div><h2 no-toc="true">Skip</h2><h2>Keep</h2></div>';

		$processor = new HeadingProcessor( $html );
		$headings  = $processor->process();

		$this->assertCount( 1, $headings );
		$this->assertSame( 'Keep', $headings[0]['content'] );
	}
}
