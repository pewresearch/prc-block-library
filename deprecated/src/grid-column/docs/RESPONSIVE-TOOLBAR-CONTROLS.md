# Responsive Toolbar Controls for Grid Column Block

## Overview

This document describes the new responsive toolbar controls feature for the `grid-column` block, which allows editors to view and modify column span and order attributes for the currently selected device preview mode (Desktop, Tablet, or Mobile).

## Implementation

The responsive toolbar controls are implemented in `responsive-toolbar-controls.jsx` and integrated into the block toolbar alongside the existing vertical alignment controls.

### Key Features

1. **Device-Aware Controls**: The toolbar automatically detects and responds to the current device preview mode in the WordPress editor
2. **Context-Specific Interface**: Shows only the controls relevant to the current device
3. **Consistent UX**: Uses WordPress native `Dropdown` and `ToolbarButton` components
4. **Clear Visual Feedback**: Toolbar buttons display current values (e.g., "Span: 6", "Order: 2")

## User Experience

### Desktop Mode

When the editor is in Desktop preview mode, the toolbar shows:

- **Span Control**: A dropdown button labeled "Span: [current value]" (1-12 columns)
  - Clicking opens a popover with a range slider for adjusting desktop column span
  - Title: "Desktop Column Span"
  - Range: 1-12 with visual markers

**Order Control**: Not shown (desktop uses DOM order, not custom positioning)

### Tablet Mode

When the editor is in Tablet preview mode, the toolbar shows:

- **Span Control**: A dropdown button labeled "Span: [current value]" (1-12 columns)
  - Clicking opens a popover with a range slider for adjusting tablet column span
  - Title: "Tablet Column Span"
  - Range: 1-12 with visual markers

- **Order Control**: A dropdown button labeled "Order: [current position]"
  - Clicking opens a popover with a range slider for adjusting tablet column order
  - Title: "Tablet Column Order"
  - Range: 1-[number of columns] with visual markers
  - Help text: "Visual position of this column"

### Mobile Mode

When the editor is in Mobile preview mode, the toolbar shows:

- **Span Control**: A dropdown button labeled "Span: [current value]" (1-4 columns)
  - Clicking opens a popover with a range slider for adjusting mobile column span
  - Title: "Mobile Column Span"
  - Range: 1-4 with visual markers (limited for mobile layout)

- **Order Control**: A dropdown button labeled "Order: [current position]"
  - Clicking opens a popover with a range slider for adjusting mobile column order
  - Title: "Mobile Column Order"
  - Range: 1-[number of columns] with visual markers
  - Help text: "Visual position of this column"

## Sidebar Inspector (Unchanged)

The sidebar inspector continues to show **all device controls simultaneously**, allowing editors to compare and adjust settings across all breakpoints at once. This provides:

- Desktop Span (1-12)
- Tablet Span (1-12)
- Mobile Span (1-4)
- Tablet Position (1-n)
- Mobile Position (1-n)

## Technical Details

### Device Detection

The component uses WordPress's built-in device preview detection:

```javascript
const { deviceType } = useSelect((select) => {
    const type = select('core/editor').getDeviceType();
    return {
        deviceType: type ? type.toLowerCase() : 'desktop',
    };
}, []);
```

This returns `'desktop'`, `'tablet'`, or `'mobile'` based on the current preview mode selected in the editor toolbar.

### Dynamic Value Display

The toolbar buttons dynamically display the current value for the active device:

- **Span**: Shows the device-specific span value (e.g., `desktopSpan`, `tabletSpan`, or `mobileSpan`)
- **Order**: Shows the device-specific position value (e.g., `tabletPosition || index`, `mobilePosition || index`)

### Attribute Updates

When a user changes a value in the toolbar:

1. The component determines the correct attribute key based on device type (e.g., `desktopSpan`, `tabletPosition`)
2. Updates only that specific attribute in the `gridLayout` object
3. Maintains all other attributes unchanged
4. For order changes, recalculates column dividers after a brief timeout

### Accessibility

- All toolbar buttons include proper `aria-label` attributes describing the device and current value
- Dropdowns use `aria-expanded` to indicate open/closed state
- Controls follow WordPress component patterns for keyboard navigation

## Testing Instructions

### Manual Testing Steps

1. **Start WordPress Playground**:
   ```bash
   npm run playground:start
   ```

2. **Create a Test Page**:
   - Navigate to `Pages > Add New`
   - Insert a "Grid Controller" block
   - Add 3-4 "Grid Column" blocks inside the controller
   - Add some content inside each column (paragraphs, images, etc.)

