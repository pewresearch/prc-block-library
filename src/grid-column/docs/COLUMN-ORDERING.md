# Grid Column Ordering & Divider System - Updated Architecture

## Overview

This document describes the refactored architecture for column ordering and divider management in the PRC Grid system (v1.4+).

## Architecture Change

### OLD System (Pre-v1.4)

- **Parent-Managed Ordering**: Grid Controller stored `columnOrdering: {tablet: [2,0,1], mobile: [1,2,0]}`
- **Context-Based**: Parent provided ordering to columns via block context
- **Complex Logic**: Columns calculated position using `indexOf()` on arrays
- **Array Manipulation**: Required splicing, inserting, removing elements
- **Calculated Dividers**: Dividers determined by complex CSS selectors with `:not([class*="-order-"])`

### NEW System (v1.4+)

- **Column-Managed Positioning**: Each column stores its own `tabletPosition`, `mobilePosition`
- **Self-Contained**: No parent context needed - each column is independent
- **Direct Attributes**: Simple attribute get/set - no array calculations
- **Explicit Dividers**: Each column has `desktopDivider`, `tabletDivider`, `mobileDivider` boolean attributes
- **Automatic Calculation**: Dividers automatically calculated based on visual position

## Data Structure

### Grid Column Attributes

```javascript
{
  gridLayout: {
    index: 1,                    // 1-based DOM position (auto-updated)

    // Span (column width)
    desktopSpan: 12,            // 1-12 columns
    tabletSpan: 12,             // 1-12 columns
    mobileSpan: 4,              // 1-4 columns

    // Start position (optional)
    desktopStart: null,
    tabletStart: null,
    mobileStart: null,

    // Visual position (ordering)
    tabletPosition: null,       // 1-6, null = sequential
    mobilePosition: null,       // 1-6, null = sequential

    // Dividers (auto-calculated)
    desktopDivider: false,      // boolean
    tabletDivider: false,       // boolean
    mobileDivider: false,       // boolean
  }
}
```

### Grid Controller Attributes

```javascript
{
  dividerColor: null,           // Optional color override
  verticalAlignment: null,      // null | 'top' | 'center' | 'bottom' | 'stretch'
}
```

## Position System

### Values

- **1-based indexing**: Positions are 1-6 (matching UI display)
- **null means sequential**: If `tabletPosition` or `mobilePosition` is `null`, column follows DOM order
- **Desktop always sequential**: Desktop doesn't support custom ordering (uses DOM order)

### CSS Classes

Columns receive position classes when ordering is applied:

```css
.column1-tablet-position-2  /* Column 1 at position 2 on tablet */
.column3-mobile-position-1  /* Column 3 at position 1 on mobile */
```

CSS `order` property is set directly to the position value:

```scss
.column1-tablet-position-2 {
	order: 2; // Direct value, no offset needed
}
```

## Divider System

### Automatic Calculation

Dividers are automatically calculated when:

- A column's position changes
- Columns are added or removed
- The block is loaded

**Logic**:

- A column gets a divider if it's **NOT in position 1** (first visual position)
- Desktop: Based on DOM order (index !== 1)
- Tablet: Based on `tabletPosition` or DOM order if null
- Mobile: Based on `mobilePosition` or DOM order if null

### CSS Classes

Columns with dividers receive:

```css
.has-desktop-divider
.has-tablet-divider
.has-mobile-divider
```

### Divider Behavior

Dividers intelligently switch between horizontal and vertical based on column span:

- **Full-width columns** (span-12 on desktop/tablet, span-4 on mobile): Horizontal divider (top border)
- **Partial-width columns**: Vertical divider (left border)

## Controls

### Inspector Panel: "Column Order"

Two range controls allow setting visual position per breakpoint:

```
Tablet Position:  [1] 2  3  4  5  6
Mobile Position:  [1] 2  3  4  5  6
```

- **Range**: 1 to `columnCount` (number of columns in parent)
- **Default**: Sequential (follows DOM order)
- **Reset**: Setting to sequential position sets attribute to `null`

## Implementation Details

### Automatic Divider Calculation (`controls.jsx`)

