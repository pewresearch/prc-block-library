# Attachments List

Contributors: Pew Research Center
Tags: block
Tested up to: 6.1
Stable tag: 0.2.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Displays a list of attachments for the parent post of the current attachment.

## Description

This block displays the titles of other images attached to a post in a list format. It is intended to be used on attachment pages only and will display a list of attachments for the parent post of the current attachment.

The pagination functionality has been separated into its own block: `Attachments Pagination`.

## Instructions

1. Add this block to an attachment page template
2. The block will automatically detect the parent post and load all attachments
3. Customize the heading text and colors using the controls in the sidebar
4. Adjust hover and active state colors for better visual feedback

## Frequently Asked Questions

= What is the difference between Attachments List and Attachments Pagination? =

Attachments List displays a full list of all attachments with their titles. Attachments Pagination displays a paginated number-based navigation control.

= Can I use this block on regular posts? =

This block is designed for attachment pages only. It requires a parent post context to work properly.

## Screenshots

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).
2. This is the second screen shot
3. You can store screenshots in a .docs folder in this block directory...

## Changelog

= 0.2.0 =

- Renamed from Attachment Info to Attachments List
- Removed pagination variant (now a separate block: Attachments Pagination)
- Simplified to list view only
- Updated dependencies

= 0.1.0 =

- Initial release

## Developer Notes

You may provide arbitrary sections, in the same format as the ones above. This may be of use for extremely complicated
blocks where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation." Arbitrary sections will be shown below the built-in sections outlined above.
