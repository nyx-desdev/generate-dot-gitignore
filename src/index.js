#!/usr/bin/env node
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";
import { writeFile, readdir, readFile } from "fs/promises";

const configFiles = {};
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const configFolderPath = path.resolve(__dirname, "config");
const defaultTechnology = { technology: "react(Default)" };

(async () => {
  const files = await readdir(configFolderPath).catch(console.log);
  const useDefault = process.argv[2] === "-y";

  for (let i of files) {
    const frameworkName = i.split(".")[0];
    configFiles[frameworkName] = path.join(configFolderPath, i);
  }

  const { technology } = useDefault
    ? defaultTechnology
    : await inquirer.prompt([
        {
          type: "list",
          message: "Pick the framework to generate a gitignore file:",
          name: "technology",
          choices: Object.keys(configFiles),
        },
      ]);

  let config = await readFile(configFiles[technology]).catch(console.log);

  const gitignore = path.join(process.cwd(), ".gitignore");

  await writeFile(gitignore, config.toString()).catch((err) => {
    console.log(err);
    process.exit();
  });

  console.log("gitignore successfully created");
})();
