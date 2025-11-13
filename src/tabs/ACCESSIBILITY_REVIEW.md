# Accessibility Review: Tabs Block (`prc-block/tabs` & `prc-block/tab`)

**Files Reviewed**:

- `plugins/prc-block-library/src/tabs/edit.jsx`
- `plugins/prc-block-library/src/tabs/view.js`
- `plugins/prc-block-library/src/tabs/save.jsx`
- `plugins/prc-block-library/src/tabs/class-tabs.php`
- `plugins/prc-block-library/src/tabs/style.scss`
- `plugins/prc-block-library/src/tab/edit.jsx`
- `plugins/prc-block-library/src/tab/save.jsx`
- `plugins/prc-block-library/src/tab/class-tab.php`

**Review Mode**: On-Demand Component Review

**Overall Assessment**: The tabs block has strong accessibility foundations with proper ARIA roles, keyboard navigation, and focus management. However, there are several critical issues that need addressing, particularly around ARIA label associations and live region announcements for state changes.

---

## Critical Issues (WCAG Failures) 🔴

_These issues violate WCAG 2.1 Level AA and must be fixed._

### 1. Missing Accessible Tab Label for Screen Readers - WCAG 2.4.6, 4.1.2

**File**: `plugins/prc-block-library/src/tabs/class-tabs.php:193-201`

**Issue**: The tab labels are rendered as anchor links (`<a>`) but use `html_entity_decode()` which could introduce unescaped HTML. More critically, there's no validation that the label content is meaningful or non-empty.

**Impact**: Screen reader users may encounter empty or confusing tab labels, making navigation impossible. Users with cognitive disabilities need clear, descriptive labels to understand tab purpose.

**Current Code**:

```php
return wp_sprintf(
    '<a id="tab__%1$s" class="tabs__tab-label" href="#%1$s" role="tab" aria-controls="%1$s" data-wp-on--click="actions.handleTabClick" data-wp-on--keydown="actions.handleTabKeyDown" data-wp-bind--aria-selected="state.isActiveTab" data-wp-bind--tabindex="state.tabIndexAttribute">%2$s</a>',
    $tab['id'],
    html_entity_decode( $tab['label'] ),
);
```

**Recommended Fix**:

```php
// Validate label is not empty
$label = trim( html_entity_decode( $tab['label'] ) );
if ( empty( $label ) ) {
    $label = sprintf( __( 'Tab %d', 'prc-block-library' ), $tab_index + 1 );
}

return wp_sprintf(
    '<a id="tab__%1$s" class="tabs__tab-label" href="#%1$s" role="tab" aria-controls="%1$s" data-wp-on--click="actions.handleTabClick" data-wp-on--keydown="actions.handleTabKeyDown" data-wp-bind--aria-selected="state.isActiveTab" data-wp-bind--tabindex="state.tabIndexAttribute">%2$s</a>',
    $tab['id'],
    esc_html( $label ),
);
```

**Rule Reference**: `EmptyLinkRule`, `LinkAmbiguousTextRule`

---

### 2. Incorrect tabindex Binding Logic - WCAG 2.4.3, 2.1.1

**File**: `plugins/prc-block-library/src/tabs/view.js:59-63`

**Issue**: The `tabIndexAttribute` state returns `-1` for active tab and `0` for inactive tabs. This is backwards - the active tab should have `tabindex="0"` to be focusable, and inactive tabs should have `tabindex="-1"` to be removed from tab order.

**Impact**: Keyboard users cannot tab into the currently active tab, breaking keyboard navigation. This violates WCAG requirement that all interactive elements must be keyboard accessible.

**Current Code**:

```javascript
get tabIndexAttribute() {
    return state.isActiveTab ? -1 : 0;
},
```

**Recommended Fix**:

```javascript
/**
 * The value of the tabindex attribute.
 * Active tab should be in tab order (0), inactive tabs should not (-1).
 *
 * @type {number}
 */
get tabIndexAttribute() {
    return state.isActiveTab ? 0 : -1;
},
```

