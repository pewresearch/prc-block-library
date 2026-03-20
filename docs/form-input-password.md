# Form Input Password

A container block that provides password input functionality with optional strength analysis and confirmation field. Wraps `form-input-text` blocks configured as password fields and injects a visual password analyzer that validates against multiple strength conditions (lowercase, uppercase, numbers, special characters, length, and confirmation match).

## Namespace

`prc-block/form-input-password`

## Category

`forms`

## Supports

| Feature | Value |
|---------|-------|
| Anchor | `true` |
| Interactivity | `true` |
| Spacing (margin) | `true` |
| Spacing (padding) | `true` |
| Spacing (blockGap) | `true` |
| Layout (type) | `flex` (orientation: vertical) |
| HTML | `false` |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `includesConfirmation` | `boolean` | `false` | When true, the block includes a confirmation password field and enables the full password strength analyzer with match validation. |

## Available Styles

None defined.

## Inner Blocks

| Block | Description |
|-------|-------------|
| `prc-block/form-input-text` | Used for the password and confirmation input fields (type set to `"password"`). |
| `core/group` | Layout container for grouping inner elements. |

### Default Template

**Without confirmation:**
- One `prc-block/form-input-text` with `type: "password"` and `metadata.name: "password"`

**With confirmation:**
- One `prc-block/form-input-text` with `type: "password"` and `metadata.name: "password"`
- One `prc-block/form-input-text` with `type: "password"` and `metadata.name: "passwordConfirmation"`

## Parent / Ancestor Requirements

No explicit parent constraint, but designed to function inside a `prc-block/form` container.

## Usage Instructions

### Basic Password Field

Insert the **Password** variation for a single password input without strength analysis.

### Password with Confirmation

Insert the **Password with Confirmation** variation. This adds:
1. A primary password field
2. A confirmation password field (initially disabled until the primary password meets strength requirements)
3. A visual password analyzer showing condition status

### Password Strength Conditions

The analyzer validates seven conditions:

| Condition | Requirement |
|-----------|-------------|
| Lowercase | At least one lowercase letter |
| Uppercase | At least one uppercase letter |
| Number | At least one digit |
| Special Character | At least one special character |
| Length | Minimum 12 characters |
| No Invalid Characters | No disallowed characters |
| Confirmation Match | Password and confirmation fields match (only when `includesConfirmation` is true) |

Each condition displays with a green checkmark when met or a red X when not.

## Block Markup Example

```html
<!-- wp:prc-block/form-input-password {"includesConfirmation":true} -->
<div class="wp-block-prc-block-form-input-password">
  <!-- wp:prc-block/form-input-text {"type":"password","metadata":{"name":"password"}} -->
  <!-- /wp:prc-block/form-input-text -->

  <!-- wp:prc-block/form-input-text {"type":"password","metadata":{"name":"passwordConfirmation"}} -->
  <!-- /wp:prc-block/form-input-text -->

  <div class="wp-block-prc-block-form-input-password__analyzer"></div>
</div>
<!-- /wp:prc-block/form-input-password -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-password.php`.

### Render Pipeline

1. **Interactivity Setup**: Wraps the block with `data-wp-interactive="prc-block/form-input-password"` and its own context containing `targetNamespace` (pointing to the parent form).
2. **Analyzer Injection**: When `includesConfirmation` is true, injects the password analyzer markup after the inner blocks. The analyzer contains a `<ul>` with `<li>` items for each strength condition, each bound to state via `data-wp-bind--class` and `data-wp-text`.
3. **Condition Bindings**: Each condition `<li>` has:
   - `data-wp-bind--class` bound to a state getter that returns `"met"` or `"unmet"`
   - `data-wp-text` bound to a state getter that returns the condition label with a checkmark or X prefix
4. **Field Registration**: Registers the password field in the target form's `formFields` state via `wp_interactivity_state()`.

## Frontend Interactivity

**Store Namespace:** `prc-block/form-input-password`

### State

| Key | Type | Description |
|-----|------|-------------|
| `passwordValue` | `string` | Current value of the primary password field. |
| `confirmationValue` | `string` | Current value of the confirmation field. |
| `conditions` | `object` | Map of condition keys to `{met: boolean, label: string}`. |

### State Getters

Each condition has a class getter and text getter:
- `state.lowercaseClass` / `state.lowercaseText`
- `state.uppercaseClass` / `state.uppercaseText`
- `state.numberClass` / `state.numberText`
- `state.specialClass` / `state.specialText`
- `state.lengthClass` / `state.lengthText`
- `state.invalidClass` / `state.invalidText`
- `state.confirmationClass` / `state.confirmationText`

### Callbacks

| Callback | Description |
|----------|-------------|
| `onValueChange` | Generator callback. When the password value changes, propagates it to the parent form's `formFields` state via the target namespace. |
| `onPasswordAnalyzer` | Runs the strength check against all conditions whenever `passwordValue` or `confirmationValue` changes. Updates condition states. Enables/disables the confirmation field based on whether primary password conditions (excluding match) are all met. |

### Interaction Flow

1. User types in the password field.
2. The inner `form-input-text` block fires `onInputChange` on the parent form namespace.
3. The password block's `onPasswordAnalyzer` callback detects the value change and runs strength validation.
4. Condition indicators update in the analyzer UI.
5. When all non-confirmation conditions are met, the confirmation field is enabled.
6. When the confirmation field matches, the final condition is met.
7. `onValueChange` propagates the validated password to the parent form's state.

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Parent form container. Receives the password value in `formFields`. |
| `prc-block/form-input-text` | Inner block used for the actual password and confirmation `<input>` elements. |

### Variations

| Variation | Name | Description |
|-----------|------|-------------|
| Password | `password` | Single password field without confirmation or analyzer. |
| Password with Confirmation | `password-with-confirmation` | Password + confirmation fields with visual strength analyzer. Sets `includesConfirmation: true`. |
