# Order-Aware Divider System

## Overview

The grid-controller's divider system now intelligently responds to column reordering. When columns are reordered using the CSS `order` property, dividers automatically adjust to show only on visually non-first columns.

## The Problem

Previously, dividers used `:not(:first-of-type)` which is DOM-based. When columns were reordered visually:

**Example:**

- DOM order: Column 1, Column 2, Column 3
- Mobile ordering: `[2, 0, 1]` (Column 3 first, Column 1 second, Column 2 third)
- **Issue**: Column 3 had a divider (DOM 3rd) but shouldn't (visually 1st)
- **Issue**: Column 1 had no divider (DOM 1st) but should (visually 2nd)

## The Solution

The divider system now has two modes:

### 1. Default Mode (No Ordering Applied)

Uses DOM order with `:not(:first-of-type)`:

```scss
// Columns without order classes use DOM-based logic
&
	> .wp-block-prc-block-grid-column:not(:first-of-type):not(
		[class*='-mobile-order-']
	) {
	// Apply dividers based on span
}
```

### 2. Order-Aware Mode (Ordering Active)

Uses visual order based on `order` classes:

```scss
// Columns with order classes EXCEPT order-0 get dividers
&
	> .wp-block-prc-block-grid-column[class*='-mobile-order-']:not(
		[class*='-mobile-order-0']
	) {
	// Apply dividers based on span
}
```

## How It Works

### CSS Selector Logic

**Mobile:**

```scss
// Default: DOM-based (when no ordering)
:not(:first-of-type):not([class*="-mobile-order-"])

// Order-aware: Visual position-based
[class*="-mobile-order-"]:not([class*="-mobile-order-0"])
```

**Tablet:**

```scss
// Default: DOM-based (when no ordering)
:not(:first-of-type):not([class*="-tablet-order-"])

// Order-aware: Visual position-based
[class*="-tablet-order-"]:not([class*="-tablet-order-0"])
```

**Desktop:**

```scss
// Always DOM-based (no ordering at desktop)
:not(:first-of-type);
```

### Visual Position Detection

The key insight is that `order-0` represents the visually first column:

- `column0-mobile-order-0` → Column 1 is visually 1st on mobile → **No divider**
- `column2-mobile-order-0` → Column 3 is visually 1st on mobile → **No divider**
- `column1-mobile-order-1` → Column 2 is visually 2nd on mobile → **Has divider**
- `column0-mobile-order-2` → Column 1 is visually 3rd on mobile → **Has divider**

### Bidirectional Behavior

The system handles both directions:

1. **Remove divider** from column that becomes visually first
    - Example: Column 3 with `order-0` → No divider

2. **Add divider** to column that's no longer visually first
    - Example: Column 1 with `order-1` → Gets divider

## Implementation Details

### SCSS Structure

```scss
&.has-divider {
	// Mobile
	@media (max-width: #{$break-small - 1}) {
		// Default: DOM-based for columns without order classes
		& > .column:not(:first-of-type):not([class*='-mobile-order-']) {
			@include horizontal-or-vertical-divider();
		}

		// Order-aware: Visual position-based for columns with order classes
		& > .column[class*='-mobile-order-']:not([class*='-mobile-order-0']) {
			@include horizontal-or-vertical-divider();
		}
	}

	// Tablet
	@media (min-width: #{$break-small}) and (max-width: #{$break-large - 1}) {
		// Reset mobile dividers
		& > .column:not(:first-of-type) {
			@include reset-divider();
		}

		// Default: DOM-based for columns without order classes
		& > .column:not(:first-of-type):not([class*='-tablet-order-']) {
			@include horizontal-or-vertical-divider();
		}

		// Order-aware: Visual position-based for columns with order classes
		& > .column[class*='-tablet-order-']:not([class*='-tablet-order-0']) {
			@include horizontal-or-vertical-divider();
		}
	}

	// Desktop
	@media (min-width: #{$break-large}) {
		// Always DOM-based (no ordering at desktop)
		& > .column:not(:first-of-type) {
			@include horizontal-or-vertical-divider();
		}
	}
}
```

### Divider Type Selection

Dividers are still type-aware (horizontal vs vertical) based on column span:

**Mobile:**

- `span-4` (full-width) → Horizontal divider (`border-top`)
- `span-1`, `span-2`, `span-3` → Vertical divider (`border-left`)

**Tablet:**

- `span-12` (full-width) → Horizontal divider
- Other spans → Vertical divider

**Desktop:**

- `span-12` (full-width) → Horizontal divider
- Other spans → Vertical divider

## Examples

### Example 1: Simple Reordering

**Setup:**

- 3 columns
- Mobile ordering: `[2, 0, 1]` (reverse order)

**Result:**

```
Visual:  [Column 3] | [Column 1] | [Column 2]
Classes:    order-0  |   order-1  |   order-2
Divider:    None     |   Yes      |   Yes
```

### Example 2: Partial Reordering

**Setup:**

- 4 columns
- Tablet ordering: `[1, 0, 2, 3]` (swap first two)

**Result:**

```
Visual:  [Column 2] | [Column 1] | [Column 3] | [Column 4]
Classes:    order-0  |   order-1  |   order-2  |   order-3
Divider:    None     |   Yes      |   Yes      |   Yes
```

### Example 3: No Reordering

**Setup:**

- 3 columns
- No ordering applied (sequential)

**Result:**

```
Visual:  [Column 1] | [Column 2] | [Column 3]
Classes:    (none)   |   (none)   |   (none)
Divider:    None     |   Yes      |   Yes
DOM logic:  first    |   not first |  not first
```

## Browser Compatibility

✅ **Attribute selectors** (`[class*="..."]`) - Universal support
✅ **`:not()` pseudo-class** - Universal support
✅ **CSS combinators** (` >`, etc.) - Universal support

This solution works in all modern browsers and IE11+.

## Performance

- **Efficient selectors**: Uses simple attribute matching
- **No JavaScript**: Pure CSS solution works on frontend
- **No runtime cost**: Selectors are evaluated at render time
- **Small CSS footprint**: Adds minimal additional CSS rules

## Testing Checklist

- [ ] Mobile: Column reordered to first position → No divider
- [ ] Mobile: Column reordered to second+ position → Has divider
- [ ] Tablet: Column reordered to first position → No divider
- [ ] Tablet: Column reordered to second+ position → Has divider
- [ ] Desktop: Always follows DOM order → First has no divider
- [ ] No ordering: Falls back to DOM-based logic
- [ ] Mixed: Some columns ordered, some not → Correct dividers
- [ ] Full-width columns: Still get horizontal dividers when appropriate
- [ ] Partial-width columns: Still get vertical dividers when appropriate

## Edge Cases Handled

1. **Mixed ordering states**: Some columns with order classes, some without
    - Order classes use visual logic
    - Non-ordered columns use DOM logic

2. **Sequential ordering**: `[0, 1, 2, 3]` optimized to `null`
    - Falls back to DOM logic automatically
    - No order classes applied, so default selectors work

3. **Span changes**: Column changes from full-width to partial or vice versa
    - Divider type (horizontal/vertical) updates automatically
    - Order-awareness is independent of span logic

4. **Multiple devices**: Different ordering on tablet vs mobile
    - Each breakpoint has independent logic
    - Dividers reset between breakpoints to prevent conflicts

## Future Enhancements

Potential improvements:

- Last-column awareness (remove right divider on visually-last column)
- Gap-based divider positioning for better visual alignment
- Divider animation when reordering in editor
- Divider color theming based on visual position
