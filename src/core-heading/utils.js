/**
 * WordPress Dependencies
 */
import { decodeEntities } from '@wordpress/html-entities';
import { cleanForSlug } from '@wordpress/url';

/**
 * Derives a URL-friendly anchor slug from raw heading block content.
 *
 * 1. Decodes HTML entities (e.g. &amp; → &)
 * 2. Strips all HTML tags, replacing them with a space so adjacent words
 *    around an inline element boundary don't run together.
 * 3. Collapses consecutive whitespace and trims leading/trailing space.
 * 4. Delegates to `cleanForSlug` which lowercases, strips non-alphanumeric
 *    characters, and normalises dashes.
 *
 * @param {string} content Raw heading `content` attribute (may contain HTML).
 * @return {string} Slug-safe anchor string, or an empty string when the
 *                  heading yields no meaningful text.
 */
export function getAnchorFromContent( content = '' ) {
	const plainText = decodeEntities( String( content ) )
		.replace( /<[^>]+>/g, ' ' )
		.replace( /\s+/g, ' ' )
		.trim();

	return cleanForSlug( plainText );
}
