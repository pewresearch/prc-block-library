## How to create a new block

  1. From the repository root, run: `npm run create-block`
  2. Select your block variant and follow the instructions.
  3. Move the generated block directory to this location (`plugins/prc-block-library/src/`).
  4. Rename the `class-{{rename-me}}.php` file to match your block directory name (e.g., `class-my-block.php`).
  5. Initialize your block in `/includes/class-library.php` in either `define_core_blocks` or `define_prc_blocks` depending on the block type: `new My_Block($this->get_loader());`
  6. Build the block: `npm run build -w @prc/block-library`

For more information about block templates and variants, see `/block-templates/README.md` in the repository root.
