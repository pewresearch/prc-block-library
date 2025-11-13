# Grid Controller

A responsive CSS Grid layout system with intelligent divider functionality for WordPress.

## Overview

The Grid Controller block provides a flexible 12-column grid system that adapts across breakpoints:

- **Mobile**: 4 columns
- **Tablet**: 12 columns
- **Desktop**: 12 columns

## Divider System

The divider system uses a **single `::before` pseudo-element** that intelligently switches between horizontal and vertical borders based on viewport and column span.

### How It Works

The divider automatically chooses the appropriate orientation:

#### Mobile (4-column grid)

- **Full-width columns** (span-4): Horizontal dividers (`border-top`)
- **Partial columns** (span < 4): Vertical dividers (`border-left`)

#### Tablet (12-column grid)

- **Full-width columns** (span-12): Horizontal dividers (`border-top`)
- **Partial columns** (span < 12): Vertical dividers (`border-left`)

#### Desktop (12-column grid)

- **Full-width columns** (span-12): Horizontal dividers (`border-top`)
- **Partial columns** (span < 12): Vertical dividers (`border-left`)

### Technical Implementation

```scss
// Unified approach using ::before only
@mixin horizontal-divider() {
	&::before {
		border-width: 1px 0 0 0; // Top border only
		position: relative;
		width: 100%;
	}
}

@mixin vertical-divider() {
	&::before {
		border-width: 0 0 0 1px; // Left border only
		position: absolute;
		height: 100%;
	}
}
```

### Benefits

1. **Single pseudo-element**: No need to manage both `::before` and `::after`
2. **Automatic switching**: Divider orientation changes based on column width at each breakpoint
3. **Clean CSS**: Reduced specificity and fewer `!important` overrides
4. **Consistent theming**: Uses `--divider-color` CSS custom property
5. **Better performance**: Fewer DOM pseudo-elements to render

### Customization

Control divider appearance via CSS custom properties:

```css
.wp-block-prc-block-grid-controller {
	--divider-color: #cccccc;
	--grid-gutter: 24px;
}
```

### Special Cases

#### Section Headers

When a grid contains section headers, vertical dividers automatically adjust their top position and height to clear the header:

```scss
&.has-divider:has(.is-style-section-header) {
	& > .wp-block-prc-block-grid-column:not(:first-of-type)::before {
		top: 28px;
		height: calc(100% - 28px);
	}
}
```

## Usage

Add the `has-divider` class to enable dividers:

```html
<div class="wp-block-prc-block-grid-controller has-divider">
	<div class="wp-block-prc-block-grid-column">Column 1</div>
	<div class="wp-block-prc-block-grid-column">Column 2</div>
</div>
```

The dividers will automatically adapt to the column widths at each breakpoint.
