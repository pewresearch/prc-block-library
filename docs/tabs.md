# Tabs

Container block that displays child Tab blocks in a tabbed interface. Supports horizontal and vertical orientations, three visual styles, full keyboard navigation, URL hash activation, and per-instance color theming. **Deprecated in the editor inserter** in favor of `core/tabs`.

## Namespace

`prc-block/tabs`

## Category

`design`

## Supports

| Feature | Detail |
|---|---|
| Align | All (`true`) |
| Color | Text: no, Background: no (colors managed via custom attributes) |
| HTML | No |
| Interactivity | Yes |
| Inserter | **No** (deprecated) |
| Spacing | `blockGap` (horizontal + vertical), `margin` (no `padding`) |
| Typography | `fontSize`, `fontFamily` |

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `tabsId` | `string` | `""` | Unique instance ID (generated server-side as `tabs_{n}`) |
| `orientation` | `string` | `"horizontal"` | `"horizontal"` or `"vertical"` |
| `activeTabIndex` | `number` | `0` | Index of the default active tab |
| `tabInactiveColor` | `string` | -- | Named color for inactive tab background |
| `customTabInactiveColor` | `string` | -- | Custom hex for inactive tab background |
| `tabHoverColor` | `string` | -- | Named color for hovered tab |
| `customTabHoverColor` | `string` | -- | Custom hex for hovered tab |
| `tabActiveColor` | `string` | -- | Named color for active tab background |
| `customTabActiveColor` | `string` | -- | Custom hex for active tab background |
| `tabTextColor` | `string` | -- | Named color for tab label text |
| `customTabTextColor` | `string` | -- | Custom hex for tab label text |
| `tabActiveTextColor` | `string` | -- | Named color for active tab text |
| `customTabActiveTextColor` | `string` | -- | Custom hex for active tab text |
| `tabHoverTextColor` | `string` | -- | Named color for hovered tab text |
| `customTabHoverTextColor` | `string` | -- | Custom hex for hovered tab text |

## Available Styles

| Style | Class | Description |
|---|---|---|
| Tabs (default) | `is-style-tab` | Filled background tabs with bottom divider |
| Links | `is-style-links` | Underlined tab labels, transparent backgrounds |
| Button | `is-style-button` | Pill-shaped tabs with `border-radius: 9999px`, no divider line |

All three styles support vertical orientation with automatic border/underline axis switching.

## Inner Blocks

Only `prc-block/tab` blocks are allowed. Default template inserts two tabs with labels "Tab 1" and "Tab 2".

## Parent / Ancestor Requirements

None.

## Context

| Direction | Key | Maps to |
|---|---|---|
| Provides | `tabs/id` | `tabsId` attribute |

## Usage

In the editor, a deprecation warning is shown advising migration to `core/tabs`. The block uses `withColors` HOC to manage six color controls. A SlotFill pattern (`TabFill` / `TabsListSlot`) renders tab labels from child Tab blocks into the tab bar.

Inspector controls:
- **Vertical Tabs** toggle -- switches between horizontal and vertical orientation.
- **Six color controls** -- inactive, hover, active backgrounds and corresponding text colors, each with `ColorGradientSettingsDropdown` and a `ContrastCheckerMatrix`.

The editor renders `InnerBlocks.ButtonBlockAppender` via SlotFill to allow adding new tabs directly in the tab bar area.

## Block Markup (save)

```html
<div class="wp-block-prc-block-tabs">
  <h3 class="tabs__title">Tab Contents</h3>
  <div class="tabs__list" role="tablist"></div>
  <!-- child prc-block/tab sections -->
</div>
```

The `tabs__list` div is an empty placeholder; the server-side render callback populates it with tab labels.

## PHP Rendering

`class-tabs.php` (`PRC\Platform\Blocks\Tabs`)

**Render callback:**
1. Generates a unique `tabs_id` via `wp_unique_id('tabs_')`.
2. Calls `wp_interactivity_state('prc-block/tabs', { $tabs_id => $tabs_list })` to register per-instance tab data keyed by unique ID.
3. Extracts tab list from inner blocks by parsing `innerHTML` for each child tab's `id` and `label`.
4. Sets `data-wp-interactive="prc-block/tabs"`, `data-wp-context` with `tabsId`, `activeTabIndex`, and `isVertical`.
5. Sets `data-wp-init="callbacks.onTabsInit"` and `data-wp-on--keydown="actions.handleTabKeyDown"`.
6. Generates color CSS custom properties (`--custom-tab-inactive-color`, `--custom-tab-hover-color`, `--custom-tab-active-color`, `--custom-tab-text-color`, `--custom-tab-hover-text-color`, `--custom-tab-active-text-color`).
7. Generates gap CSS custom properties (`--wp--style--unstable-tabs-list-gap`, `--wp--style--unstable-tabs-gap`), swapping horizontal/vertical values for vertical orientation.
8. Builds tab label markup as `<a>` elements with `role="tab"`, `aria-controls`, `data-wp-on--click`, `data-wp-bind--aria-selected`, `data-wp-bind--tabindex`.
9. Splices the generated tablist into the saved markup via regex replacement of the empty `tabs__list` div.

## Frontend Interactivity

`view.js` registers the `prc-block/tabs` store.

**State:**
- `tabsList` -- retrieves the current instance's tab array from `state[tabsId]`.
- `tabIndex` -- determines the index of the current element (tab label or panel) within the tabs list.
- `isActiveTab` -- compares `tabIndex` against `context.activeTabIndex`.
- `tabIndexAttribute` -- returns `0` or `-1` for roving tabindex pattern.

**Actions:**
- `handleTabKeyDown` (sync event) -- Enter activates the tab; ArrowRight/Left navigate horizontal tabs; ArrowDown/Up navigate vertical tabs.
- `handleTabClick` (sync event) -- activates the clicked tab.
- `setActiveTab(tabIndex, scrollToTab)` -- updates `context.activeTabIndex`; optionally scrolls the tab panel into view with a 100ms delay.

**Callbacks:**
- `onTabsInit` -- on initialization, checks `window.location.hash` against the tabs list. If a matching tab ID is found, activates that tab and scrolls to it.

## CSS Architecture

The stylesheet (`style.scss`) uses CSS custom properties as design tokens, mapped to the PHP-generated custom properties:

- `--tab-bg`, `--tab-bg-hover`, `--tab-bg-active`
- `--tab-text`, `--tab-text-hover`, `--tab-text-active`
- `--tab-opacity`, `--tab-opacity-hover`, `--tab-opacity-active`
- `--tab-underline-width`, `--tab-side-border-width`, `--tab-outline-width`
- `--tab-border-radius`, `--tab-padding-block`, `--tab-padding-inline`
- `--tabs-divider-color`

Each style variant overrides these tokens. Mobile dropdown mode (`.is-mobile-dropdown`) hides the tab list and shows a `<select>` element.

## Related Blocks

| Block | Relationship |
|---|---|
| `prc-block/tab` | Required child block |
| `core/tabs` | Recommended replacement (this block is deprecated in the inserter) |
