const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../includes');
const targetDir = path.join(__dirname, '/tutorials');

fs.readdirSync(sourceDir).forEach(dir => {
    const sourceFile = path.join(sourceDir, dir, 'README.md');
    const targetFile = path.join(targetDir, `${dir}.md`);

    if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`Copied ${sourceFile} to ${targetFile}`);
    }
});

console.log("Done! These files have been copied into .docs/tutorials for inclusion in the docs build.");
