import * as fs from "fs";
import * as path from "path";
import { convertJVTitle } from "./convertTitle.js";
import { Options, File, Title, Settings } from "../types/index";

type Props = Readonly<{
  options: Options;
  settings: Settings;
}>;

export async function getJVItem({
  options,
  settings,
}: Props): Promise<Title[]> {
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
  const locationInput = settings["location.input"];
  const files = await getFiles(locationInput, 0);
  return convertJVTitle(files, strict);
}
