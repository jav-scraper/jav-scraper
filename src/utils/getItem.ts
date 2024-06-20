import * as fs from "fs";
import * as path from "path";
import { convertJVTitle } from "./convertTitle.js";
import { Options, File, Title } from "../types/index";

export async function getJVItem(
  dirPath: string,
  options: Options
): Promise<Title[]> {
  const {
    recurse = false,
    depth = Infinity,
    strict = false,
    minimumFileSize = 0,
    excludedStrings = [],
    includedExtensions = [],
  } = options;

  const minimumFileSizeBytes = minimumFileSize * 1024 * 1024;
  const excludedStringsRegex = new RegExp(excludedStrings.join("|"), "i");
  const includedExtensionsSet = new Set(
    includedExtensions.map((ext) => ext.toLowerCase())
  );

  async function getFiles(dir: string, currentDepth: number): Promise<File[]> {
    if (currentDepth > depth) return [];

    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    const files: File[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && recurse) {
        files.push(...(await getFiles(fullPath, currentDepth + 1)));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const stat = await fs.promises.stat(fullPath);
        if (
          includedExtensionsSet.has(ext) &&
          stat.size >= minimumFileSizeBytes &&
          !excludedStringsRegex.test(entry.name)
        ) {
          files.push({
            FullName: fullPath,
            Name: entry.name,
            BaseName: path.basename(entry.name, ext),
            Directory: dir,
            Extension: ext,
            Length: stat.size,
          });
        }
      }
    }
    return files;
  }

  const files = await getFiles(dirPath, 0);
  return convertJVTitle(files, strict);
}

// Example usage
/*
(async () => {
  const examplePath = "./path/to/directory";
  const options = {
    recurse: true,
    depth: 2,
    minimumFileSize: 1, // 1 MB
    excludedStrings: ["example", "test"],
    includedExtensions: [".mp4", ".mkv"],
    regexEnabled: true,
    regexString: "example-regex",
  };

  const result = await getJVItem(examplePath, options);
  console.log(result);
})();
*/
