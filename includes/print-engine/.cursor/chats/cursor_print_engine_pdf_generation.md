# Print engine PDF generation

_Exported on 1/1/2026 at 11:27:46 EST from Cursor (2.3.17)_

---

**User**

I want to create something I'm calling "print engine" @plugins/prc-block-library/includes/print-engine . The idea is basically it would generate a pdf off the print styles of the <article>. The print styles will be defined per block in the prc-block-library. We'll work on those later, right now I want to get the basics of the system and dynamic page generation needed for some of this.

The print engine needs to generate three dynamic pages in the pdf. First the cover sheet, which would include the post title, subtitle, and bylines, as well as recommended citation and static media contacts. Then the next page is an "about pew research center" page, this is static and wont change between each post. Then the table of contents. Then the rest of the article's print styling.

---

**Cursor**

Let me explore the existing structure and understand what's already in place before asking some clarifying questions.

Good, there's already a `print-engine` directory with some existing code. Let me examine what's already there:

Now I have a clear picture. The existing `print-engine` has basic CSS print styles and browser print handling. You want to extend this to generate actual PDFs with structured pages.

Based on the screenshots you provided, I can see:

1. **Cover sheet**: PRC logo, release date, title, subtitle, bylines, media contacts, and recommended citation
2. **About page**: Static "About Pew Research Center" content with copyright

Before I create a plan, I have a few clarifying questions:

---

**User**

What if it's actually a url endpoint like /pdf and that has the print styles always available even for the browser. This way we can visually preview the "print" version. So the print and frontend styles for this view are the same basically

---

**Cursor**

That's a cleaner approach. So you'd have:

- `/post-slug/` → Normal article view with regular styles
- `/post-slug/pdf/` → Print-styled view that serves as both a visual preview AND the source for PDF generation

The `/pdf` endpoint would:

1. Render the article with "print" styles as the default (not behind `@media print`)
2. Include the dynamic cover sheet, about page, and TOC as actual rendered HTML sections
3. Users can preview it in browser, then use browser print → "Save as PDF"

This also means you could potentially add a client-side "Download PDF" button on that view that programmatically triggers `window.print()` or uses a library like `html2pdf.js` for a cleaner one-click experience.

Let me check how the existing URL rewriting works in this codebase to ensure the `/pdf` endpoint fits cleanly:

I now understand the rewrite system. Let me also check how templates are loaded to understand the best approach for the `/pdf` view:

I have all the context I need. Let me create the plan for the Print Engine:

---

**User**

Instead of "Create templates/pdf-template.php with minimal HTML structure" lets just create a function in the print engine class to handle this instead of another file

---

**Cursor**

Good call - keeping it all in the class is cleaner and follows the pattern I saw in the embeds class where `template_default()` handles the output directly. Let me update the plan:

Updated. The plan now consolidates everything into `class-print-engine.php` with a `render_pdf_template()` method that outputs the full HTML document directly (following the same pattern as `template_default()` in the embeds class).

Here's the updated task list:

1. **endpoint-setup** - Register /pdf rewrite endpoint and query var
2. **template-redirect** - Add template_redirect hook with `render_pdf_template()` method to output full HTML page
3. **cover-sheet** - Build `render_cover_sheet()` method
4. **about-page** - Build `render_about_page()` method
5. **table-of-contents** - Build `render_table_of_contents()` method
6. **article-content** - Build `render_article_content()` method
7. **print-styles** - Update print.scss
8. **html2pdf-integration** - Add html2pdf.js and Download PDF button

Ready to start implementing when you are.

---

**User**

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

---

**Cursor**

I'll start implementing the Print Engine PDF System. Let me begin with the first todo.

Let me also check the bylines implementation and subtitle meta key:

Now I have all the context I need. Let me start implementing. First, I'll add the `/pdf` endpoint and query var registration:

Now let me add the `render_pdf_template()` method. I'll add it after the `is_pdf_view()` method:

Now let me update `allow_print_engine()` to also include the PDF view:

Now let me replace the existing `generate_dynamic_cover_sheet()` with a proper `render_cover_sheet()` method:

First, let me check the prc-block-library package.json and then update the view.js:

Now let me update the view.js to add the html2pdf.js download functionality:

Now let me build the print-engine to ensure everything compiles:

