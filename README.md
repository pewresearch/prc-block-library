# PRC-Block-Library

Welcome to the Pew Research Center Block Library 👋 ( prc-block-library for short).

---

PRC Block Library is a collection of blocks for the [Gutenberg](
https://wordpress.org/gutenberg/) editor. Treat this collection with care, as
this provides the foundation for the display layer of the pewresearch.org website.

All blocks are built using the [Gutenberg Block API](
https://wordpress.org/gutenberg/handbook/block-api/), and are built using
the WordPress variant of [React](https://reactjs.org/) called [@wordpress/element](
https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-element/).

### Scaffolding a New Block

To scaffold a new block, run the following command in the `/blocks` directory:

```bash
npx @wordpress/create-block -t ./.template
```

This will start a new block scaffold and prompt you to chose a variant.

![Block Variants](.docs/assets/block-variants.png)

The variants are:

 - `default` - Our typical block, this block comes pre-configured with `useInnerBlocks` and `<RichText/>` should you need it. This block uses a render.php file to render the block dynamically on the frontend.
 - `dynamic` - A dynamic block is a default block that needs the functionality of a PHP class to render the block AND/or registering data models, rest endpoints, additional server side functionality. This block uses a `render_callback` function to render the block dynamically on the frontend.
 - `static` - A block that uses static data to render content. This is primarily intended for primitive block types. This saves content as html directly to the database.
 - `coreBlock` - A modification to or extension of a core block. Adding attributes, context, new controls, or new styles to a core block should use this variant.

After choosing a variant you will be prompted for a name and a title. The name should
be in the format `block-name`, where `block-name` is the name of the block you
are creating. For example, if you are creating a block called "My Block", you
would enter `my-block` as the name and "My Block" as the title. This will create a new directory in the
`/blocks` directory called `my-block`. This directory will contain all of the
files you need to build your block.

There are additional options during the scaffold process, but these are not
required. Only name and title are required.

![Run Command](.docs/assets/run-command.gif)

## 3rd Party Dependency Extraction

From time to time you may need to add a script that is included in the `PRC-Scripts` plugin. Scripts whether they have 1st party or 3rd party origins that are commonly used are registered in `PRC-Scripts`. For example, `enquire.js` is a great library for handling media queries in JavaScript. To add this dependency to your block, you'll need to add it to the `package.json` file in your block directory as a dev dependency. You will also need to setup dependency extraction for your block in the `webpack.config.js` file in your block directory. This will allow the dependency to be loaded by WordPress script/style registry.

Using dependency extraction would allow you to import these libraries without including the code in your build e.g.:
```js
import { useDebounce } from '@prc/hooks';
import enquire from 'enquire.js';
```

For an up to date list of all available scripts and their dependency extraction configuration see the centralized [webpack.config.js](https://github.com/pewresearch/pewresearch-org/blob/main/webpack.config.js) file.

#### Documentation

For additional documentation, visit https://github.com/pewresearch/prc-block-library.

#### Licensing

This library utilizes Font Awesome for some block icons and interface elements. 

 - Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.

This library also utilizes Handsontable for the data-table block.

- Handsontable 9.0.2 by @handsontable - https://handsontable.com License - https://handsontable.com/docs/9.0.2/tutorial-license-info.html (Commercial License) Copyright 2021 Handsontable


#### Contributing

We are not currently accepting contributions to this repository at this time.