**Rule Reference**: `TabOrderModifiedRule`

---

### 3. Missing Live Region Announcement for Tab Changes - WCAG 4.1.3

**File**: `plugins/prc-block-library/src/tabs/view.js:112-129` & `class-tabs.php`

**Issue**: When users change tabs (via click or keyboard), there's no `aria-live` announcement to inform screen reader users that the content has changed. The `setActiveTab` action silently updates the context without notifying assistive technology.

**Impact**: Screen reader users won't know when tab content changes, especially if focus remains on the tab label. They may miss critical content updates or not realize a new tab panel is now visible.

**Current Code**:

```javascript
setActiveTab: (tabIndex, scrollToTab = false) => {
    const context = getContext();
    context.activeTabIndex = tabIndex;
    if (scrollToTab) {
        const tabId = state.tabsList[tabIndex].id;
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
            setTimeout(() => {
                tabElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
},
```

**Recommended Fix**:

Add a live region to the PHP render:

```php
// In class-tabs.php render_block_callback, after tabs list:
$live_region = '<div class="tabs__status" role="status" aria-live="polite" aria-atomic="true" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;"></div>';

$content = preg_replace(
    '/<(?:div|ul)\s+[^>]*class="[^"]*\btabs__list\b[^"]*"[^>]*>.*?<\/(?:div|ul)>/is',
    '<div class="tabs__list" role="tablist">' . $tabs_list_markup . '</div>' . $live_region,
    (string) $updated_content,
    1
);
```

Update the action:

```javascript
setActiveTab: (tabIndex, scrollToTab = false) => {
    const context = getContext();
    const { tabsList } = state;
    const newTab = tabsList[tabIndex];

    context.activeTabIndex = tabIndex;

    // Announce tab change to screen readers
    const statusRegion = document.querySelector('.tabs__status');
    if (statusRegion && newTab) {
        statusRegion.textContent = `${newTab.label} tab selected`;
    }

    if (scrollToTab) {
        const tabId = newTab.id;
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
            setTimeout(() => {
                tabElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
},
```

**Rule Reference**: WCAG 4.1.3 Status Messages

---

### 4. Tab Panel Not Properly Hidden from Screen Readers - WCAG 1.3.1, 4.1.2

**File**: `plugins/prc-block-library/src/tab/class-tab.php:81`

**Issue**: The `data-wp-bind--hidden` attribute uses the HTML `hidden` attribute, but this doesn't always hide content from screen readers depending on CSS override. The proper ARIA pattern requires `aria-hidden="true"` on inactive tab panels.

**Impact**: Screen reader users may hear content from multiple tab panels at once, causing confusion and cognitive overload.

**Current Code**:

```php
$tag_processor->set_attribute( 'data-wp-bind--hidden', '!state.isActiveTab' );
```

**Recommended Fix**:

```php
// Remove the hidden binding
// $tag_processor->set_attribute( 'data-wp-bind--hidden', '!state.isActiveTab' );

// Add proper ARIA hidden binding
$tag_processor->set_attribute( 'data-wp-bind--aria-hidden', '!state.isActiveTab' );

// Also add display:none via style binding
$tag_processor->set_attribute( 'data-wp-bind--style.display', 'state.isActiveTab ? "block" : "none"' );
```

**Rule Reference**: WCAG 1.3.1 Info and Relationships

---

## Warnings (Best Practice Violations) ⚠️

_These issues don't violate WCAG but could improve accessibility._

### 1. Missing Focus Management After Tab Activation

**File**: `plugins/prc-block-library/src/tabs/view.js:112-129`

**Observation**: When a tab is activated via keyboard, focus should move to the newly activated tab panel to help screen reader users understand the context change. Currently focus remains on the tab label.

