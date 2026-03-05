# Visual Guide: Responsive Toolbar Controls

This document provides a visual representation of how the responsive toolbar controls appear in different device preview modes.

## Toolbar Layout Overview

The responsive controls appear in the **Block Toolbar** (the toolbar that appears directly above the selected block), not in the top editor toolbar.

```
┌─────────────────────────────────────────────────────────┐
│  Block Toolbar (appears above selected grid column)    │
├─────────────────────────────────────────────────────────┤
│  [≡] [Vertical Align] [Span: X] [Order: Y]             │
└─────────────────────────────────────────────────────────┘
       ↑              ↑           ↑          ↑
     Block       Existing    NEW: Span  NEW: Order
    Settings      Control    Control    Control
                                        (Tablet/Mobile only)
```

## Desktop Mode

### Toolbar Buttons
```
┌─────────────────────────────────────────────────────┐
│ [⬍] [≡] Span: 12                                   │
└─────────────────────────────────────────────────────┘
  ↑    ↑     ↑
  |    |     └─ Span control (1-12 range)
  |    └─────── Vertical alignment
  └──────────── Block settings
```

### Span Dropdown Popover
```
┌──────────────────────────────┐
│ Desktop Column Span          │
├──────────────────────────────┤
│                              │
│ ├─────●───────────────────┤  │
│ 1  2  3  4  5  6  7  8  9 10 11 12
│                              │
└──────────────────────────────┘
```

**Note**: No Order control in Desktop mode (columns follow DOM order)

## Tablet Mode

### Toolbar Buttons
```
┌────────────────────────────────────────────────────────┐
│ [⬍] [≡] Span: 12  Order: 2                            │
└────────────────────────────────────────────────────────┘
  ↑    ↑     ↑         ↑
  |    |     |         └─ Order control (1-n range)
  |    |     └─────────── Span control (1-12 range)
  |    └─────────────────── Vertical alignment
  └──────────────────────── Block settings
```

### Span Dropdown Popover
```
┌──────────────────────────────┐
│ Tablet Column Span           │
├──────────────────────────────┤
│                              │
│ ├─────────●───────────────┤  │
│ 1  2  3  4  5  6  7  8  9 10 11 12
│                              │
└──────────────────────────────┘
```

### Order Dropdown Popover
```
┌──────────────────────────────┐
│ Tablet Column Order          │
├──────────────────────────────┤
│                              │
│ ├──●──────────────────────┤  │
│ 1  2  3  4  5  6            │
│                              │
│ Visual position of this      │
│ column                       │
└──────────────────────────────┘
```

## Mobile Mode

### Toolbar Buttons
```
┌────────────────────────────────────────────────────────┐
│ [⬍] [≡] Span: 4  Order: 1                             │
└────────────────────────────────────────────────────────┘
  ↑    ↑     ↑        ↑
  |    |     |        └─ Order control (1-n range)
  |    |     └────────── Span control (1-4 range, LIMITED)
  |    └──────────────── Vertical alignment
  └───────────────────── Block settings
```

### Span Dropdown Popover
```
┌──────────────────────────────┐
│ Mobile Column Span           │
├──────────────────────────────┤
│                              │
│ ├─────────────●──────────┤   │
│ 1        2        3       4  │
│                              │
└──────────────────────────────┘
```

**Note**: Mobile span is limited to 1-4 columns (not 1-12)

### Order Dropdown Popover
```
┌──────────────────────────────┐
│ Mobile Column Order          │
├──────────────────────────────┤
│                              │
│ ├●──────────────────────┤     │
│ 1  2  3  4  5  6            │
│                              │
│ Visual position of this      │
│ column                       │
└──────────────────────────────┘
```

## Interaction Flow

### Example: Changing Tablet Span

1. **Initial State**
   ```
   Device: Tablet
   Toolbar: [⬍] [≡] Span: 12  Order: 1
   ```

2. **Click "Span: 12"**
   ```
   ┌──────────────────────────────┐
   │ Tablet Column Span           │
   ├──────────────────────────────┤
   │                              │
   │ ├─────────────────────●───┤  │
   │ 1  2  3  4  5  6  7  8  9 10 11 12
   │                              │
   └──────────────────────────────┘
              ↓
         (popover opens)
   ```

3. **Drag slider to 6**
   ```
   ┌──────────────────────────────┐
   │ Tablet Column Span           │
   ├──────────────────────────────┤
   │                              │
   │ ├──────●─────────────────┤    │
   │ 1  2  3  4  5  6  7  8  9 10 11 12
   │                              │
   └──────────────────────────────┘
              ↓
   Column width changes in editor
   ```