```javascript
const calculateDividers = () => {
	siblingColumns.forEach((column, domIndex) => {
		const columnIndex = domIndex + 1; // 1-based

		// Desktop: DOM order
		const desktopDivider = columnIndex !== 1;

		// Tablet: tabletPosition or DOM order
		const tabletPos = columnLayout.tabletPosition || columnIndex;
		const tabletDivider = tabletPos !== 1;

		// Mobile: mobilePosition or DOM order
		const mobilePos = columnLayout.mobilePosition || columnIndex;
		const mobileDivider = mobilePos !== 1;

		// Update if changed
		updateBlockAttributes(column.clientId, {
			gridLayout: {
				...columnLayout,
				desktopDivider,
				tabletDivider,
				mobileDivider,
			},
		});
	});
};
```

### Triggered By:

- Position changes (immediate via `handlePositionChange`)
- Column count changes (via `useEffect` with `columnCount` dependency)
- Position attribute changes (via `useEffect` with `tabletPosition`, `mobilePosition` dependencies)

## Migration & Deprecation

### Grid Column Deprecation

- **Detects**: Old blocks lacking `tabletPosition`, `mobilePosition`, `divider` attributes
- **Migrates**:
    - Adds `tabletPosition: null`, `mobilePosition: null` (sequential)
    - Calculates initial divider values based on `index`
    - Automatic divider calculation then takes over

### Grid Controller Deprecation

- **Detects**: Old blocks with `columnOrdering` attribute
- **Migrates**: Removes `columnOrdering` attribute (no longer used)

## CSS Architecture

### Position Classes (SCSS)

```scss
// Generate for all columns (1-6) and positions (1-6)
@for $i from 1 through 6 {
	@for $position from 1 through 6 {
		&
			> .wp-block-prc-block-grid-column.column#{$i}-tablet-position-#{$position} {
			@media (min-width: 600px) and (max-width: 959px) {
				order: #{$position};
			}
		}
	}
}
```

### Divider Classes (SCSS)

```scss
&.has-divider {
	@media (min-width: 960px) {
		& > .wp-block-prc-block-grid-column.has-desktop-divider {
			// Full-width gets horizontal divider
			&[class*='-desktop-grid__span-12'] {
				@include horizontal-divider();
			}
			// Non-full-width gets vertical divider
			&:not([class*='-desktop-grid__span-12']) {
				@include vertical-divider();
			}
		}
	}
	// Similar for tablet and mobile...
}
```

## Benefits

### 1. **Simpler Logic**

- No `indexOf`, array splicing, or sequential detection
- Direct attribute access with get/set

### 2. **Self-Contained Columns**

- Each column manages its own state
- No parent coordination needed
- Easier to reason about

### 3. **Easier Debugging**

- Position values match UI (1-6)
- Explicit divider flags (not calculated from DOM)
- Clear CSS class names

### 4. **Automatic Dividers**

- No manual divider management
- Dividers update when positions change
- Consistent across all breakpoints

### 5. **Cleaner CSS**

- Direct class selectors (`.has-tablet-divider`)
- No complex `:not()` chains
- Removed ~80 lines of legacy divider logic

## Future Improvements

### Potential Enhancements:

1. **Visual drag-and-drop ordering** in the editor
2. **Preview mode** to see ordering at different breakpoints
3. **Copy position settings** from one breakpoint to another
4. **Position presets** (e.g., "Reverse on mobile")
5. **Divider style options** (thickness, style, spacing)

## Testing Scenarios

### Manual Testing Checklist:

- [ ] Create grid with 3+ columns
- [ ] Change tablet position - verify dividers update
- [ ] Change mobile position - verify dividers update
- [ ] Add new column - verify all dividers recalculate
- [ ] Remove column - verify remaining dividers adjust
- [ ] Test with full-width columns (horizontal dividers)
- [ ] Test with partial-width columns (vertical dividers)
- [ ] Save and reload - verify positions persist
- [ ] Test old block migration (if available)

## Related Files

### JavaScript

- `src/grid-column/controls.jsx` - Position controls + divider calculation
- `src/grid-column/edit.jsx` - Class application
- `src/grid-column/deprecated.jsx` - Migration from old structure
- `src/grid-controller/deprecated.jsx` - Remove old columnOrdering

### PHP

- `src/grid-column/class-grid-column.php` - Server-side rendering

### SCSS

- `src/grid-controller/style.scss` - Position classes, divider styles

### Config

- `src/grid-column/block.json` - Attribute schema
- `src/grid-controller/block.json` - Parent attribute schema

---

**Version**: 1.4+  
**Last Updated**: October 13, 2025  
**Status**: ✅ Implemented & Tested
