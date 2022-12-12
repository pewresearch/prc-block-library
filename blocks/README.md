# Welcome

Welcome to the Pew Research Center Block Library 👋 ( prc-block-library for short). First some caveats; this is the culmination of a refactor of our various blocks into new block libraries utilizing `@wordpress/create-block` and `@wordpress/scripts` removing our need to use `Wpack.io`, this release also includes a brand new way for us to handle asset dependencies. Given the nature of how we’re handling dependencies some blocks will not work for you until we release our subsequent `prc-scripts` plugin later in Q1 2023. Until then, use at your own risk with the understanding some blocks will not work for you and will in fact cause a fault in the editor because of missing components. Furthermore, some blocks will reference post types, taxonomy, data models you won’t necessarily have; we have tried our hardest to ensure backwards compatibility with WP core post types and objects when this is activated off our platform. Some blocks you may have heard us speak about are not present in this collection; our quiz builder, quote sorter builder, and chart builder blocks are not present in this collection and will be released open source at a later date. This will serve as a base of blocks that other plugins we release will utilize. 

## Building a new block

To get started run this command in `/blocks`.

```bash
npx @wordpress/create-block -t ./.template
```

See `prc-block-library` [README](../README.md) for more information.
