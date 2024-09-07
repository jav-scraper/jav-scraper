import * as fs from "fs";
import * as path from "path";
import { convertJVTitle } from "./convertTitle";
import { File, Title, Settings } from "../types";

type Props = Readonly<{
  settings: Settings;
}>;

export async function getJVItem({ settings }: Props): Promise<Title[]> {
  const itemSettings = {
    recurse: settings["web.sort.recurse"],
    depth: settings["web.sort.recursedepth"],
    minimumFileSize: settings["match.minimumfilesize"],
    excludedStrings: settings["match.excludedfilestring"],
    includedExtensions: settings["match.includedfileextension"],
    regexEnabled: settings["match.regex"],
    regexString: settings["match.regex.string"],
    regexIdMatch: settings["match.regex.idmatch"],
    regexPtMatch: settings["match.regex.ptmatch"],
  };

  const minimumFileSizeBytes = itemSettings.minimumFileSize * 1024 * 1024;
  const excludedStringsRegex = new RegExp(
    itemSettings.excludedStrings.join("|"),
    "i"
  );
  const includedExtensionsSet = new Set(
    itemSettings.includedExtensions.map((ext) => ext.toLowerCase())
  );

  async function getFiles(dir: string, currentDepth: number): Promise<File[]> {
    if (currentDepth > itemSettings.depth) return [];

    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    const files: File[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && itemSettings.recurse) {
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
  return convertJVTitle(files);
}
