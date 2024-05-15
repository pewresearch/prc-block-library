# Core Query
Contributors:      Seth Rubenstein
Tags:              block
Tested up to:      6.4
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html



## Description

The `core/query` block is a wrapper for the `WP_Query` class. It allows you to create a custom query and display the results in a block.

We set some defaults through various api's that interact with this block. On home, category archives, post type archives, and search we set our custom `post_parent = 0`, `post_status = array('publish', 'hidden_from_search')` and  `post_type = array('post','short-read','fact-sheet','interactive','quiz')` query args .We also set defaults for `taxQuery` relation to be `OR` and not `AND`; facets use `AND` everything else should use `OR`.

These conditions are set in their respective components, utlimately with the combined post types set being set by this block. 

