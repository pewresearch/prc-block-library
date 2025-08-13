## Block Bits

A way to add dynamic content inside richttext. 

Utilizes custom formats with registerFormatType and wp_html_tag_processor to add dynamic content or iAPI directives. 

This is going to be a central registry for all our block bits. We'll provide:
1. A helper function for blocks to register a block bit, this will require a wodpress/data redux store.
2. A render_block function that will run late and apply a filter so that blocks can decide how to render their block bit.
3. A common style in the editor to identify the block bit.
4. A block toolbar button to add the bit/open the bit gallery/modal. 
5. A modal to display all the registered bits. 
6. When clicking on a bit it will toggleFormat the custom format on the selected text.
