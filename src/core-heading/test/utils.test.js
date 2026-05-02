/**
 * Internal dependencies
 */
import { getAnchorFromContent } from '../utils';

describe( 'getAnchorFromContent', () => {
	describe( 'plain text', () => {
		it( 'converts a plain heading to a lowercase slug', () => {
			expect( getAnchorFromContent( 'Hello World' ) ).toBe(
				'hello-world'
			);
		} );

		it( 'handles all-uppercase text', () => {
			expect( getAnchorFromContent( 'UPPER CASE HEADING' ) ).toBe(
				'upper-case-heading'
			);
		} );

		it( 'handles numbers in headings', () => {
			expect( getAnchorFromContent( '5 Things You Need to Know' ) ).toBe(
				'5-things-you-need-to-know'
			);
		} );

		it( 'strips special characters', () => {
			expect( getAnchorFromContent( "What's New?" ) ).toBe( 'whats-new' );
		} );
	} );

	describe( 'HTML tags', () => {
		it( 'strips a single inline wrapper tag', () => {
			expect(
				getAnchorFromContent( '<strong>My Heading</strong>' )
			).toBe( 'my-heading' );
		} );

		it( 'strips nested inline tags', () => {
			expect(
				getAnchorFromContent(
					'<em><strong>My Heading</strong></em>'
				)
			).toBe( 'my-heading' );
		} );

		it( 'inserts a word boundary at each tag so adjacent words are slug-separated', () => {
			// Tags are replaced with a space, so "Climate<em>Change</em>"
			// becomes "Climate Change" and slugifies to "climate-change".
			expect(
				getAnchorFromContent( 'Climate<em>Change</em>' )
			).toBe( 'climate-change' );
		} );

		it( 'handles anchor tags inside heading content', () => {
			expect(
				getAnchorFromContent(
					'Section <a href="#link">One</a> Overview'
				)
			).toBe( 'section-one-overview' );
		} );
	} );

	describe( 'HTML entities', () => {
		it( 'decodes &amp; before slugifying', () => {
			expect( getAnchorFromContent( 'Food &amp; Drink' ) ).toBe(
				'food-drink'
			);
		} );

		it( 'decodes &ndash; (en-dash)', () => {
			expect(
				getAnchorFromContent( 'Pros &ndash; Cons' )
			).toBe( 'pros-cons' );
		} );

		it( 'decodes numeric HTML entities', () => {
			expect( getAnchorFromContent( 'Part &#8212; Two' ) ).toBe(
				'part-two'
			);
		} );
	} );

	describe( 'whitespace handling', () => {
		it( 'trims leading and trailing whitespace', () => {
			expect( getAnchorFromContent( '  My Heading  ' ) ).toBe(
				'my-heading'
			);
		} );

		it( 'collapses internal multiple spaces', () => {
			expect( getAnchorFromContent( 'My   Heading' ) ).toBe(
				'my-heading'
			);
		} );

		it( 'handles mixed HTML and extra whitespace', () => {
			expect(
				getAnchorFromContent( '  <em>Hello</em>   World  ' )
			).toBe( 'hello-world' );
		} );
	} );

	describe( 'edge cases', () => {
		it( 'returns empty string for empty input', () => {
			expect( getAnchorFromContent( '' ) ).toBe( '' );
		} );

		it( 'returns empty string when called with no argument', () => {
			expect( getAnchorFromContent() ).toBe( '' );
		} );

		it( 'returns empty string for whitespace-only content', () => {
			expect( getAnchorFromContent( '   ' ) ).toBe( '' );
		} );

		it( 'returns empty string for HTML-tag-only content with no text', () => {
			expect( getAnchorFromContent( '<br>' ) ).toBe( '' );
		} );

		it( 'handles very long headings gracefully', () => {
			const heading = 'Word '.repeat( 20 ).trim();
			const result = getAnchorFromContent( heading );
			expect( typeof result ).toBe( 'string' );
			expect( result.length ).toBeGreaterThan( 0 );
		} );
	} );
} );
