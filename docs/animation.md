# Screen Animation

Add fun screen effects like confetti and emojis to celebrate user interactions.

## Block Metadata

| Property   | Value                    |
|------------|--------------------------|
| Name       | `prc-block/animation`    |
| Title      | Screen Animation         |
| Category   | `design`                 |
| Version    | `1.0.0`                  |
| API        | 3                        |
| Textdomain | `animation`              |

## Attributes

| Attribute   | Type     | Default  | Enum Values                    | Description |
|-------------|----------|----------|--------------------------------|-------------|
| `animation` | `string` | --       | `confetti`, `emoji`            | The type of animation to display. |
| `emoji`     | `string` | --       | --                             | The emoji character to use when animation type is `emoji`. |
| `effect`    | `string` | --       | `center`, `fireworks`, `rain`  | The visual effect pattern for the animation. |
| `speed`     | `number` | `5000`   | --                             | Duration of the animation in milliseconds. Lower values mean faster animations. |

## Supports

| Feature | Enabled | Notes |
|---------|---------|-------|
| Anchor | Yes | |
| HTML editing | No | |
| Reusable | Yes | |
| Interactivity API | Yes | |
| Spacing: padding | Yes | |
| Spacing: margin | Yes | |

## Inner Blocks

This is a container block. It can optionally hold inner blocks that serve as an anchor for the animation. The default template includes a single `core/paragraph` with placeholder text. If no inner blocks are present and the block is not selected, a warning message is displayed in the editor.

## Inspector Controls

- **Animation** panel:
  - **Animation** select: Choose between `Confetti` and `Emoji`.
  - **Effect** select: Choose between `Center`, `Fireworks`, and `Rain`.
  - **Emoji** text input: Visible only when animation type is `emoji`. Enter the emoji character to use.
  - **Speed** number input: Animation duration in milliseconds.

## Usage Instructions

1. Insert the **Screen Animation** block.
2. Choose an animation type (Confetti or Emoji) in the sidebar.
3. Select an effect pattern (Center, Fireworks, or Rain).
4. If using Emoji, enter the desired emoji character.
5. Adjust the speed as needed (default 5000ms).
6. Optionally add inner blocks to anchor the animation to specific content.
7. The animation is triggered programmatically on the frontend by setting the block's `enabled` state to `true` in the Interactivity API store.

## Block Markup Example

```html
<div class="wp-block-prc-block-animation"
     id="prc-block-animation-abc123"
     data-wp-interactive="prc-block/animation"
     data-wp-watch--do-animation="callbacks.onAnimate"
     data-wp-context='{"id":"prc-block-animation-abc123"}'>
    <p>Optional anchor content here.</p>
</div>
```

## PHP Rendering

The `render_block_callback` in `class-animation.php`:

1. Generates a unique block ID (`prc-block-animation-{uniqid}`).
2. Registers the animation configuration in the Interactivity API state via `wp_interactivity_state()`, including: `animation`, `effect`, `emoji`, `speed`, and `enabled` (initially `false`).
3. Adds Interactivity API directives to the wrapper element: `data-wp-interactive`, `data-wp-watch--do-animation`, and `data-wp-context`.

## Frontend Interactivity

The `view.js` file registers an Interactivity API store under `prc-block/animation`. The animation is powered by the [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) library, loaded dynamically from CDN when needed.

### State
- `isAnimating`: Derived state that checks if the current block's `enabled` flag is `true`.

### Actions (all generator functions)

| Action | Description |
|--------|-------------|
| `explodeConfettiFireworks(speed)` | Confetti particles launched from left and right sides in alternating bursts. |
| `explodeConfettiFromCenterOfScreen(speed)` | Single confetti burst from the center with a layered follow-up burst. |
| `explodeEmojiFireworks(emoji, speed)` | Same as confetti fireworks but using a custom emoji shape. |
| `explodeEmojiFromCenterOfScreen(emoji, speed)` | Same as center confetti but using a custom emoji shape. |
| `rainConfetti(speed)` | Confetti particles falling from the top of the screen like rain. |
| `rainEmoji(emoji, speed)` | Emoji particles falling from the top like rain. |

### Callbacks
- `onAnimate`: Watches the `isAnimating` state. When `true`, loads the confetti script and dispatches the appropriate animation action based on the `animation` and `effect` combination. Will not run if the parent element is hidden.

### Animation Matrix

| Animation | Effect     | Action Called |
|-----------|------------|---------------|
| confetti  | center     | `explodeConfettiFromCenterOfScreen` |
| confetti  | fireworks  | `explodeConfettiFireworks` |
| confetti  | rain       | `rainConfetti` |
| emoji     | center     | `explodeEmojiFromCenterOfScreen` |
| emoji     | fireworks  | `explodeEmojiFireworks` |
| emoji     | rain       | `rainEmoji` |

## Styles

```css
.wp-block-prc-block-animation {
    position: relative;
}
```

## Related Blocks

This block is standalone and does not have direct block dependencies. It is typically used in conjunction with form blocks or interactive elements that trigger the animation programmatically.
