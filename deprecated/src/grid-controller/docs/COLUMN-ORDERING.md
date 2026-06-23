# Grid Column Ordering System

## Overview

The grid-controller block now supports responsive column ordering for tablet and mobile devices. Columns can be visually reordered at tablet and mobile breakpoints while maintaining the DOM order for desktop.

## Architecture

### Block Context

**grid-controller** provides context to child **grid-column** blocks:

- Context Key: `prc-block/columnOrdering`
- Structure: `{ tablet: Array<number>|null, mobile: Array<number>|null }`

Each array contains column indices in display order. `null` means sequential/default order.

### Attributes

**grid-controller block.json:**

```json
"columnOrdering": {
  "type": "object",
  "default": {
    "tablet": null,
    "mobile": null
  }
}
```

**Provided Context:**

```json
"providesContext": {
  "prc-block/columnOrdering": "columnOrdering"
}
```

**grid-column block.json:**

```json
"usesContext": [
  "prc-block/columnOrdering"
]
```

## User Interface

### Column Controls

Location: `grid-column/controls.jsx`

The ordering controls are integrated directly into each individual column's Inspector Controls panel under "Column Order".

Features:

- **Per-Column Configuration**: Each column has its own ordering controls
- **MarkedRangeControl**: Uses the same UI component as Grid Span for consistency
- **Device-Specific**: Separate controls for Tablet and Mobile ordering
- **Visual Feedback**: Shows current position (1-based) for the column
- **Help Text**: Descriptive text explains desktop order follows editor position
- **Parent Attribute Updates**: Uses `updateBlockAttributes` to modify parent grid-controller's `columnOrdering` attribute

### Control Behavior

- Position is displayed as 1-based (1st, 2nd, 3rd) for user clarity
- Internally uses 0-based indices for array operations
- Drag the slider to change this column's visual position
- Changes affect only the selected device (tablet or mobile)
- Desktop order always follows the column's position in the editor
- Sequential ordering automatically optimizes to `null`

### Implementation Details

The column controls:

1. Read parent's `columnOrdering` attribute via `getBlockAttributes(rootClientId)`
2. Calculate current position using `indexOf()` on the ordering array
3. Update parent using `updateBlockAttributes(rootClientId, { columnOrdering })`
4. Perform array splice operations to move the column index to new position
5. Check if result is sequential and set to `null` if so

### Key Functions

```javascript
/**
 * Get current position (1-based for display)
 */
const getCurrentOrder = (device) => {
	const ordering = columnOrdering[device];
	if (!ordering) {
		// Sequential order - position is same as index
		return index;
	}
	// Find position in ordering array
	const position = ordering.indexOf(index - 1);
	return position === -1 ? index : position + 1;
};

/**
 * Update column ordering on parent block
 */
const handleOrderChange = (newPosition, device) => {
	const currentOrdering = columnOrdering[device] || getDefaultOrdering();
	const newOrdering = [...currentOrdering];

	// Convert from 1-based display position to 0-based array index
	const oldPosition = currentOrdering.indexOf(index - 1);
	const targetPosition = newPosition - 1;

	// Remove from old position, insert at new position
	const [movedItem] = newOrdering.splice(oldPosition, 1);
	newOrdering.splice(targetPosition, 0, movedItem);

	// Check if result is sequential - if so, set to null
	const isSequential = newOrdering.every((val, idx) => val === idx);

	updateBlockAttributes(rootClientId, {
		columnOrdering: {
			...columnOrdering,
			[device]: isSequential ? null : newOrdering,
		},
	});
};
```

## Normalization

When column count changes:

1. Remove indices that no longer exist
2. Add missing indices at the end
3. Check if result is sequential [0,1,2,3...]
4. If sequential, set to `null` (optimizes output)

## CSS Implementation

### Order Classes

Pattern: `column{index}-{device}-order-{position}`

Examples:

- `column0-tablet-order-2` - First column appears third on tablet
- `column2-mobile-order-0` - Third column appears first on mobile

### SCSS Generation

Location: `grid-column/style.scss`

Generates order classes for columns 0-5 and positions 0-5:

```scss
@for $i from 0 through 5 {
	// Tablet ordering
	@for $order from 0 through 5 {
		.wp-block-prc-block-grid-column.column#{$i}-tablet-order-#{$order} {
			@media (min-width: $break-small) and (max-width: $break-large - 1) {
				order: #{$order};
			}
		}
	}

	// Mobile ordering
	@for $order from 0 through 5 {
		.wp-block-prc-block-grid-column.column#{$i}-mobile-order-#{$order} {
			@media (max-width: $break-small - 1) {
				order: #{$order};
			}
		}
	}
}
```

### Breakpoints