**Recommendation**: Consider moving focus to the tab panel when activated, or at least ensure the panel is announced properly via live region (addressed in Critical Issue #3).

**Example**:

```javascript
setActiveTab: (tabIndex, scrollToTab = false) => {
    const context = getContext();
    const { tabsList } = state;
    const newTab = tabsList[tabIndex];

    context.activeTabIndex = tabIndex;

    // Announce change
    const statusRegion = document.querySelector('.tabs__status');
    if (statusRegion && newTab) {
        statusRegion.textContent = `${newTab.label} tab selected`;
    }

    // Optionally move focus to panel
    const panel = document.getElementById(newTab.id);
    if (panel && scrollToTab) {
        setTimeout(() => {
            panel.focus();
            panel.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
},
```

---

### 2. Home/End Key Navigation Not Implemented

**File**: `plugins/prc-block-library/src/tabs/view.js:68-97`

**Observation**: The WAI-ARIA tabs pattern recommends Home key to focus first tab and End key to focus last tab. This is not implemented.

**Recommendation**: Add Home/End key handlers for better keyboard navigation.

**Example**:

```javascript
handleTabKeyDown: withSyncEvent((event) => {
    const { isVertical } = getContext();
    const { tabIndex, tabsList } = state;

    if (event.key === 'Home') {
        event.preventDefault();
        actions.setActiveTab(0);
    } else if (event.key === 'End') {
        event.preventDefault();
        actions.setActiveTab(tabsList.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (tabIndex !== null) {
            actions.setActiveTab(tabIndex);
        }
    }
    // ... rest of arrow key handling
}),
```

---

### 3. Editor Tab Label Button Accessibility

**File**: `plugins/prc-block-library/src/tab/edit.jsx:176-203`

**Observation**: The editor uses a `<button>` with nested `<RichText>` for the tab label. This is good, but the button's `tabIndex={0}` is redundant (buttons are focusable by default), and the keyboard handler could be more comprehensive.

**Recommendation**: Remove redundant `tabIndex` and ensure Space key also activates the tab.

**Example**:

```jsx
<button
    aria-controls={tabPanelId}
    aria-selected={isSelectedTab}
    id={tabLabelId}
    role="tab"
    className={clsx(
        'tabs__tab-label',
        tabItemColorProps.className
    )}
    style={{
        ...tabItemColorProps.style,
    }}
    // tabIndex={0} // Remove - buttons are focusable by default
    onClick={(event) => {
        event.preventDefault();
        selectBlock(clientId);
    }}
    onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !event.shiftKey) {
            event.preventDefault();
            selectBlock(clientId);
            timeoutRef.current = setTimeout(() => {
                labelRef.current.focus();
            }, 100);
        }
    }}
>
```

---

### 4. Color Contrast Not Validated in Custom Colors

**File**: `plugins/prc-block-library/src/tabs/style.scss:10-15`

**Observation**: The block allows custom tab colors via attributes, but there's no validation that text/background color combinations meet WCAG AA contrast requirements (4.5:1 for normal text).

**Recommendation**: Add a `ContrastChecker` component in the controls to validate custom color choices, similar to the core Button block pattern.

**Example**:

```jsx
import { ContrastChecker } from '@wordpress/block-editor';

// In controls.jsx
<ContrastChecker
	backgroundColor={tabActiveColor}
	textColor={tabActiveTextColor}
	fontSize={fontSize}
/>;
```

---

## ESLint Accessibility Disables Requiring Review 📋

_Each accessibility rule disable should be justified or fixed._

No ESLint accessibility disables found in the reviewed files. ✅

---

## Positive Patterns Found ✅

_Good accessibility implementations worth highlighting._

- **Proper ARIA Roles** (`tabs/class-tabs.php:193`): Correct use of `role="tablist"`, `role="tab"`, and `role="tabpanel"` throughout
- **Keyboard Navigation** (`tabs/view.js:68-97`): Comprehensive arrow key navigation for both horizontal and vertical orientations
- **Semantic HTML** (`tab/edit.jsx:176`): Uses `<button>` for tab labels in editor, not `<div>` or `<a>` with click handlers
- **Focus Visible Styles** (`tabs/style.scss:97-100`): Proper `:focus-visible` styles with outline and offset
- **aria-controls Association** (`tabs/class-tabs.php:193`): Tab labels properly reference their panels via `aria-controls`
- **Dynamic Orientation** (`tabs/view.js:72-92`): Keyboard navigation adapts to vertical/horizontal orientation
- **URL Hash Navigation** (`tabs/view.js:134-147`): Tabs can be deep-linked via URL hash, then auto-activated with scroll
- **Interactivity API Integration**: Proper use of WordPress Interactivity API for state management while maintaining accessibility

---

## Testing Recommendations 🧪

### Manual Testing

1. **Keyboard Navigation**:
    - Tab to first tab label, verify focus visible
    - Use Arrow Left/Right (horizontal) or Arrow Up/Down (vertical) to navigate between tabs
    - Press Enter on each tab, verify panel content changes
    - Tab into tab panel content, verify it's focusable
    - Test Home/End keys once implemented

2. **Screen Reader**:
    - Test with NVDA/JAWS/VoiceOver
    - Verify tab list is announced as "tab list"
    - Verify each tab announces its label, selected state, and "X of Y"
    - Verify tab panel content is announced when activated
    - Verify inactive panels are not read
    - Test tab change announcements (once live region added)

3. **Browser Zoom**:
    - Test at 200% zoom
    - Verify tab labels don't overflow or truncate
    - Verify horizontal scrolling works if tab list exceeds viewport

4. **High Contrast Mode**:
    - Test in Windows High Contrast mode
    - Verify focus indicators remain visible
    - Verify selected tab is distinguishable from inactive tabs

### Automated Testing (Playwright)

```javascript
// Suggested test structure for tests/tabs-accessibility.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Tabs Block Accessibility', () => {
	test.beforeEach(async ({ page }) => {
		// Create a post with tabs block
		await page.goto('/wp-admin/post-new.php');
		// Insert tabs block via block inserter
		// ... setup code
	});

	test('should not have automatically detectable accessibility issues', async ({
		page,
	}) => {
		// Publish and view the post
		await page.goto('/sample-post-with-tabs');

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('should be keyboard navigable', async ({ page }) => {
		await page.goto('/sample-post-with-tabs');

		// Tab to first tab
		await page.keyboard.press('Tab');
		const firstTab = page.locator('.tabs__tab-label').first();
		await expect(firstTab).toBeFocused();

		// Arrow right to second tab
		await page.keyboard.press('ArrowRight');
		const secondTab = page.locator('.tabs__tab-label').nth(1);
		await expect(secondTab).toBeFocused();

		// Press Enter to activate
		await page.keyboard.press('Enter');
		const secondPanel = page.locator('[role="tabpanel"]').nth(1);
		await expect(secondPanel).toBeVisible();
		await expect(secondPanel).toHaveAttribute('aria-hidden', 'false');
	});

	test('should have proper ARIA attributes', async ({ page }) => {
		await page.goto('/sample-post-with-tabs');

		// Check tablist
		const tablist = page.locator('[role="tablist"]');
		await expect(tablist).toBeVisible();

		// Check tabs
		const tabs = page.locator('[role="tab"]');
		await expect(tabs).toHaveCount(3);

		// Check first tab is selected by default
		const firstTab = tabs.first();
		await expect(firstTab).toHaveAttribute('aria-selected', 'true');
		await expect(firstTab).toHaveAttribute('tabindex', '0');

		// Check other tabs not selected
		const secondTab = tabs.nth(1);
		await expect(secondTab).toHaveAttribute('aria-selected', 'false');
		await expect(secondTab).toHaveAttribute('tabindex', '-1');

		// Check panels
		const panels = page.locator('[role="tabpanel"]');
		await expect(panels).toHaveCount(3);

		// Check first panel visible
		const firstPanel = panels.first();
		await expect(firstPanel).toBeVisible();
		await expect(firstPanel).toHaveAttribute('aria-hidden', 'false');
	});

	test('should announce state changes to screen readers', async ({
		page,
	}) => {
		await page.goto('/sample-post-with-tabs');

		// Check for live region (once implemented)
		const liveRegion = page.locator('[role="status"][aria-live="polite"]');
		await expect(liveRegion).toBeAttached();

		// Click second tab
		const secondTab = page.locator('[role="tab"]').nth(1);
		await secondTab.click();

		// Verify live region updated
		await expect(liveRegion).toContainText('tab selected');
	});

	test('should work with vertical orientation', async ({ page }) => {
		// Create vertical tabs
		await page.goto('/sample-post-with-vertical-tabs');

		// Tab to first tab
		await page.keyboard.press('Tab');
		const firstTab = page.locator('.tabs__tab-label').first();
		await expect(firstTab).toBeFocused();

		// Arrow down to second tab (not arrow right)
		await page.keyboard.press('ArrowDown');
		const secondTab = page.locator('.tabs__tab-label').nth(1);
		await expect(secondTab).toBeFocused();
	});

	test('should support URL hash navigation', async ({ page }) => {
		await page.goto('/sample-post-with-tabs#tab-2');

		// Wait for interactivity to initialize
		await page.waitForTimeout(500);

		// Check second tab is active
		const secondTab = page.locator('[role="tab"]').nth(1);
		await expect(secondTab).toHaveAttribute('aria-selected', 'true');

		const secondPanel = page.locator('[role="tabpanel"]').nth(1);
		await expect(secondPanel).toBeVisible();
	});
});
```

**Integration**: Add to existing test suite in `/tests/` directory. May need to add `@axe-core/playwright` dependency:

```bash
npm install --save-dev @axe-core/playwright
```

---

## Resources 📚

### WCAG References

- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) - All functionality available from keyboard
- [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html) - Logical tab order
- [WCAG 2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html) - Descriptive labels
- [WCAG 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html) - Accessible names for components
- [WCAG 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html) - Announce dynamic changes
- [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) - Official ARIA tabs implementation guide

