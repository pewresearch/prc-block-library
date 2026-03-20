# Form Input Radio Group

A container block that groups `form-input-checkbox` blocks into a set of mutually exclusive radio buttons. Manages radio selection logic -- when one radio is selected, all siblings are unchecked. Hoists the selected value to the parent form's state.

## Namespace

`prc-block/form-input-radio-group`

## Category

`forms`

## Supports

| Feature | Value |
|---------|-------|
| Anchor | `true` |
| Color (text) | `true` |
| Color (background) | `true` |
| Layout (type) | `flex` |
| Spacing (margin) | `true` |
| Spacing (padding) | `true` |
| Spacing (blockGap) | `true` |
| Typography (fontSize) | `true` |
| Typography (lineHeight) | `true` |
| HTML | `false` |

## Attributes

| Attribute | Type | Default | Source | Description |
|-----------|------|---------|--------|-------------|
| `label` | `string` | `""` | `html` (selector: `legend`) | Group label displayed above the radio options, editable via RichText. |
| `required` | `boolean` | `false` | -- | Whether a selection is required before form submission. |
| `metadata` | `object` | `undefined` | -- | Contains `name` (field identifier for form data). Auto-generated from label as camelCase. |

## Available Styles

| Style | Slug | Description |
|-------|------|-------------|
| Default | `default` | Standard radio button group with visible radio inputs. |
| Label Only | `label-only` | Hides radio inputs and displays labels as selectable chips/tags. |

## Inner Blocks

| Block | Description |
|-------|-------------|
| `prc-block/form-input-checkbox` | Radio button inputs. The radio group overrides each child's `type` to `"radio"` and sets `interactiveNamespace` to `prc-block/form-input-radio-group`. |

Only `prc-block/form-input-checkbox` is allowed as a direct child (enforced via `allowedBlocks` in `block.json`).

### Default Template

Two `prc-block/form-input-checkbox` blocks with `type: "radio"`, labeled "Option A" and "Option B".

## Parent / Ancestor Requirements

No explicit parent constraint, but designed to function inside a `prc-block/form` container.

## Usage Instructions

1. Insert the **Radio Group** block.
2. Type a group label (e.g., "Preferred Contact Method").
3. Add `form-input-checkbox` blocks inside as radio options. Each child needs a unique `value` attribute and a descriptive label.
4. The group name is auto-generated from the label in camelCase. Override it in the inspector if needed.
5. Toggle **Required** if a selection must be made before submission.

### Label-Only Style

Apply the **Label Only** block style to render radio options as clickable chips without visible radio inputs. Useful for compact selection UIs.

## Block Markup Example

```html
<!-- wp:prc-block/form-input-radio-group {"metadata":{"name":"contactMethod"}} -->
<fieldset class="wp-block-prc-block-form-input-radio-group">
  <legend>Preferred Contact Method</legend>
  <div class="wp-block-prc-block-form-input-radio-group__options">
    <!-- wp:prc-block/form-input-checkbox {"type":"radio","value":"email"} -->
    <div class="wp-block-prc-block-form-input-checkbox">
      <input type="radio" value="email" />
      <label>Email</label>
    </div>
    <!-- /wp:prc-block/form-input-checkbox -->

    <!-- wp:prc-block/form-input-checkbox {"type":"radio","value":"phone"} -->
    <div class="wp-block-prc-block-form-input-checkbox">
      <input type="radio" value="phone" />
      <label>Phone</label>
    </div>
    <!-- /wp:prc-block/form-input-checkbox -->
  </div>
</fieldset>
<!-- /wp:prc-block/form-input-radio-group -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-radio-group.php`.

### Render Pipeline

1. **Inner Block Modification** (`hook_inner_blocks`): A `render_block` filter runs on child `prc-block/form-input-checkbox` blocks and:
   - Overrides `type` to `"radio"` (ensures checkbox children behave as radios)
   - Sets `interactiveNamespace` to `prc-block/form-input-radio-group` (redirects event handling to this block's store)
2. **Interactivity Setup**: Wraps the block with `data-wp-interactive="prc-block/form-input-radio-group"` and context containing `targetNamespace` (parent form namespace).
3. **Field Registration**: Registers the group as a single field of type `radioGroup` in the parent form's `formFields` state via `wp_interactivity_state()`.

### Interactive Subsumption

This block demonstrates the "interactive subsumption" pattern: child checkbox blocks render with their click events pointing to `prc-block/form-input-radio-group` instead of `prc-block/form`. The radio group handles selection logic internally and then hoists the final value to the parent form.

## Frontend Interactivity

**Store Namespace:** `prc-block/form-input-radio-group`

### Actions

| Action | Description |
|--------|-------------|
| `onInputCheckboxClick` | Handles clicks on child radio inputs. Reads the clicked input's value and checked state. Iterates all sibling radio inputs in the group and unchecks them (mutual exclusion). Then triggers `onValueChange` to propagate the selected value. |

### Callbacks

| Callback | Description |
|----------|-------------|
| `onValueChange` | Generator callback. Retrieves the target namespace from context and sets the radio group's value in the parent form's `formFields` state. Uses `withSyncEvent` to synchronize with the Interactivity API store. |

### Interaction Flow

1. User clicks a radio option inside the group.
2. The child checkbox fires `onInputCheckboxClick` on the `prc-block/form-input-radio-group` namespace (not `prc-block/form`).
3. The radio group's handler unchecks all sibling radios and checks the clicked one.
4. `onValueChange` propagates the selected value to the parent form's `formFields[groupName]`.

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Parent form container. Receives the selected radio value in `formFields`. |
| `prc-block/form-input-checkbox` | Required child block. Each instance acts as a radio option within the group. |
