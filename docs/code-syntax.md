# Code Syntax

Write syntax-highlighted code with automatic language detection. Language can also be set manually.

## Block Metadata

| Property    | Value                    |
|-------------|--------------------------|
| Namespace   | `prc-block/code-syntax`  |
| Category    | `text`                   |
| Version     | `0.1.0`                  |
| API Version | `3`                      |

## Supports

| Feature         | Value                              |
|-----------------|------------------------------------|
| Align           | `full`, `wide`, `center`           |
| Anchor          | `true`                             |
| HTML editing    | `false`                            |
| Spacing margin  | `top`, `bottom`                    |
| Spacing padding | `true` (default controls enabled)  |
| Font size       | `true` (default controls enabled)  |
| Font family     | `false`                            |

## Attributes

| Attribute          | Type     | Default      | Description                                                                          |
|--------------------|----------|--------------|--------------------------------------------------------------------------------------|
| `orientation`      | `string` | `"vertical"` | Layout orientation of the code block.                                                |
| `value`            | `string` | —            | The code content. Sourced from the inner `<code>` element's HTML.                    |
| `forceLanguage`    | `string` | `""`         | Override the auto-detected language. Set to a specific language name to force it.     |
| `detectedLanguage` | `string` | `""`         | The language detected automatically by highlight.js. Updated on each content change. |

## Available Styles

| Style Name  | Label       | Default |
|-------------|-------------|---------|
| `default`   | Default     | Yes     |
| `dark-mode` | Dark theme  | No      |

The default style uses a GitHub light theme; the dark-mode style uses a GitHub dark theme (CSS loaded from `themes/github.css` and `themes/github-dark.css`).

## Inner Blocks

None. This is not a container block.

## Parent/Ancestor Requirements

None. Can be placed anywhere.

## Block Transforms

- **From `core/code`**: Converts a core Code block to Code Syntax, mapping `content` to `value`.
- **To `core/code`**: Converts Code Syntax back to core Code, mapping `value` to `content`.

## Usage Instructions

1. Insert the **Code Syntax** block from the block inserter (under the Text category).
2. Type or paste code into the editable area. The block uses a `RichText` field with plain-text paste and no formatting controls.
3. The block auto-detects the programming language using highlight.js. Supported languages for auto-detection: **R, Python, PHP, HTML, JavaScript, JSON, Bash, SQL**.
4. To override the detected language, use the **toolbar dropdown** to select a specific language or return to auto-detect mode.
5. A live syntax-highlighted preview appears above the edit area when content is present.
6. A **Copy** button is rendered inline so users can copy the code to their clipboard.

## Block Markup Example

Saved markup in `post_content`:

```html
<pre>
  <code class="wp-block-prc-block-code-syntax__edit">&lt;?php
 echo 'Hello World!';
 ?&gt;</code>
</pre>
```

## PHP Rendering

The `Code_Syntax` PHP class provides a server-side render callback that wraps the saved `<pre><code>` markup:

- Enqueues the `prc-font-monospace` stylesheet (Adobe Typekit monospace font).
- Outputs a wrapper `<div>` with block wrapper attributes and a `data-language` attribute set to either the forced language or the auto-detected language.
- Injects an empty `<div class="wp-block-prc-block-code-syntax__ui"></div>` element used by the frontend view script to mount the Copy button.

Rendered output:

```html
<div class="wp-block-prc-block-code-syntax" data-language="PHP">
  <div class="wp-block-prc-block-code-syntax__ui"></div>
  <pre><code>...</code></pre>
</div>
```

## Frontend Interactivity

The `view.js` script runs on `domReady` and performs the following:

1. Selects all `.wp-block-prc-block-code-syntax` elements on the page.
2. Reads the `data-language` attribute and adds the corresponding `language-*` class to the `<code>` element.
3. Runs `hljs.highlightElement()` for client-side syntax highlighting.
4. Renders a **CopyText** React component into the `.wp-block-prc-block-code-syntax__ui` container, providing a click-to-copy button that copies the code text to the clipboard and shows a brief "Copied" confirmation.

## Related Blocks

- `core/code` — The built-in WordPress code block. Code Syntax provides transforms to/from this block.
