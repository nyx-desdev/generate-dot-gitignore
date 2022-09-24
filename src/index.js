#!/usr/bin/env node
import inquirer from "inquirer";
import { writeFileSync, readFile, readFileSync } from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "list",
      message: "Pick the framework to generate a gitignore file",
      name: "framework",
      choices: ["react", "nextjs"],
    },
  ])
  .then(({ framework }) => {
    let fileToWrite = "";
    if (framework === "react") {
      fileToWrite = readFileSync("./src/config/react_gitignore.txt", "utf8");
    } else if (framework === "nextjs") {
      fileToWrite = readFileSync("./src/config/next_gitignore.txt", "utf8");
    }
    const cwd = process.cwd();
    writeFileSync(cwd + "/.gitignore", fileToWrite);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