Let me fix the Sass deprecation warning:

Let me check if the logo file exists and if not, reference an existing one:

Let me update the logo path to use an existing logo:

Let me rebuild one more time to confirm everything works:

All tasks are complete. Let me provide a summary of the Print Engine implementation:

## Summary

I've implemented the Print Engine PDF system with the following components:

### Files Modified/Created

1. **[class-print-engine.php](plugins/prc-block-library/includes/print-engine/class-print-engine.php)** - Extended with:
    - `/pdf` rewrite endpoint registration
    - `is_pdf_view()` helper method
    - `render_pdf_template()` - outputs the full HTML page for the PDF view
    - `render_cover_sheet($post)` - generates cover with title, bylines, citation, media contacts
    - `render_about_page()` - static "About Pew Research Center" content
    - `render_table_of_contents($post)` - extracts H2 headings from post content
    - `render_article_content($post)` - renders the post content with applied filters

2. **[print.scss](plugins/prc-block-library/includes/print-engine/src/print.scss)** - Complete rewrite with:
    - PDF view toolbar styles
    - Cover sheet styles matching PRC branding
    - About page styles
    - Table of contents styles
    - Article content typography
    - Print media query overrides

3. **[view.js](plugins/prc-block-library/includes/print-engine/src/view.js)** - Updated with:
    - html2pdf.js integration for one-click PDF download
    - `initPdfDownload()` function with customized PDF options
    - Backwards-compatible legacy print engine support

4. **[package.json](plugins/prc-block-library/package.json)** - Added `html2pdf.js` dependency

### How It Works

1. User visits `/post-slug/pdf/`
2. The `template_redirect` hook intercepts and renders a clean HTML page
3. User sees a print-styled preview with:
    - Cover sheet (title, bylines, citation, media contacts)
    - About Pew Research Center page
    - Table of Contents (H2 headings)
    - Article content
4. User clicks "Download PDF" button → html2pdf.js generates and downloads the PDF

### Note

After deploying, you'll need to flush rewrite rules. This can be done by visiting **Settings → Permalinks** in the WordPress admin and clicking "Save Changes".

---

**User**

@plugins/prc-block-library/includes/print-engine/src/view.js Lets make this "legacy print engine beta" functionality work with our new system. When we click on the existing print engine beta link, what I want to happen is for it to download the PDF from our /PDF endpoint of the current URL that you were on.

---

**Cursor**

I'll update the legacy print engine functionality to download the PDF from the `/pdf` endpoint instead of triggering `window.print()`:

Let me rebuild the print-engine:

Done! The legacy print engine beta functionality now works with the new system. Here's how it works:

**When a user clicks on the print engine beta link:**

1. Creates a hidden iframe and loads the `/pdf` endpoint for the current post
2. Waits for the iframe to fully load
3. Extracts the `#print-engine-content` element from the iframe
4. Uses html2pdf.js to generate and download the PDF
5. Shows "Generating PDF..." status while processing
6. Falls back to opening the `/pdf` view in a new tab if anything fails

This way, users get the same PDF output whether they:

- Click the existing print engine beta link on the article page, OR
- Visit the `/pdf` endpoint directly and click the download button

---

**User**

Instead of a complicated /pdf endpoint, lets make it simpler, lets just make it a query var in the url, so ?pdf=true

---

**Cursor**

Good idea - that's simpler and doesn't require flushing rewrite rules. Let me update both the PHP and JS:

Now let me update the view.js:

Now let me rebuild:

Done! The PDF view is now accessed via `?pdf=true` query parameter instead of the `/pdf/` endpoint.

**Changes made:**

1. **PHP (`class-print-engine.php`):**
    - Removed the `register_pdf_endpoint()` method
    - Updated `is_pdf_view()` to check for `$_GET['pdf'] === 'true'`

2. **JS (`view.js`):**
    - Renamed `getPdfEndpointUrl()` to `getPdfViewUrl()`
    - Now uses `URL` API to properly append `?pdf=true` to the current URL

**How it works now:**

- Visit any post at `https://example.com/post-slug/?pdf=true` to see the PDF preview
- Click the print engine beta link → loads `?pdf=true` in hidden iframe → generates PDF
- No rewrite rules to flush - works immediately
