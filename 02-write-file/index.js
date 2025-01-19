const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.join(__dirname, "output.txt");
const writeStream = fs.createWriteStream(filePath, { flags: "a" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome! Please enter text to write to the file. Type 'exit' or press Ctrl+C to quit.");

rl.on("line", (input) => {
  if (input.trim().toLowerCase() === "exit") {
    console.log("Goodbye!");
    rl.close();
  } else {
    writeStream.write(`${input}\n`);
  }
});

rl.on("close", () => {
  writeStream.end();
  process.exit(0);
});

rl.on("SIGINT", () => {
  console.log("Goodbye!");
  rl.close();
});