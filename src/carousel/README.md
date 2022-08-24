# Carousel Block

`prc-block/carousel` and `prc-block/carousel-slide`

## `prc-block/carousel`
Controller block, `splidejs/splide` to render the carousel.

## `prc-block/carousel-slide`
A primitive block, used to hold content for each slide.

## Changelog
- Created a child block specifically for carousel, no longer using `core/group`. This allows for more control over the carousel and its slides but more importantly is a quick attempt at improving the UX of the block, now clicking insert at the controller level will insert the slide block instantly as theres only one defined option now (group block has multiple variations).
