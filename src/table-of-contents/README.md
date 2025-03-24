# Table of Contents Block
Contributors:      Seth Rubenstein
Tags:              block, navigation, table of contents
Tested up to:      6.1
Stable tag:        3.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A dynamic Table of Contents block that displays chapter headings and sections with multiple display options and full color customization support.

## Description

The Table of Contents block automatically generates a navigable list of chapters and sections from your content. It supports multiple display types, automatic responsive behavior, and extensive color customization options.

### Key Features

- Multiple display types: List, Dropdown, and Accordion
- Automatic mobile responsiveness
- Deep linking support
- Current section highlighting
- Full color customization for all states (active, hover, etc.)
- Server-side rendering for SEO optimization
- Sticky positioning support
- Automatic conversion to dropdown at specified viewport widths

## Block Variations

1. **Default (List)** - Traditional list view with nested sections
2. **Dropdown** - Compact dropdown menu ideal for mobile views
3. **Accordion** - Expandable sections with part/chapter organization

## Attributes

### Display Options

- `displayType` - Controls the main display type (list, accordion, dropdown)
- `showCurrentChapter` - Enables highlighting of the current chapter
- `hideHeading` - Option to hide the TOC heading
- `heading` - Customizable heading text
- `autoDropdownEnabled` - Enables automatic conversion to dropdown
- `autoDropdownWidth` - Width threshold for dropdown conversion

### Color Attributes

- `dropdownBackgroundColor` - Background color for dropdown mode
- `dropdownTextColor` - Text color for dropdown mode
- `headingBackgroundColor` - Background color for the heading
- `headingTextColor` - Text color for the heading
- `backgroundColor` - Main background color
- `textColor` - Main text color
- `linkColor` - Color for links
- `activeBackgroundColor` - Background for active items
- `activeTextColor` - Text color for active items
- `hoverBackgroundColor` - Background color on hover
- `hoverTextColor` - Text color on hover

### Supports

- Anchor links
- Custom spacing
- Typography customization
- Border customization
- Sticky positioning
- Left/right alignment

## Usage

1. Insert the block into your content
2. Choose a display variation (List, Dropdown, or Accordion)
3. Customize colors and styles as needed
4. Configure responsive behavior if desired

### Auto-Dropdown Feature

The block can automatically switch to a dropdown menu when the container width becomes smaller than the specified threshold:

1. Enable "Auto Dropdown" in the block settings
2. Set the "Container Width Threshold" (default: 480px)

## Styling

### Default Style
- Traditional list view with nested sections
- Supports highlighting of current section
- Customizable spacing between items

### Dropdown Style
- Compact menu that expands on click
- Ideal for mobile views or sidebar placement
- Custom trigger icon with open/close states

### Accordion Style
- Expandable sections organized by parts/chapters
- Custom expand/collapse indicators
- Maintains hierarchy of content structure

## Developer Notes

### Interactivity

The block uses WordPress's Interactivity API for dynamic features:

- Smooth scrolling to sections
- Current section highlighting
- Dropdown state management
- Responsive behavior

### Caching

The block implements WordPress VIP-compatible caching:

- Server-side rendered content is cached
- Cache varies by user state (logged in/out)
- 1-hour cache duration for TOC data

### Performance

- Optimized for WordPress VIP infrastructure
- Implements proper cache headers
- Minimal JavaScript footprint
- Server-side rendered by default

## Changelog

### 3.0.0
* Major refactor
* New color attributes for all possible styles and states
* New dropdown logic
* New auto conversion to dropdown mechanism
* SEO-optimized TOC graph rendering
* Added support for sticky positioning
* Improved responsive behavior
* Enhanced accessibility

## Frequently Asked Questions

= A question that someone might have =

An answer to that question.

### What about foo bar?

Answer to foo bar dilemma.

## Screenshots

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).
2. This is the second screen shot
3. You can store screenshots in a .docs folder in this block directory...