### PRC Platform Patterns

- **Accessibility Checker Rules**: `plugins/accessibility-checker/includes/classes/Rules/Rule/`
    - `EmptyButtonRule.php` - Empty interactive elements
    - `LinkAmbiguousTextRule.php` - Descriptive link text
    - `TabOrderModifiedRule.php` - Tab order management
- **Block Library Examples**: `plugins/prc-block-library/src/accordion/` - Similar collapsible pattern with good accessibility
- **Development Guidelines**: `docs/DEVELOPMENT_GUIDELINES.md` - Block-first architecture requirements

### Tools & Documentation

- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for testing
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [MDN ARIA Tabs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role) - Tab role documentation
- [WordPress Accessibility Handbook](https://make.wordpress.org/accessibility/handbook/) - WP-specific guidance
- [Inclusive Components: Tabbed Interfaces](https://inclusive-components.design/tabbed-interfaces/) - Heydon Pickering's excellent guide

---

## Summary & Next Steps

**Total Issues**: 4 Critical, 4 Warnings, 0 ESLint Reviews

**Priority Actions**:

1. **Fix tabindex logic** (Critical #2) - Immediate, simple fix that breaks keyboard navigation
2. **Add live region announcements** (Critical #3) - Essential for screen reader users
3. **Fix tab panel hiding** (Critical #4) - Prevents screen readers from reading inactive content
4. **Validate tab labels** (Critical #1) - Prevents empty/invalid labels from being rendered
5. **Add Home/End key support** (Warning #2) - Improves keyboard UX
6. **Implement ContrastChecker** (Warning #4) - Validates custom color choices

**Estimated Effort**: 4-6 hours

- Critical fixes: 2-3 hours
- Warning improvements: 1-2 hours
- Testing: 1 hour

**Notes**: The tabs block has a solid foundation with proper ARIA roles and keyboard navigation structure. The issues found are primarily implementation details that can be fixed without major refactoring. The use of WordPress Interactivity API is appropriate and maintains good separation of concerns. Once the critical issues are addressed, this will be a highly accessible tabs implementation that exceeds most common tabs patterns found on the web.