- **Mobile**: `max-width: 599px` (< $break-small)
- **Tablet**: `600px - 959px` (>= $break-small and < $break-large)
- **Desktop**: `960px+` (>= $break-large) - uses DOM order, no classes applied

## JavaScript Implementation

### Editor (grid-column/edit.jsx)

Applies order classes based on context:

```javascript
const columnOrdering = context['prc-block/columnOrdering'];

const blockProps = useBlockProps({
	className: classnames({
		[`column${index}-tablet-order-${columnOrdering?.tablet?.indexOf(index) ?? index}`]:
			columnOrdering?.tablet,
		[`column${index}-mobile-order-${columnOrdering?.mobile?.indexOf(index) ?? index}`]:
			columnOrdering?.mobile,
	}),
});
```

Key Points:

- Uses `indexOf()` to find position in ordering array
- Fallback to column index if ordering is null
- Only applies class if ordering exists (optional chaining)

## PHP Implementation

### Frontend Rendering (grid-column/class-grid-column.php)

The `render_block_callback` method:

```php
public function render_block_callback( $attributes, $content, $block ) {
  // Get column ordering from parent context.
  $column_ordering = isset( $block->context['prc-block/columnOrdering'] )
    ? $block->context['prc-block/columnOrdering']
    : null;

  // Build column classes
  $column_classes = array(/* base classes */);

  // Add ordering classes if custom ordering is set.
  if ( ! empty( $column_ordering['tablet'] ) ) {
    $tablet_order = array_search( $index, $column_ordering['tablet'], true );
    if ( false !== $tablet_order ) {
      $column_classes[] = 'column' . $index . '-tablet-order-' . $tablet_order;
    }
  }

  if ( ! empty( $column_ordering['mobile'] ) ) {
    $mobile_order = array_search( $index, $column_ordering['mobile'], true );
    if ( false !== $mobile_order ) {
      $column_classes[] = 'column' . $index . '-mobile-order-' . $mobile_order;
    }
  }
}
```

Key Points:

- Accesses context via `$block->context`
- Uses `array_search()` to find position (like JavaScript `indexOf`)
- Only applies classes when ordering is not empty
- Mirrors JavaScript logic exactly

## Data Flow

1. User reorders columns in OrderingControls UI
2. `columnOrdering` attribute updated on grid-controller
3. Context provided to all child grid-column blocks
4. grid-column edit.jsx reads context and applies order classes
5. Visual reordering happens via CSS `order` property
6. On frontend, PHP render callback applies same classes

## Example Data

**3 columns, mobile reversed:**

```json
{
	"tablet": null,
	"mobile": [2, 1, 0]
}
```

**4 columns, tablet: 2nd column first, mobile: last column first:**

```json
{
	"tablet": [1, 0, 2, 3],
	"mobile": [3, 0, 1, 2]
}
```

**Sequential (optimized to null):**

```json
{
	"tablet": null,
	"mobile": null
}
```

## Visual Behavior

### Editor

- Columns reorder visually in the canvas
- Matches frontend appearance
- CSS `order` property applied via classes

### Frontend

- Same CSS classes applied
- Same visual order
- CSS Grid with `order` property handles reordering

### Desktop

- Always follows DOM order
- No order classes applied
- Implicit order based on block sequence

## Testing

To test the ordering system:

1. Insert a Grid Columns block
2. Add 3+ columns
3. Select a column
4. Open "Column Order" panel in Inspector Controls
5. Adjust "Tablet Order" slider to change position
6. Adjust "Mobile Order" slider separately
7. Select different columns and set their orders
8. Preview at different viewport sizes
9. Check frontend matches editor

## Reset Behavior

To reset ordering to sequential:

- Manually set each column's order back to its sequential position (1, 2, 3...)
- When all columns are in sequential order, the system automatically optimizes to `null`
- This removes the ordering attribute and uses default DOM order

## Normalization Edge Cases

**Adding a column:**

- New column gets next index
- Existing ordering remains valid
- New column appears at end of ordering

**Removing a column:**

- Indices above removed index are filtered out
- Remaining indices stay in order
- Missing indices added at end if needed
- Auto-resets to null if now sequential

**Example:** 4 columns ordered [1,0,3,2], remove column 2:

- Ordering becomes [1,0,3] (removed invalid index 2)
- Column 2 no longer exists, so 3 is now index 2
- Actually would need renormalization logic (TODO if needed)

## Future Enhancements

Potential improvements:

- Drag-drop UI instead of buttons
- Visual preview of ordering in controls
- Bulk reset for all devices
- Copy ordering between devices
- Ordering presets (reverse, alternate, etc.)
- Support for more than 6 columns

## Performance

- CSS classes are small and scoped
- Order property is well-supported
- No JavaScript needed on frontend
- Minimal CSS generated (6 columns × 6 positions × 2 devices = 72 rules)
- Block context system is efficient