3. **Test Desktop Mode**:
   - Ensure the editor is in Desktop preview mode (default)
   - Select one of the grid columns
   - Look at the block toolbar (above the content)
   - You should see: `[Vertical Align]` `[Span: 12]`
   - Click "Span: 12" to open the dropdown
   - Adjust the slider and verify the column width changes
   - Verify no "Order" button is shown (desktop uses DOM order)

4. **Test Tablet Mode**:
   - Click the device preview toggle in the top editor toolbar
   - Select "Tablet" preview mode
   - Select a grid column again
   - Look at the block toolbar
   - You should see: `[Vertical Align]` `[Span: 12]` `[Order: 1]`
   - Click "Span: 12" to adjust tablet span
   - Click "Order: 1" to adjust tablet position
   - Verify changing order reorders the columns visually

5. **Test Mobile Mode**:
   - Switch to "Mobile" preview mode
   - Select a grid column
   - Look at the block toolbar
   - You should see: `[Vertical Align]` `[Span: 4]` `[Order: 1]`
   - Note that mobile span max is 4 (not 12)
   - Test both span and order controls

6. **Verify Sidebar Inspector**:
   - Open the sidebar inspector (right panel)
   - Look for "Column Span" and "Column Order" panels
   - Verify ALL device controls are shown (Desktop, Tablet, Mobile)
   - Verify changes in sidebar sync with toolbar and vice versa

7. **Test Device Context Isolation**:
   - Set different span values for each device (e.g., Desktop: 6, Tablet: 8, Mobile: 4)
   - Switch between device preview modes
   - Verify the toolbar shows the correct value for each device
   - Make a change in Desktop mode, then switch to Tablet
   - Verify the Desktop value persisted and Tablet shows its own value

### Expected Results

✅ Toolbar controls appear in the block toolbar (not the top editor toolbar)
✅ Toolbar shows only current device's controls
✅ Desktop mode shows only Span (no Order)
✅ Tablet and Mobile modes show both Span and Order
✅ Mobile Span is limited to 1-4 range
✅ Current values are clearly displayed in button labels
✅ Dropdowns open popovers with range sliders
✅ Changes update the correct device-specific attribute
✅ Sidebar inspector continues to show all devices
✅ No accidental changes to other devices from toolbar

## Code Structure

```
/src/grid-column/
├── responsive-toolbar-controls.jsx  ← New file
├── controls.jsx                     ← Modified to include toolbar controls
├── span-controls.jsx                ← Existing (sidebar only)
├── order-controls.jsx               ← Existing (sidebar only)
└── edit.jsx                         ← Unchanged
```

## Acceptance Criteria Met

- ✅ Block toolbar controls reflect and edit span/order for current preview device only
- ✅ Inspector sidebar continues to allow editing all device types at once
- ✅ Users cannot accidentally change settings for wrong device from toolbar
- ✅ Feature is responsive, accessible, and follows WordPress patterns
- ✅ UI makes device context explicit via labels and aria-labels
- ✅ Backward compatible - extends UI without breaking existing functionality
- ✅ Build passes with no linting errors
- ✅ Comprehensive JSDoc documentation included

## Browser Compatibility

The responsive toolbar controls use standard WordPress components and should work in all browsers supported by WordPress 6.0+:

- Chrome 90+
- Firefox 88+
- Safari 13.1+
- Edge 90+

## Performance Considerations

- Uses `useMemo` hooks to optimize re-renders
- Device type detection uses WordPress's built-in selector (cached)
- Attribute updates are debounced where appropriate
- No external dependencies beyond WordPress packages

## Future Enhancements

Potential improvements for future iterations:

1. **Visual Device Indicator**: Add a device icon to the toolbar button labels
2. **Keyboard Shortcuts**: Add keyboard shortcuts for common span values
3. **Preset Layouts**: Quick presets for common column configurations
4. **Live Preview**: Real-time visual feedback while dragging the slider
5. **Undo/Redo**: Enhanced history tracking for toolbar changes

## Support

For issues or questions about the responsive toolbar controls:

- **Code Location**: `plugins/prc-block-library/src/grid-column/responsive-toolbar-controls.jsx`
- **Related Files**: `controls.jsx`, `span-controls.jsx`, `order-controls.jsx`
- **Pattern Reference**: Similar to `show-more` block device detection pattern

## References

- **Issue**: [Asana Task #1213011011196401](https://app.asana.com/0/0/1213011011196401)
- **WordPress Device Preview API**: Uses `select('core/editor').getDeviceType()`
- **WordPress Components**: `ToolbarGroup`, `ToolbarButton`, `Dropdown`
- **PRC Components**: `MarkedRangeControl` (wrapper for WordPress `RangeControl`)
