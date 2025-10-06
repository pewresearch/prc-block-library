# Timeline Block - Visual Guide to Tick Mark Controls

## Inspector Panel Layout

### Before (v0.1.0)

```
┌─────────────────────────────┐
│ Block Controls              │
├─────────────────────────────┤
│ ☐ Auto Play                 │
│                             │
│ Interval (seconds)          │
│ ├─────●─────────────┤       │
│ 1s      3s     5s     10s   │
└─────────────────────────────┘
```

### After (v0.2.0)

```
┌─────────────────────────────────────────┐
│ Playback Controls                       │
├─────────────────────────────────────────┤
│ ☐ Auto Play                             │
│                                         │
│ Interval (seconds)                      │
│ ├─────●─────────────┤                   │
│ 1s      3s     5s     10s               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Tick Mark Controls                  NEW │
├─────────────────────────────────────────┤
│ ☐ Show All Tick Marks                   │
│ ℹ️  When enabled, all tick marks are     │
│    shown regardless of density          │
│                                         │
│ Tick Mark Interval                      │
│ ├●─────────────────────┤                │
│ 1        5         10                   │
│ ℹ️  Display every Nth tick mark         │
│                                         │
│ Tick Mark Height (px)                   │
│ ├───────●────────┤                      │
│ 4       8      20                       │
│ ℹ️  Adjust the height of tick marks     │
└─────────────────────────────────────────┘
```

## Visual Examples

### Example 1: Long Timeline (1970-2025, 55 years)

#### Default Behavior (Automatic Density)

```
Timeline View:
├────┬────┬────┬────┬────┬────┤
1970      1990      2010      2025
```

#### With Interval = 10

```
Timeline View:
├────┬────┬────┬────┬────┬────┤
1970 1980 1990 2000 2010 2020 2025
|    |    |    |    |    |    |
8px  8px  8px  8px  8px  8px  8px
```

#### With Interval = 10, Height = 12px

```
Timeline View:
├─────┬─────┬─────┬─────┬─────┬─────┤
1970  1980  1990  2000  2010  2020  2025
||    ||    ||    ||    ||    ||    ||
12px  12px  12px  12px  12px  12px  12px
```

### Example 2: Short Timeline (2020-2025, 5 years)

#### Show All = ON

```
Timeline View:
├─┬─┬─┬─┬─┬─┤
2020 2021 2022 2023 2024 2025
|    |    |    |    |    |
8px  8px  8px  8px  8px  8px
```

#### Interval = 2, Height = 10px

```
Timeline View:
├──┬──┬──┬──┤
2020   2022   2024 2025
||     ||     ||   ||
10px   10px   10px 10px
```

### Example 3: Tick Mark Height Comparison

#### Height = 4px (Minimum)

```
├┤
|
4px
```

#### Height = 8px (Default)

```
├─┤
|
|
8px
```

#### Height = 12px (Medium)

```
├──┤
|
|
|
12px
```

#### Height = 20px (Maximum)

```
├────┤
|
|
|
|
|
20px
```

## Control Interactions

### Scenario 1: Show All Tick Marks = ON

- Interval control is HIDDEN (grayed out)
- All tick marks display regardless of count
- Height control still active

### Scenario 2: Show All Tick Marks = OFF

- Interval control is VISIBLE
- Tick marks filtered based on interval
- First and last always show
- Height control active

### Scenario 3: Very Dense Timeline (100+ ticks)

- Automatic density applies as base
- Interval control overrides density
- Example: Interval = 10 shows every 10th regardless of automatic density

## Accessibility Features

### Keyboard Navigation

- All controls fully keyboard accessible
- Tab through controls in logical order
- Enter/Space to toggle Show All
- Arrow keys to adjust sliders

### Screen Reader Announcements

```
"Show All Tick Marks, toggle button, not pressed"
"Tick Mark Interval, slider, 1 of 10"
"Tick Mark Height in pixels, slider, 8 of 20"
```

### Help Text

Each control includes contextual help:

- **Show All**: "When enabled, all tick marks are shown regardless of density..."
- **Interval**: "Display every Nth tick mark. For example, 2 shows every other tick..."
- **Height**: "Adjust the height of the tick marks on the timeline."

## CSS Custom Properties

### Block-Level Variables

```css
.wp-block-prc-block-timeline {
	--height: 4px; /* Slider track height */
	--thumb-size: 16px; /* Slider thumb size */
	--tick-height: 8px; /* Tick mark height (controllable) */
}
```

### Tick Mark Styling

```css
.tick::before {
	height: var(--tick-height); /* Uses custom property */
	width: 2px;
	background: #555;
}

.tick.is-hidden {
	opacity: 0;
	pointer-events: none;
}
```

## Developer Notes

### Attribute Values in Block Markup

```html
<!-- wp:prc-block/timeline {
  "tickMarkInterval": 5,
  "tickMarkHeight": 12,
  "showAllTickMarks": false
} -->
```

### JavaScript Context

```javascript
{
	ticks: [
		{
			label: '1970',
			value: 0,
			id: 'abc123',
			position: 0,
			visible: true, // Controlled by interval logic
		},
		{
			label: '1971',
			value: 1,
			id: 'def456',
			position: 1.82,
			visible: false, // Hidden by interval = 5
		},
		// ...
	];
}
```

## Migration Path

### Existing Blocks (Pre-v0.2.0)

```
Defaults applied automatically:
- tickMarkInterval: 1 (show all)
- tickMarkHeight: 8 (existing default)
- showAllTickMarks: false

Result: No visual change, same behavior as before
```

### Updated Blocks (v0.2.0+)

```
Users can now customize:
1. Select timeline block
2. Open "Tick Mark Controls" panel
3. Adjust settings as needed
4. Preview updates in real-time
```

## Testing Checklist

- [ ] Controls render in Inspector panel
- [ ] Show All toggle works
- [ ] Interval slider filters ticks correctly
- [ ] Height slider changes tick height
- [ ] First/last ticks always show
- [ ] Editor matches frontend display
- [ ] Help text displays correctly
- [ ] Keyboard navigation works
- [ ] Screen reader announces properly
- [ ] Existing blocks work without changes
- [ ] New blocks use defaults correctly
- [ ] CSS custom property applies
- [ ] .is-hidden class applied correctly
