import { __ } from "@wordpress/i18n";
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { Button, ToggleControl, TextControl, SelectControl } from '@wordpress/components';

// We will need to write a tree walker that if we find block.name === "prc-block/story-item" then great but if we find block.name === "core/columns" then look inside block.innerBlocks for 'prc-block/story-item' or for 'core/column' and look in there for story-item OR recursive run again look for columns and then column and then story item. I thinik goinog 2 levels deep is all thats needed for our use. 
// get an array of all the story item blocks.
// get the postID's from all these blocks and put into an array.
// When saving the block area post, save post meta of _featured_posts where the value is that post ids array.

// https://css-tricks.com/managing-wordpress-metadata-in-gutenberg-using-a-sidebar-plugin/
// Waitiing for post save action to run https://github.com/WordPress/gutenberg/issues/13413

const prefix = 'prc-block-area-sidebar';
const title = __('Block Area Options', 'textdomain');

registerPlugin( 'my-plugin-sidebar', {
    icon: 'screenoptions',
    render: function() {
        return (
            <Fragment>
                 <PluginSidebarMoreMenuItem
                    target={prefix}
                >
                    {title}
                </PluginSidebarMoreMenuItem>
                <PluginSidebar
                    name={prefix}
                    title={title}
                >
                    Sidebar Content Here
                </PluginSidebar>
            </Fragment>
        )
    },
} );