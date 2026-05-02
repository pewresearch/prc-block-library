# Core Accordion Extension

Extends the WordPress core/accordion block (introduced in WP 6.8) with PRC Platform-specific functionality.

## Features

### 1. FAQPage Structured Data (Schema.org)

Adds optional FAQPage schema markup for better SEO. When enabled, the accordion is marked up as a FAQ with proper Question/Answer pairs.

**Usage:**
1. Insert a core/accordion block
2. In the block settings sidebar, find "Structured Data" panel
3. Toggle "Enable FAQPage Schema" to add schema.org markup

**Generated Markup:**
```html
<div itemscope itemtype="https://schema.org/FAQPage">
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <button itemprop="name">Question Title</button>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">Answer content</p>
    </div>
  </div>
</div>
```

### 2. Entity-as-Iframe Support

Automatically synchronizes accordion state with embedded entity-as-iframe blocks. When an accordion containing an entity iframe is opened/closed, the iframe's `isActive` state is toggled accordingly.

**How it works:**
- Uses WordPress Interactivity API
- Queries for `.wp-block-prc-block-entity-as-iframe > iframe` within accordion panels
- Toggles the entity iframe store state on accordion toggle events
- No manual configuration required - works automatically

## Architecture

### Block Structure

Core accordion uses a 3-level nested structure:

```
core/accordion (parent container)
├── core/accordion-content (individual item wrapper)
│   ├── core/accordion-header (clickable title)
│   └── core/accordion-panel (expandable content)
```

### Extension Pattern

This extension follows the PRC Platform pattern for extending core blocks:

1. **JavaScript Extension** (`index.js`)
   - Adds custom attributes via `blocks.registerBlockType` filter
   - Adds custom controls via `editor.BlockEdit` filter
   - Does not replace core functionality

2. **PHP Extension** (`class-core-accordion.php`)
   - Filters `render_block` to add custom markup
   - Registers custom view script for Interactivity API
   - Preserves all core block functionality

3. **Interactivity API** (`view.js`)
   - Extends core accordion's Interactivity API store
   - Adds custom behaviors without breaking core functionality

## Files

- `block.json` - Block metadata (registered under `prc-block/core-accordion`)
- `index.js` - Editor extensions (structured data toggle)
- `view.js` - Interactivity API extensions (entity iframe support)
- `style.scss` - Minimal additional styling
- `class-core-accordion.php` - Server-side rendering and asset registration
- `README.md` - This file

## Migration from prc-block/accordion

### Automatic Transform

Users can transform existing `prc-block/accordion-controller` blocks to `core/accordion`:

1. Select the `prc-block/accordion-controller` block
2. Click the block toolbar → "Transform to"
3. Select "Accordion" (core/accordion)

The transform automatically:
- Maps each `prc-block/accordion` to `core/accordion-content`
- Converts title to `core/accordion-header`
- Wraps content in `core/accordion-panel`
- Preserves the `structuredData` attribute
- Sets `autoclose: true` (PRC behavior)

### Manual Migration

If creating new accordions, use `core/accordion` directly:

1. Insert "Accordion" block from inserter
2. Add accordion items (core/accordion-content)
3. Each item automatically includes header and panel
4. Configure options (icon position, autoclose, structured data)

## Development

### Building

```bash
npm run build -w @prc/block-library
# When prompted, enter: core-accordion
```

### Testing

1. Create a `core/accordion` block in the editor
2. Enable "FAQPage Schema" in block settings
3. Add accordion items with titles and content
4. Preview/publish and inspect HTML for schema.org markup
5. Test entity-iframe integration by adding an entity-as-iframe block in an accordion panel

### Debugging

View script module is registered at:
- **Dev:** `/src/core-accordion/view.js`
- **Prod:** `/build/core-accordion/view.js`

Console logs are removed in production. For debugging, temporarily add:
```javascript
console.log('Accordion toggled', { ref, entityIframe });
```

## Dependencies

- WordPress 6.8+ (core/accordion blocks)
- `@wordpress/interactivity` package
- PRC Platform entity-as-iframe block (optional, for iframe support)

## Notes

- This extension does not replace core/accordion functionality
- All core accordion features remain available
- The `structuredData` attribute is stored but not part of core accordion
- Entity iframe support is additive - accordions work normally without entity iframes
- The view script is only enqueued when a core/accordion block is present on the page
