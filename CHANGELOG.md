# @prc/block-library

## 4.7.0

### Minor Changes

- 936ee90: Image blocks have a new Sharing toggle. When it is on, visitors see a share button in the image's lower-right corner on hover. The button opens Facebook, X, Threads, Bluesky, and Download options. Shared links point to the page, and the social card shows that image.

### Patch Changes

- 1d96db5: These plugins now require the renamed PRC Shared plugin, `prc-shared`, instead of `prc-scripts`.
- f8730c1: PRC Shared now loads the shared PRC primitives library for every PRC plugin when the plugins run outside PRC Platform. Plugins no longer bundle their own copy, so standalone installs need PRC Shared active.