4. **Updated State**
   ```
   Device: Tablet
   Toolbar: [⬍] [≡] Span: 6  Order: 1
                       ↑
                   (updated)
   ```

5. **Switch to Desktop**
   ```
   Device: Desktop
   Toolbar: [⬍] [≡] Span: 12
                       ↑
           (still shows desktop value)
   ```

## Sidebar Inspector (Comparison)

While the toolbar shows **only the current device**, the sidebar shows **all devices**:

```
┌─────────────────────────────┐
│ ▼ Column Span               │
├─────────────────────────────┤
│ Desktop Span                │
│ ├─────────────●─────────┤   │
│ 1 2 3 4 5 6 7 8 9 10 11 12  │
│                             │
│ ───────────────────────     │
│                             │
│ Tablet Span                 │
│ ├──────●────────────────┤   │
│ 1 2 3 4 5 6 7 8 9 10 11 12  │
│                             │
│ ───────────────────────     │
│                             │
│ Mobile Span                 │
│ ├─────────────●─────────┤   │
│ 1        2        3      4  │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ▼ Column Order              │
├─────────────────────────────┤
│ Desktop order follows the   │
│ column position in editor   │
│                             │
│ Tablet Position             │
│ ├──●────────────────────┤   │
│ 1  2  3  4  5  6           │
│                             │
│ ───────────────────────     │
│                             │
│ Mobile Position             │
│ ├●──────────────────────┤   │
│ 1  2  3  4  5  6           │
└─────────────────────────────┘
```

## Key Visual Differences

| Feature | Toolbar | Sidebar |
|---------|---------|---------|
| **Device Controls Shown** | Current device only | All devices |
| **Desktop Order** | Not shown | Explanatory text |
| **Tablet/Mobile Order** | Shown | Shown |
| **Visual Context** | Button label with value | Section headers |
| **Access Method** | Click button → Popover | Always visible |
| **Best For** | Quick adjustments | Comparing across devices |

## Accessibility Features

### ARIA Labels
```
<ToolbarButton
  aria-label="Desktop Span (12)"
  aria-expanded={isOpen}
>
  Span: 12
</ToolbarButton>
```

### Keyboard Navigation
- `Tab`: Move between toolbar buttons
- `Enter` or `Space`: Open dropdown
- `Arrow Keys`: Adjust slider value
- `Escape`: Close dropdown

## State Indicators

### Current Value Display
The toolbar button shows the **current value for the active device**:

```
Desktop mode:  Span: 12  (shows desktopSpan)
Tablet mode:   Span: 6   (shows tabletSpan)
Mobile mode:   Span: 4   (shows mobileSpan)
```

### Device Context
The popover header reinforces which device is being edited:

```
"Desktop Column Span"  ← Clear device context
"Tablet Column Order"  ← User knows what they're changing
"Mobile Column Span"   ← No ambiguity
```

## Common User Workflows

### Workflow 1: Set Different Spans Per Device
1. Start in Desktop mode
2. Click "Span: 12", set to 6
3. Switch to Tablet preview
4. Click "Span: 12", set to 8
5. Switch to Mobile preview
6. Click "Span: 4", set to 4
7. Result: Desktop=6, Tablet=8, Mobile=4

### Workflow 2: Reorder Columns on Mobile Only
1. Stay in Desktop mode (columns in DOM order)
2. Switch to Mobile preview
3. Select first column
4. Click "Order: 1", set to 3
5. Select second column
6. Click "Order: 2", set to 1
7. Result: Columns reordered on mobile, unchanged on desktop/tablet

### Workflow 3: Quick Desktop Adjustment
1. In Desktop mode
2. Select column
3. Click "Span: 12"
4. Drag to 8
5. Done - only desktop affected

## Device Preview Toggle

Users switch device modes using the WordPress editor's built-in device preview toggle:

```
Top Editor Toolbar
┌────────────────────────────────────────┐
│ [+] [⟲] [👁] [⚙]  [🖥] [📱] [📱]        │
└────────────────────────────────────────┘
                      ↑    ↑    ↑
                      |    |    └─ Mobile
                      |    └────── Tablet
                      └─────────── Desktop (active)
```

When clicked, the **entire editor preview** changes, and the **toolbar controls update** to show the relevant device's values.
