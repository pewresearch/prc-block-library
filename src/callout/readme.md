## Callout Block

### Supports
- Right and Left Align
- Limited selection of content specific innerblocks
- 1 Attribute: `size`

### Dev Notes

The callout block creates a `.ui.segment.biege` div that supports the following innerblocks:

``` JS
const ALLOWED_BLOCKS = [
    'core/image',
    'core/paragraph',
    'core/heading',
    'core/list',
    'prc-block/button',
];
```

This block has 1 attribute: `size`. The `size` attribute controls the width by applying a class of `.size-{x}` with width set to 100% and max-width set to the corresponding width.