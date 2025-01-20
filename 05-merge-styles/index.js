const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputFolder, 'bundle.css');

async function mergeStyles() {
  try {
    await fs.promises.mkdir(outputFolder, { recursive: true });
    const writeStream = fs.createWriteStream(outputFile);
    const files = await fs.promises.readdir(stylesFolder, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(stylesFolder, file.name);
      if (file.isFile() && path.extname(file.name) === '.css') {
        const data = await fs.promises.readFile(filePath, 'utf8');
        writeStream.write(data + '\n');
      }
    }
    writeStream.end();
    console.log('Styles merged');
  } catch (err) {
    console.error('Error while merge', err);
  }
}

mergeStyles();