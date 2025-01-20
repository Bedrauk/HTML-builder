const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}
async function main() {
  const srcFolder = path.join(__dirname, 'files');
  const destFolder = path.join(__dirname, 'files-copy');
  await fs.promises.rm(destFolder, { recursive: true, force: true });
  await copyDir(srcFolder, destFolder);
}

main();