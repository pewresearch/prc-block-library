## How to create a new block

  1. Run the following command to create a new block in this directory: `npx @wordpress/create-block -t ./.template --no-plugin`.
  2. Select your block variant and follow the instructions.
  3. After you block has been created, rename the {{rename-me}}.php file to the name of your directory.
  4. Initialize your block in `/includes/class-library.php` in either `define_core_blocks` or `define_prc_blocks` depending on the block type. Init your class in the appropriate method: `new My_Block($this->get_loader());`.
