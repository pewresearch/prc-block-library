# Story Item
Contributors:      Seth Rubenstein
Tags:              block
Tested up to:      6.1
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

## Description

The Story Item block is the single most used block in the PRC Block Library. It is used manually, automatically, programatically, and in many other ways. It is the most flexible block in the library, as well as one of the more complex blocks. This block contains many sub-classes, php apis, and rest apis, please read the documentation carefully before making changes.

### Variations (System)

Story Item Variations takes the concept of block variations and blows them up to the system level. Our variations correspond to different configurations of the Story Item for different display contexts on the theme, as such we often customize the data to fit the display context.
For example, a Popular Post Story Item placed into the Popular Posts group, which lives in a sidebar, will have a shorter title and no excerpt - no image, while the same Story Item placed into the main Query Block will have the normal title, an excerpt, an image, etc.., meanwhile that same Story Item placed into a homepage lede slot will have a different excerpt and different image slot. All of these variations are handled by the Story Item Variations "system". The system is a set of Javascript functions to ingest the variations data via json and a set of PHP functions, also ingesting a json file, to register corresponding post meta schema to store this custom data. Additionally a suite of ui controls are provided to allow the user to edit the Story Item variations data at the post level via the inspector sidebar.

### Data API

The Story Item API provides a simple way to get information for a post, formatted for a story item. These can be used to pluck specific information from a post, or to get the entire story item for a post.

## Frequently Asked Questions

= A question that someone might have =

An answer to that question.

## Screenshots

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).
2. This is the second screen shot
3. You can store screenshots in a .docs folder in this block directory...

## Changelog

= 0.1.0 =
* Release
